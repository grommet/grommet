import React, { Component, isValidElement } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { sizeStyle } from 'grommet-styles';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Drop } from '../Drop';
import { InfiniteScroll } from '../InfiniteScroll';
import { Keyboard } from '../Keyboard';
import { withAnnounce, withFocus, withForwardRef } from '../hocs';

import {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledSuggestions,
} from './StyledTextInput';

function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
}

function stringLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    if (suggestion.label && typeof suggestion.label === 'string') {
      return suggestion.label;
    }
    return suggestion.value;
  }
  return suggestion;
}

const ContainerBox = styled(Box)`
  ${props =>
    props.dropHeight
      ? sizeStyle('max-height', props.dropHeight, props.theme)
      : 'max-height: inherit;'};

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 100%;
  }
`;

class TextInput extends Component {
  static defaultProps = {
    dropAlign: { top: 'bottom', left: 'left' },
    messages: {
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen:
        'Suggestions drop is open, continue to use arrow keys to navigate',
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { suggestions } = nextProps;
    const { showDrop } = prevState;
    if (showDrop && (!suggestions || !suggestions.length)) {
      return { showDrop: false };
    }
    return null;
  }

  state = {
    activeSuggestionIndex: -1,
    showDrop: false,
  };

  inputRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    const { onSuggestionsOpen, onSuggestionsClose, suggestions } = this.props;
    const { showDrop } = this.state;
    if (showDrop !== prevState.showDrop) {
      if (showDrop && onSuggestionsOpen) {
        onSuggestionsOpen();
      } else if (onSuggestionsClose) {
        onSuggestionsClose();
      }
    }

    if (
      !showDrop &&
      suggestions &&
      (!prevProps.suggestions || !prevProps.suggestions.length)
    ) {
      this.resetSuggestions();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.resetTimer);
  }

  announce = (message, mode) => {
    const { announce, suggestions } = this.props;
    if (suggestions && suggestions.length > 0) {
      announce(message, mode);
    }
  };

  announceSuggestionsCount = () => {
    const {
      suggestions,
      messages: { suggestionsCount },
    } = this.props;
    this.announce(`${suggestions.length} ${suggestionsCount}`);
  };

  announceSuggestionsExist = () => {
    const {
      messages: { suggestionsExist },
    } = this.props;
    this.announce(suggestionsExist);
  };

  announceSuggestionsIsOpen = () => {
    const {
      messages: { suggestionIsOpen },
    } = this.props;
    this.announce(suggestionIsOpen);
  };

  announceSuggestion = index => {
    const {
      suggestions,
      messages: { enterSelect },
    } = this.props;
    if (suggestions && suggestions.length > 0) {
      const labelMessage = stringLabel(suggestions[index]);
      this.announce(`${labelMessage} ${enterSelect}`);
    }
  };

