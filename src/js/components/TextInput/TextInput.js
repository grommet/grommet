import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import StyledTextInput,
  { StyledTextInputContainer, StyledSuggestions } from './StyledTextInput';
import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Drop } from '../Drop';

import { withTheme } from '../hocs';

import doc from './doc';

function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
}

class TextInput extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
    theme: PropTypes.object,
  }

  state = {
    activeSuggestionIndex: -1,
    announceChange: false,
    showDrop: false,
  }

  resetSuggestions = () => {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length) {
      this.setState({
        activeSuggestionIndex: -1,
        announceChange: true,
        showDrop: true,
        selectedSuggestionIndex: -1,
      });
    }
  }

  // announceSuggestion(index) {
  //   const { suggestions } = this.props;
  //   if (suggestions && suggestions.length > 0) {
  //     const labelMessage = this._renderLabel(suggestions[index]);
  //     const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
  //     announce(`${labelMessage} ${enterSelectMessage}`);
  //   }
  // }

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
    });
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
        this.setState({ activeSuggestionIndex: index });
        // this.setState({ activeSuggestionIndex: index },
        //   this._announceSuggestion.bind(this, index));
      }
    }
  }

  onPreviousSuggestion = (event) => {
    const { suggestions } = this.props;
    const { activeSuggestionIndex, showDrop } = this.state;
    if (suggestions && suggestions.length > 0 && showDrop) {
      event.preventDefault();
      const index = Math.max(activeSuggestionIndex - 1, 0);
      this.setState({ activeSuggestionIndex: index });
      // this.setState({ activeSuggestionIndex: index },
      //   this._announceSuggestion.bind(this, index));
    }
  }

  onClickSuggestion = (suggestion) => {
    const { onSelect } = this.props;
    this.setState({ value: suggestion, showDrop: false });
    if (onSelect) {
      onSelect({
        target: this.componentRef, suggestion,
      });
    }
  }

  onSuggestionSelect = (event) => {
    const { onSelect, suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    this.setState({ showDrop: false });
    if (activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      const suggestion = suggestions[activeSuggestionIndex];
      this.setState({ value: suggestion });
      // this.setState({ value: suggestion }, () => {
      //   const suggestionMessage = this._renderLabel(suggestion);
      //   const selectedMessage = Intl.getMessage(intl, 'Selected');
      //   announce(`${suggestionMessage} ${selectedMessage}`);
      // });
      if (onSelect) {
        onSelect({
          target: this.componentRef, suggestion,
        });
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
        <li key={renderLabel(suggestion)}>
          <Button
            active={activeSuggestionIndex === index}
            fill={true}
            hoverIndicator='background'
            onClick={() => this.onClickSuggestion(suggestion)}
          >
            <Box
              align='start'
              pad='small'
              background={
                selectedSuggestionIndex === index ? (
                  theme.global.selected.backgroundColor
                ) : undefined
              }
            >
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
    const { defaultValue, focus, plain, value, onInput, onKeyDown, ...rest } = this.props;
    delete rest.onInput; // se we can manage in onInputChange()
    const { showDrop } = this.state;
    // needed so that styled components does not invoke
    // onSelect when text input is clicked
    delete rest.onSelect;
    let drop;
    if (showDrop) {
      drop = (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          responsive={false}
          context={{ ...this.context }}
          control={this.componentRef}
          onClose={() => this.setState({ showDrop: false })}
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
            ref={(ref) => {
              this.componentRef = ref;
            }}
            autoComplete='off'
            plain={plain}
            {...rest}
            focus={!plain && focus}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
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
  withTheme,
)(TextInput);
