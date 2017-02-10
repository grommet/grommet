// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';
import Intl from '../utils/Intl';
import { announce } from '../utils/Announcer';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.TEXT_INPUT;
const INPUT = CSSClassnames.INPUT;
const FORM_FIELD = CSSClassnames.FORM_FIELD;

export default class TextInput extends Component {

  constructor(props, context) {
    super(props, context);

    this._onInputChange = this._onInputChange.bind(this);
    this._onAddDrop = this._onAddDrop.bind(this);
    this._onRemoveDrop = this._onRemoveDrop.bind(this);
    this._onNextSuggestion = this._onNextSuggestion.bind(this);
    this._onPreviousSuggestion = this._onPreviousSuggestion.bind(this);
    this._onEnter = this._onEnter.bind(this);
    this._onClickSuggestion = this._onClickSuggestion.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._stopPropagation = this._stopPropagation.bind(this);
    this._announceSuggestion = this._announceSuggestion.bind(this);

    this.state = {
      announceChange: false,
      dropActive: false,
      activeSuggestionIndex: -1
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const { suggestions } = this.props;
    const { announceChange, dropActive, focused } = this.state;
    const { intl } = this.context;
    // Set up keyboard listeners appropriate to the current state.
    const activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    const focusedKeyboardHandlers = {
      down: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! focused && prevState.focused) {
      KeyboardAccelerators.stopListeningToKeyboard(this,
        focusedKeyboardHandlers);
    }

    if (! dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this,
        activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = undefined;
      }
    }

    if (focused && ! prevState.focused) {
      KeyboardAccelerators.startListeningToKeyboard(this,
        focusedKeyboardHandlers);
    }

    if (dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this,
        activeKeyboardHandlers);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.componentRef, FORM_FIELD) || this.componentRef;
      this._drop = new Drop(control,
        this._renderDropContent(), {
          align: {top: 'bottom', left: 'left'},
          responsive: false // so suggestion changes don't re-align
        });
    } else if (dropActive && prevState.dropActive) {
      this._drop.render(this._renderDropContent());
    }

    if (announceChange && suggestions) {
      const matchResultsMessage = Intl.getMessage(
        intl, 'Match Results', {
          count: suggestions.length
        }
      );
      let navigationHelpMessage = '';
      if (suggestions.length) {
        navigationHelpMessage = `(${Intl.getMessage(intl, 'Navigation Help')})`;
      }
      announce(`${matchResultsMessage} ${navigationHelpMessage}`);
      this.setState({ announceChange: false });
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._drop) {
      this._drop.remove();
    }
  }

  _stopPropagation () {
    if (document.activeElement === this.componentRef) {
      return true;
    }
  }

  _onInputChange (event) {
    const { onDOMChange } = this.props;
    this.setState({
      activeSuggestionIndex: -1, announceChange: true, dropActive: true
    });
    if (onDOMChange) {
      onDOMChange(event);
    }
  }

  _announceSuggestion (index) {
    const { suggestions } = this.props;
    const { intl } = this.context;
    const labelMessage = this._renderLabel(suggestions[index]);
    const enterSelectMessage = Intl.getMessage(intl, 'Enter Select');
    announce(`${labelMessage} ${enterSelectMessage}`);
  }

  _onAddDrop (event) {
    const { suggestions, value } = this.props;
    // Get values of suggestions, so we can highlight selected suggestion
    if (suggestions) {
      event.preventDefault();
      const suggestionValues = suggestions.map((suggestion) => {
        if (typeof suggestion === 'object') {
          return suggestion.value;
        } else {
          return suggestion;
        }
      });
      const activeSuggestionIndex = suggestionValues.indexOf(value);
      this.setState({
        dropActive: true,
        activeSuggestionIndex: activeSuggestionIndex
      });
    }
  }

  _onRemoveDrop () {
    this.setState({ dropActive: false });
  }

  _onNextSuggestion () {
    const { suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    const index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
    this.setState({ activeSuggestionIndex: index },
      this._announceSuggestion.bind(this, index));
  }

  _onPreviousSuggestion () {
    const { activeSuggestionIndex } = this.state;
    const index = Math.max(activeSuggestionIndex - 1, 0);
    this.setState({ activeSuggestionIndex: index },
      this._announceSuggestion.bind(this, index));
  }

  _onEnter (event) {
    const { onSelect, suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    const { intl } = this.context;
    this.setState({ dropActive: false });
    if (activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      const suggestion = suggestions[activeSuggestionIndex];
      this.setState({ value: suggestion }, () => {
        const suggestionMessage = this._renderLabel(suggestion);
        const selectedMessage = Intl.getMessage(intl, 'Selected');
        announce(`${suggestionMessage} ${selectedMessage}`);
      });
      if (onSelect) {
        onSelect({
          target: this.componentRef, suggestion: suggestion
        });
      }
    }
  }

  _onClickSuggestion (suggestion) {
    const { onSelect } = this.props;
    this.setState({ value: suggestion, dropActive: false });
    if (onSelect) {
      onSelect({
        target: this.componentRef, suggestion: suggestion
      });
    }
  }

  _onFocus (event) {
    const { onFocus } = this.props;
    this.setState({
      focused: true,
      activeSuggestionIndex: -1
    });
    // elements with autoFocus=true will be focused before the ref is available
    if (this.componentRef) {
      this.componentRef.select();
    }

    if (onFocus) {
      onFocus(event);
    }
  }

  _onInputKeyDown (event) {
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
          this._onAddDrop(event);
        }
      }

      if(event.keyCode === tab) {
        this.setState({ focused: false });
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  _renderLabel (suggestion) {
    if (typeof suggestion === 'object') {
      return suggestion.label || suggestion.value;
    } else {
      return suggestion;
    }
  }

  _renderDropContent () {
    const { suggestions } = this.props;
    const { activeSuggestionIndex } = this.state;
    let items;
    if (suggestions) {
      items = suggestions.map((suggestion, index) => {
        let classes = classnames(
          {
            [`${CLASS_ROOT}__suggestion`]: true,
            [`${CLASS_ROOT}__suggestion--active`]:
              index === activeSuggestionIndex
          }
        );
        return (
          <li key={index} className={classes}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._renderLabel(suggestion)}
          </li>
        );
      });
    }

    return (
      <ol className={`${CLASS_ROOT}__suggestions`} onClick={this._onRemoveDrop}>
        {items}
      </ol>
    );
  }

  render () {
    const {
      className, defaultValue, value, placeHolder, ...props
    } = this.props;
    delete props.suggestions;
    delete props.onDOMChange;
    delete props.onSelect;
    let classes = classnames(
      CLASS_ROOT,
      INPUT,
      {
        [`${CLASS_ROOT}--active`]: this.state.active
      },
      className
    );

    return (
      <input ref={ref => this.componentRef = ref} {...props}
        className={classes} autoComplete="off"
        defaultValue={this._renderLabel(defaultValue)}
        value={this._renderLabel(value)}
        placeholder={placeHolder}
        onChange={this._onInputChange} onFocus={this._onFocus}
        onKeyDown={this._onInputKeyDown} />
    );
  }

}

TextInput.contextTypes = {
  intl: PropTypes.object
};

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onDOMChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeHolder: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.any
      }),
      PropTypes.string
    ])
  ),
  value: PropTypes.string
};
