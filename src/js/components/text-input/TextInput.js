import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import StyledTextInput, { StyledSuggestion, StyledSuggestions } from './StyledTextInput';
import { Button } from '../button';
import { Keyboard } from '../keyboard';
import { Drop } from '../drop';

import { withFocus, withTheme } from '../hocs';

import doc from './doc';

function renderLabel(suggestion) {
  if (suggestion && typeof suggestion === 'object') {
    return suggestion.label || suggestion.value;
  }
  return suggestion;
}

class TextInput extends Component {
  state = {
    activeSuggestionIndex: -1,
    announceChange: false,
    showDrop: false,
  }

  onInputChange() {
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

  getSelectedSuggestionIndex() {
    const { suggestions, value } = this.props;
    const suggestionValues = suggestions.map((suggestion) => {
      if (typeof suggestion === 'object') {
        return suggestion.value;
      }
      return suggestion;
    });
    return suggestionValues.indexOf(value);
  }

  onShowSuggestions() {
    const { suggestions } = this.props;
    // Get values of suggestions, so we can highlight selected suggestion
    if (suggestions && suggestions.length > 0) {
      const selectedSuggestionIndex = this.getSelectedSuggestionIndex();

      this.setState({
        showDrop: true,
        activeSuggestionIndex: -1,
        selectedSuggestionIndex,
      });
    }
  }

  onNextSuggestion() {
    const { suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    const index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
    this.setState({ activeSuggestionIndex: index });
    // this.setState({ activeSuggestionIndex: index },
    //   this._announceSuggestion.bind(this, index));
  }

  onPreviousSuggestion() {
    const { activeSuggestionIndex } = this.state;
    const index = Math.max(activeSuggestionIndex - 1, 0);
    this.setState({ activeSuggestionIndex: index });
    // this.setState({ activeSuggestionIndex: index },
    //   this._announceSuggestion.bind(this, index));
  }

  onClickSuggestion(suggestion) {
    const { onSelect } = this.props;
    this.setState({ value: suggestion, showDrop: false });
    if (onSelect) {
      onSelect({
        target: this.componentRef, suggestion,
      });
    }
  }

  renderSuggestions() {
    const { suggestions, theme } = this.props;
    const { activeSuggestionIndex, selectedSuggestionIndex } = this.state;
    let items;
    if (suggestions && suggestions.length > 0) {
      items = suggestions.map((suggestion, index) => (
        <li key={renderLabel(suggestion)}>
          <Button
            plain={true}
            fill={true}
            align='start'
            onClick={() => this.onClickSuggestion(suggestion)}
            hoverIndicator='background'
          >
            <StyledSuggestion
              active={activeSuggestionIndex === index}
              selected={selectedSuggestionIndex === index}
              theme={theme}
            >
              {renderLabel(suggestion)}
            </StyledSuggestion>
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
    const { defaultValue, value, onKeyDown, ...rest } = this.props;
    const { showDrop } = this.state;
    // needed so that styled components does not invoke
    // onSelect when text input is clicked
    delete rest.onSelect;
    const previousSuggestionHandler = (event) => {
      const { suggestions } = this.props;
      if (suggestions && suggestions.length > 0 && showDrop) {
        event.preventDefault();
        this.onPreviousSuggestion();
      }
    };
    const nextSuggestionHandler = (event) => {
      const { suggestions } = this.props;
      if (suggestions && suggestions.length > 0) {
        if (!showDrop) {
          this.onShowSuggestions();
        } else {
          event.preventDefault();
          this.onNextSuggestion();
        }
      }
    };
    const onEnterSuggestionHandler = (event) => {
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
    };
    let drop;
    if (showDrop) {
      drop = (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          responsive={false}
          theme={this.props.theme}
          control={findDOMNode(this.componentRef)}
          onClose={() => this.setState({ showDrop: false })}
        >
          {this.renderSuggestions()}
        </Drop>
      );
    }
    return (
      <div>
        <Keyboard
          onEnter={onEnterSuggestionHandler}
          onEsc={() => this.setState({ showDrop: false })}
          onTab={() => this.setState({ showDrop: false })}
          onUp={previousSuggestionHandler}
          onDown={nextSuggestionHandler}
          onKeyDown={onKeyDown}
        >
          <StyledTextInput
            ref={(ref) => {
              this.componentRef = ref;
            }}
            autoComplete='off'
            {...rest}
            defaultValue={renderLabel(defaultValue)}
            value={renderLabel(value)}
            onInput={(event) => {
              const { onDOMChange } = this.props;

              this.onInputChange();

              if (onDOMChange) {
                onDOMChange(event);
              }
            }}
          />
        </Keyboard>
        {drop}
      </div>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(TextInput);
}

export default compose(
  withFocus,
  withTheme,
)(TextInput);
