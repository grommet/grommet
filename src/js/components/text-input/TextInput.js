import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import StyledTextInput, { StyledSuggestion, StyledSuggestions } from './StyledTextInput';

import { withFocus, withTheme } from '../hocs';
import { Drop, KeyboardAccelerators } from '../utils';

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
    dropActive: false,
  }

  constructor() {
    super();
    this.onRemoveDrop = this.onRemoveDrop.bind(this);
    this.onNextSuggestion = this.onNextSuggestion.bind(this);
    this.onPreviousSuggestion = this.onPreviousSuggestion.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { theme } = this.props;
    const { dropActive, focused } = this.state;
    // Set up keyboard listeners appropriate to the current state.
    const activeKeyboardHandlers = {
      esc: this.onRemoveDrop,
      tab: this.onRemoveDrop,
      up: this.onPreviousSuggestion,
      down: this.onNextSuggestion,
      enter: this.onEnter,
    };
    const focusedKeyboardHandlers = {
      down: this.onAddDrop,
    };

    // the order here is important, need to turn off keys before turning on
    if (!focused && prevState.focused) {
      KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (!dropActive && prevState.dropActive) {
      document.removeEventListener('click', this.onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
      if (this.drop) {
        this.drop.remove();
        this.drop = undefined;
      }
    }

    if (focused && !prevState.focused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (dropActive && !prevState.dropActive) {
      document.addEventListener('click', this.onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      // If this is inside a FormField, place the drop in reference to it.
      // TODO: fix form field
      // findAncestor(this.componentRef, FORM_FIELD)
      const control = this.componentRef;
      this.drop = new Drop(findDOMNode(control),
        this.renderDropContent(), {
          align: { top: 'bottom', left: 'left' },
          responsive: false, // so suggestion changes don't re-align
          theme,
        });
    } else if (dropActive && prevState.dropActive) {
      this.drop.render(this.renderDropContent());
    }

    // TODO: handle announce changes after we have Layer component
    // if (announceChange && suggestions) {
    //   const matchResultsMessage = Intl.getMessage(
    //     intl, 'Match Results', {
    //       count: suggestions.length
    //     }
    //   );
    //   let navigationHelpMessage = '';
    //   if (suggestions.length) {
    //     navigationHelpMessage = `(${Intl.getMessage(intl, 'Navigation Help')})`;
    //   }
    //   announce(`${matchResultsMessage} ${navigationHelpMessage}`);
    //   this.setState({ announceChange: false });
    // }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onRemoveDrop);
    if (this.drop) {
      this.drop.remove();
    }
  }

  onInputChange() {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length) {
      this.setState({
        activeSuggestionIndex: -1, announceChange: true, dropActive: true,
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

  onAddDrop(event) {
    const { suggestions, value } = this.props;
    // Get values of suggestions, so we can highlight selected suggestion
    if (suggestions) {
      event.preventDefault();
      const suggestionValues = suggestions.map((suggestion) => {
        if (typeof suggestion === 'object') {
          return suggestion.value;
        }
        return suggestion;
      });
      const activeSuggestionIndex = suggestionValues.indexOf(value);
      this.setState({
        dropActive: true,
        activeSuggestionIndex,
      });
    }
  }

  onRemoveDrop() {
    this.setState({ dropActive: false });
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

  onEnter(event) {
    const { onSelect, suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    this.setState({ dropActive: false });
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

  onClickSuggestion(suggestion) {
    const { onSelect } = this.props;
    this.setState({ value: suggestion, dropActive: false });
    if (onSelect) {
      onSelect({
        target: this.componentRef, suggestion,
      });
    }
  }

  renderDropContent() {
    const { suggestions, theme } = this.props;
    const { activeSuggestionIndex } = this.state;
    let items;
    if (suggestions) {
      // TODO: investigate removing onClick here and use button
      items = suggestions.map((suggestion, index) => (
        <StyledSuggestion
          key={renderLabel(suggestion)}
          active={activeSuggestionIndex === index}
          onClick={() => this.onClickSuggestion(suggestion)}
          theme={theme}
        >
          {renderLabel(suggestion)}
        </StyledSuggestion>
      ));
    }

    return (
      <StyledSuggestions onClick={this.onRemoveDrop} theme={theme}>
        {items}
      </StyledSuggestions>
    );
  }

  render() {
    const { defaultValue, value, ...rest } = this.props;
    // needed so that styled components does not invoke
    // onSelect when text input is clicked
    delete rest.onSelect;
    return (
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
        onFocus={(event) => {
          const { onFocus } = this.props;

          this.setState({
            focused: true,
            activeSuggestionIndex: -1,
          });

          if (onFocus) {
            onFocus(event);
          }
        }}
        onKeyDown={(event) => {
          const { onKeyDown, suggestions } = this.props;
          const { dropActive } = this.state;
          if (suggestions) {
            const up = 38;
            const down = 40;
            const tab = 9;
            if (event.keyCode === up || event.keyCode === down) {
              // stop the input to move the cursor when suggestions are present
              event.preventDefault();

              if (event.keyCode === down && !dropActive) {
                this.onAddDrop(event);
              }
            }

            if (event.keyCode === tab) {
              this.setState({ focused: false });
            }
          }

          if (onKeyDown) {
            onKeyDown(event);
          }
        }}
      />
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
