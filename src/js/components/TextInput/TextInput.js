import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Drop } from '../Drop';
import {
  withAnnounce,
  withFocus,
  withForwardRef,
  withTheme,
} from '../hocs';

import StyledTextInput, {
  StyledTextInputContainer,
  StyledSuggestions,
} from './StyledTextInput';
import doc from './doc';

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

class TextInput extends Component {
  static defaultProps = {
    dropAlign: { top: 'bottom', left: 'left' },
    messages: {
      enterSelect: '(Press Enter to Select)',
      suggestionsCount: 'suggestions available',
      suggestionsExist: 'This input has suggestions use arrow keys to navigate',
      suggestionIsOpen: 'Suggestions drop is open, continue to use arrow keys to navigate',
    },
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { forwardRef } = nextProps;
    const { inputRef } = prevState;
    const nextInputRef = forwardRef || inputRef;
    if (nextInputRef !== inputRef) {
      return { inputRef: nextInputRef };
    }
    return null;
  }

  state = {
    activeSuggestionIndex: -1,
    inputRef: React.createRef(),
    showDrop: false,
  }

  announce = (message, mode) => {
    const { announce, suggestions } = this.props;
    if (suggestions && suggestions.length > 0) {
      announce(message, mode);
    }
  }

  announceSuggestionsCount = () => {
    const { suggestions, messages: { suggestionsCount } } = this.props;
    this.announce(`${suggestions.length} ${suggestionsCount}`);
  }

  announceSuggestionsExist = () => {
    const { messages: { suggestionsExist } } = this.props;
    this.announce(suggestionsExist);
  }

  announceSuggestionsIsOpen = () => {
    const { messages: { suggestionIsOpen } } = this.props;
    this.announce(suggestionIsOpen);
  }

  announceSuggestion(index) {
    const { suggestions, messages: { enterSelect } } = this.props;
    if (suggestions && suggestions.length > 0) {
      const labelMessage = stringLabel(suggestions[index]);
      this.announce(`${labelMessage} ${enterSelect}`);
    }
  }

  resetSuggestions = () => {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length) {
      this.setState({
        activeSuggestionIndex: -1,
        showDrop: true,
        selectedSuggestionIndex: -1,
      }, this.announceSuggestionsCount);
    }
  }

  getSelectedSuggestionIndex = () => {
    const { suggestions, value } = this.props;
    const suggestionValues = suggestions.map((suggestion) => {
      if (typeof suggestion === 'object') {
        return suggestion.value;
      }
      return suggestion;
    });
    return suggestionValues.indexOf(value);
  }

  onShowSuggestions = () => {
    // Get values of suggestions, so we can highlight selected suggestion
    const selectedSuggestionIndex = this.getSelectedSuggestionIndex();

    this.setState({
      showDrop: true,
      activeSuggestionIndex: -1,
      selectedSuggestionIndex,
    }, this.announceSuggestionsIsOpen);
  }

  onNextSuggestion = (event) => {
    const { suggestions } = this.props;
    const { activeSuggestionIndex, showDrop } = this.state;
    if (suggestions && suggestions.length > 0) {
      if (!showDrop) {
        this.onShowSuggestions();
      } else {
        event.preventDefault();
        const index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
        this.setState({ activeSuggestionIndex: index }, () => this.announceSuggestion(index));
      }
    }
  }

  onPreviousSuggestion = (event) => {
    const { suggestions } = this.props;
    const { activeSuggestionIndex, showDrop } = this.state;
    if (suggestions && suggestions.length > 0 && showDrop) {
      event.preventDefault();
      const index = Math.max(activeSuggestionIndex - 1, 0);
      this.setState({ activeSuggestionIndex: index }, () => this.announceSuggestion(index));
    }
  }

  onClickSuggestion = (suggestion) => {
    const { onSelect } = this.props;
    const { inputRef } = this.state;
    this.setState({ showDrop: false });
    if (onSelect) {
      onSelect({ target: inputRef.current, suggestion });
    }
  }

  onSuggestionSelect = (event) => {
    const { onSelect, suggestions } = this.props;
    const { activeSuggestionIndex, inputRef } = this.state;
    this.setState({ showDrop: false });
    if (activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      const suggestion = suggestions[activeSuggestionIndex];
      if (onSelect) {
        onSelect({ target: inputRef.current, suggestion });
      }
    }
  }

  onDropClose = () => {
    this.setState({ showDrop: false });
  }

  renderSuggestions = () => {
    const { suggestions, theme } = this.props;
    const { activeSuggestionIndex, selectedSuggestionIndex } = this.state;
    let items;
    if (suggestions && suggestions.length > 0) {
      items = suggestions.map((suggestion, index) => (
        <li key={`${stringLabel(suggestion)}-${index}`}>
          <Button
            active={
              activeSuggestionIndex === index ||
              selectedSuggestionIndex === index
            }
            fill={true}
            hoverIndicator='background'
            onClick={() => this.onClickSuggestion(suggestion)}
          >
            <Box align='start' pad='small'>
              {renderLabel(suggestion)}
            </Box>
          </Button>
        </li>
      ));
    }

    return (
      <StyledSuggestions theme={theme}>
        {items}
      </StyledSuggestions>
    );
  }

  render() {
    const {
      defaultValue, dropAlign, dropTarget, id, plain, value, onFocus, onInput, onKeyDown,
      ...rest
    } = this.props;
    delete rest.onInput; // se we can manage in onInputChange()
    const { inputRef, showDrop } = this.state;
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
          target={dropTarget || inputRef.current}
          onClickOutside={() => this.setState({ showDrop: false })}
          onEsc={() => this.setState({ showDrop: false })}
        >
          {this.renderSuggestions()}
        </Drop>
      );
    }
    return (
      <StyledTextInputContainer plain={plain}>
        <Keyboard
          onEnter={this.onSuggestionSelect}
          onEsc={this.onDropClose}
          onTab={this.onDropClose}
          onUp={this.onPreviousSuggestion}
          onDown={this.onNextSuggestion}
          onKeyDown={onKeyDown}
        >
          <StyledTextInput
            id={id}
            innerRef={inputRef}
            autoComplete='off'
            plain={plain}
            {...rest}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            onFocus={(event) => {
              this.announceSuggestionsExist();
              if (onFocus) {
                onFocus(event);
              }
            }}
            onInput={(event) => {
              this.resetSuggestions();
              if (onInput) {
                onInput(event);
              }
            }}
          />
        </Keyboard>
        {drop}
      </StyledTextInputContainer>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(TextInput);
}

export default compose(
  withFocus,
  withTheme,
  withAnnounce,
  withForwardRef,
)(TextInput);
