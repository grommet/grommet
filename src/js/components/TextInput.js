// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import { findAncestor } from '../utils/DOM';

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

    this.state = {
      dropActive: false,
      defaultValue: props.defaultValue,
      value: props.value,
      activeSuggestionIndex: -1
    };
  }

  componentDidUpdate (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.

    let activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    let focusedKeyboardHandlers = {
      down: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.focused && prevState.focused) {
      KeyboardAccelerators.stopListeningToKeyboard(this,
        focusedKeyboardHandlers);
    }

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this,
        activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.focused && ! prevState.focused) {
      KeyboardAccelerators.startListeningToKeyboard(this,
        focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this,
        activeKeyboardHandlers);

      // If this is inside a FormField, place the drop in reference to it.
      const control =
        findAncestor(this.componentRef, FORM_FIELD) || this.componentRef;
      this._drop = Drop.add(control,
        this._renderDrop(), { align: {top: 'bottom', left: 'left'} });
    } else if (this.state.dropActive && prevState.dropActive) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._drop) {
      this._drop.remove();
    }
  }

  _fireDOMChange () {
    let event;
    try {
      event = new Event('change', {
        'bubbles': true,
        'cancelable': true
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }
    // We use dispatchEvent to have the browser fill out the event fully.
    this.componentRef.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    this.props.onDOMChange(event);
  }

  _onInputChange (event) {
    this.setState({dropActive: true, activeSuggestionIndex: -1});
    if (this.props.onDOMChange) {
      this._fireDOMChange();
    }
  }

  _onAddDrop (event) {
    event.preventDefault();
    // Get values of suggestions, so we can highlight selected suggestion
    if (this.props.suggestions) {
      let suggestionValues = this.props.suggestions.map((suggestion) => {
        if (typeof suggestion === 'object') {
          return suggestion.value;
        } else {
          return suggestion;
        }
      });
      let activeSuggestionIndex = suggestionValues.indexOf(this.props.value);
      this.setState({
        dropActive: true,
        activeSuggestionIndex: activeSuggestionIndex
      });
    }
  }

  _onRemoveDrop () {
    this.setState({dropActive: false});
  }

  _onNextSuggestion () {
    let index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({activeSuggestionIndex: index});
  }

  _onPreviousSuggestion () {
    let index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeSuggestionIndex: index});
  }

  _onEnter (event) {
    this.setState({dropActive: false});
    if (this.state.activeSuggestionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      let suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({value: suggestion});
      if (this.props.onSelect) {
        this.props.onSelect({
          target: this.componentRef, suggestion: suggestion
        });
      }
    }
  }

  _onClickSuggestion (suggestion) {
    this.setState({value: suggestion, dropActive: false});
    if (this.props.onSelect) {
      this.props.onSelect({
        target: this.componentRef, suggestion: suggestion
      });
    }
  }

  _onFocus () {
    this.setState({
      focused: true,
      activeSuggestionIndex: -1
    });
    // delay to wait out subsequent render after state change
    setTimeout(() => {
      this.componentRef.select();
    }, 10);
  }

  _renderLabel (suggestion) {
    if (typeof suggestion === 'object') {
      return suggestion.label || suggestion.value;
    } else {
      return suggestion;
    }
  }

  _renderDrop () {
    let suggestions = null;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        let classes = classnames(
          {
            [`${CLASS_ROOT}__suggestion`]: true,
            [`${CLASS_ROOT}__suggestion--active`]:
              index === this.state.activeSuggestionIndex
          }
        );
        return (
          <li key={index}
            className={classes}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._renderLabel(suggestion)}
          </li>
        );
      }, this);
    }

    return (
      <ol className={`${CLASS_ROOT}__suggestions`} onClick={this._onRemoveDrop}>
        {suggestions}
      </ol>
    );
  }

  render () {
    let classes = classnames(
      CLASS_ROOT,
      INPUT,
      {
        [`${CLASS_ROOT}--active`]: this.state.active
      },
      this.props.className
    );

    return (
      <input ref={ref => this.componentRef = ref}
        id={this.props.id} name={this.props.name}
        className={classes}
        value={this._renderLabel(this.props.value)}
        defaultValue={this._renderLabel(this.props.defaultValue)}
        placeholder={this.props.placeHolder}
        autoComplete="off"
        onChange={this._onInputChange}
        onFocus={this._onFocus} />
    );
  }

}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onDOMChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeHolder: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string
};