  resetSuggestions = () => {
    // delay this to avoid re-render interupting event delivery
    // https://github.com/grommet/grommet/issues/2154
    // 10ms was chosen empirically based on ie11 using TextInput
    // with and without a FormField.
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => {
      const { suggestions } = this.props;
      if (suggestions && suggestions.length) {
        this.setState(
          {
            activeSuggestionIndex: -1,
            showDrop: true,
            selectedSuggestionIndex: -1,
          },
          this.announceSuggestionsCount,
        );
      }
    }, 10);
  };

  getSelectedSuggestionIndex = () => {
    const { suggestions, value } = this.props;
    const suggestionValues = suggestions.map(suggestion => {
      if (typeof suggestion === 'object') {
        return suggestion.value;
      }
      return suggestion;
    });
    return suggestionValues.indexOf(value);
  };

  onShowSuggestions = () => {
    // Get values of suggestions, so we can highlight selected suggestion
    const selectedSuggestionIndex = this.getSelectedSuggestionIndex();

    this.setState(
      {
        showDrop: true,
        activeSuggestionIndex: -1,
        selectedSuggestionIndex,
      },
      this.announceSuggestionsIsOpen,
    );
  };

  onNextSuggestion = event => {
    const { suggestions } = this.props;
    const { activeSuggestionIndex, showDrop } = this.state;
    if (suggestions && suggestions.length > 0) {
      if (!showDrop) {
        this.onShowSuggestions();
      } else {
        event.preventDefault();
        const index = Math.min(
          activeSuggestionIndex + 1,
          suggestions.length - 1,
        );
        this.setState({ activeSuggestionIndex: index }, () =>
          this.announceSuggestion(index),
        );
      }
    }
  };

  onPreviousSuggestion = event => {
    const { suggestions } = this.props;
    const { activeSuggestionIndex, showDrop } = this.state;
    if (suggestions && suggestions.length > 0 && showDrop) {
      event.preventDefault();
      const index = Math.max(activeSuggestionIndex - 1, 0);
      this.setState({ activeSuggestionIndex: index }, () =>
        this.announceSuggestion(index),
      );
    }
  };

  onClickSuggestion = (suggestion, event) => {
    const { forwardRef, onSelect } = this.props;
    this.setState({ showDrop: false, activeSuggestionIndex: -1 });
    if (onSelect) {
      // TODO: needed for backwards compatibility sake
      /* eslint-disable no-param-reassign */
      event.suggestion = suggestion;
      event.target = (forwardRef || this.inputRef).current;
      /* eslint-enable no-param-reassign */
      onSelect(event);
    }
  };

  onSuggestionSelect = event => {
    const { forwardRef, onSelect, suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    this.setState({ showDrop: false, activeSuggestionIndex: -1 });
    if (activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      // TODO: needed for backwards compatibility sake
      /* eslint-disable no-param-reassign */
      event.suggestion = suggestions[activeSuggestionIndex];
      event.target = (forwardRef || this.inputRef).current;
      /* eslint-enable no-param-reassign */
      if (onSelect) {
        onSelect(event);
      }
    }
  };

  onFocus = event => {
    const { onFocus, suggestions } = this.props;
    if (suggestions && suggestions.length > 0) {
      this.announceSuggestionsExist();
    }
    this.resetSuggestions();
    if (onFocus) {
      onFocus(event);
    }
  };

  onBlur = event => {
    const { onBlur } = this.props;
    clearTimeout(this.resetTimer);
    if (onBlur) {
      onBlur(event);
    }
  };

  onChange = event => {
    const { onChange } = this.props;
    this.resetSuggestions();
    if (onChange) {
      onChange(event);
    }
  };

  onEsc = event => {
    // we have to stop both synthetic events and native events
    // drop and layer should not close by pressing esc on this input
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    this.setState({ showDrop: false });
  };

  onTab = () => {
    this.setState({ showDrop: false });
  };

  renderSuggestions = () => {
    const { suggestions, theme } = this.props;
    const { activeSuggestionIndex, selectedSuggestionIndex } = this.state;

    return (
      <StyledSuggestions>
        <InfiniteScroll items={suggestions} step={theme.select.step}>
          {(suggestion, index) => {
            const plain =
              typeof suggestion === 'object' &&
              typeof isValidElement(suggestion.label);
            return (
              <li key={`${stringLabel(suggestion)}-${index}`}>
                <Button
                  active={
                    activeSuggestionIndex === index ||
                    selectedSuggestionIndex === index
                  }
                  fill
                  hoverIndicator="background"
                  onClick={event => {
                    this.onClickSuggestion(suggestion, event);
                  }}
                >
                  {plain ? (
                    renderLabel(suggestion)
                  ) : (
                    <Box align="start" pad="small">
                      {renderLabel(suggestion)}
                    </Box>
                  )}
                </Button>
              </li>
            );
          }}
        </InfiniteScroll>
      </StyledSuggestions>
    );
  };

  render() {
    const {
      defaultValue,
      dropAlign,
      dropHeight,
      dropTarget,
      dropProps,
      forwardRef,
      id,
      placeholder,
      plain,
      theme,
      value,
      onKeyDown,
      ...rest
    } = this.props;
    delete rest.onChange; // se we can manage in this.onChange()
    delete rest.onSuggestionsOpen;
    delete rest.onSuggestionsClose;
    const { showDrop } = this.state;
    // needed so that styled components does not invoke
    // onSelect when text input is clicked
    delete rest.onSelect;
    let drop;
    if (showDrop) {
      drop = (
        <Drop
          id={id ? `text-input-drop__${id}` : undefined}
          align={dropAlign}
          responsive={false}
          target={dropTarget || (forwardRef || this.inputRef).current}
          onClickOutside={() => this.setState({ showDrop: false })}
          onEsc={() => this.setState({ showDrop: false })}
          {...dropProps}
        >
          <ContainerBox overflow="auto" dropHeight={dropHeight}>
            {this.renderSuggestions()}
          </ContainerBox>
        </Drop>
      );
    }
    return (
      <StyledTextInputContainer plain={plain}>
        {placeholder && typeof placeholder !== 'string' && !value ? (
          <StyledPlaceholder>{placeholder}</StyledPlaceholder>
        ) : null}
        <Keyboard
          onEnter={this.onSuggestionSelect}
          onEsc={this.onEsc}
          onTab={this.onTab}
          onUp={this.onPreviousSuggestion}
          onDown={this.onNextSuggestion}
          onKeyDown={onKeyDown}
        >
          <StyledTextInput
            id={id}
            ref={forwardRef || this.inputRef}
            autoComplete="off"
            plain={plain}
            placeholder={
              typeof placeholder === 'string' ? placeholder : undefined
            }
            {...rest}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onChange}
          />
        </Keyboard>
        {drop}
      </StyledTextInputContainer>
    );
  }
}

Object.setPrototypeOf(TextInput.defaultProps, defaultProps);

let TextInputDoc;
if (process.env.NODE_ENV !== 'production') {
  TextInputDoc = require('./doc').doc(TextInput); // eslint-disable-line global-require
}
const TextInputWrapper = compose(
  withFocus({ focusWithMouse: true }),
  withTheme,
  withAnnounce,
  withForwardRef,
)(TextInputDoc || TextInput);

export { TextInputWrapper as TextInput };
