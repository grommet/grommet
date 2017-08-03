import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import StyledTextInput, { StyledSuggestion, StyledSuggestions } from './StyledTextInput';
import { Button } from '../button';
import { Keyboard } from '../keyboard';

import { withFocus, withTheme } from '../hocs';
import { Drop } from '../utils';

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

  componentDidUpdate(prevProps, prevState) {
    const { theme } = this.props;
    const { dropActive } = this.state;

    if (!dropActive && prevState.dropActive) {
      document.removeEventListener('click', this.removeDrop);
      if (this.drop) {
        this.drop.remove();
        this.drop = undefined;
      }
    } else if (dropActive && !prevState.dropActive) {
      this.removeDrop = (event) => {
        if (!findDOMNode(this.componentRef).contains(event.target)) {
          // only close the drop if clicked outside it
          this.setState({ dropActive: false });
        }
      };
      document.addEventListener('click', this.removeDrop);

      // If this is inside a FormField, place the drop in reference to it.
      // TODO: fix form field
      // findAncestor(this.componentRef, FORM_FIELD)
      const control = this.componentRef;
      this.drop = new Drop(
        findDOMNode(control),
        this.renderDropContent(), {
          align: { top: 'bottom', left: 'left' },
          responsive: false, // so suggestion changes don't re-align
          theme,
        }
      );
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
    if (this.drop) {
      this.drop.remove();
    }
  }

  onInputChange() {
    const { suggestions } = this.props;

    if (suggestions && suggestions.length) {
      this.setState({
        activeSuggestionIndex: -1,
        announceChange: true,
        dropActive: true,
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

  onAddDrop() {
    const { suggestions } = this.props;
    // Get values of suggestions, so we can highlight selected suggestion
    if (suggestions && suggestions.length > 0) {
      const selectedSuggestionIndex = this.getSelectedSuggestionIndex();

      this.setState({
        dropActive: true,
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
    this.setState({ value: suggestion, dropActive: false });
    if (onSelect) {
      onSelect({
        target: this.componentRef, suggestion,
      });
    }
  }

  renderDropContent() {
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
    // needed so that styled components does not invoke
    // onSelect when text input is clicked
    delete rest.onSelect;
    const previousSuggestionHandler = (event) => {
      const { suggestions } = this.props;
      const { dropActive } = this.state;
      if (suggestions && suggestions.length > 0 && dropActive) {
        event.preventDefault();
        this.onPreviousSuggestion();
      }
    };
    const nextSuggestionHandler = (event) => {
      const { suggestions } = this.props;
      const { dropActive } = this.state;
      if (suggestions && suggestions.length > 0) {
        if (!dropActive) {
          this.onAddDrop();
        } else {
          event.preventDefault();
          this.onNextSuggestion();
        }
      }
    };
    return (
      <Keyboard
        onEnter={(event) => {
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
        }}
        onEsc={() => this.setState({ dropActive: false })}
        onTab={() => this.setState({ dropActive: false })}
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
