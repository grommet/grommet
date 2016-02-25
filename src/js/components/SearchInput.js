// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import KeyboardAccelerators from '../utils/KeyboardAccelerators';
import Drop from '../utils/Drop';
import Button from './Button';

const CLASS_ROOT = "search-input";

export default class SearchInput extends Component {

  constructor(props) {
    super(props);

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

    var activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    var focusedKeyboardHandlers = {
      down: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.focused && prevState.focused) {
      KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.focused && ! prevState.focused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      this._drop = Drop.add(ReactDOM.findDOMNode(this.refs.component),
        this._renderDrop(), {top: 'bottom', left: 'left'});
    } else if (this.state.dropActive && prevState.dropActive) {
      this._drop.render(this._renderDrop());
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this._onRemoveDrop);
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
    this.refs.input.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    this.props.onDOMChange(event);
  }

  _onInputChange (event) {
    this.setState({dropActive: true, activeSuggestionIndex: -1});
    if (this.props.onChange) {
      this.props.onChange(event.target.value, false);
    }
    if (this.props.onDOMChange) {
      this._fireDOMChange();
    }
  }

  _onAddDrop (event) {
    event.preventDefault();
    this.setState({dropActive: true, activeSuggestionIndex: -1});
  }

  _onRemoveDrop () {
    this.setState({dropActive: false});
  }

  _onNextSuggestion () {
    var index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({activeSuggestionIndex: index});
  }

  _onPreviousSuggestion () {
    var index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeSuggestionIndex: index});
  }

  _onEnter (event) {
    event.preventDefault(); // prevent submitting forms
    this.setState({dropActive: false});
    if (this.state.activeSuggestionIndex >= 0) {
      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({value: suggestion});
      if (this.props.onChange) {
        this.props.onChange(suggestion, true);
      }
      if (this.props.onSelect) {
        this.props.onSelect({target: this.refs.input, suggestion: suggestion});
      }
    }
  }

  _onClickSuggestion (suggestion) {
    this.setState({value: suggestion, dropActive: false});
    if (this.props.onChange) {
      this.props.onChange(suggestion, true);
    }
    if (this.props.onSelect) {
      this.props.onSelect({target: this.refs.input, suggestion: suggestion});
    }
  }

  _onFocus () {
    ReactDOM.findDOMNode(this.refs.input).select();
    this.setState({
      focused: true,
      dropActive: (this.props.suggestions && this.props.suggestions.length > 0),
      activeSuggestionIndex: -1
    });
  }

  _renderLabel (suggestion) {
    if (typeof suggestion === 'object') {
      return suggestion.label || suggestion.value;
    } else {
      return suggestion;
    }
  }

  _renderDrop () {
    var suggestions = null;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        var classes = [CLASS_ROOT + "__suggestion"];
        if (index === this.state.activeSuggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        return (
          <li key={index}
            className={classes.join(' ')}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._renderLabel(suggestion)}
          </li>
        );
      }, this);
    }

    return (
      <ol className={CLASS_ROOT + "__suggestions"} onClick={this._onRemoveDrop}>
        {suggestions}
      </ol>
    );
  }

  render () {
    var classes = [CLASS_ROOT];
    if (this.state.active) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div ref="component" className={classes.join(' ')}>
        <input ref="input" className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name}
          value={this._renderLabel(this.props.value)}
          defaultValue={this._renderLabel(this.props.defaultValue)}
          placeholder={this.props.placeHolder}
          onChange={this._onInputChange}
          onFocus={this._onFocus} />
        <Button className={CLASS_ROOT + "__control"} icon="Search"
          onClick={this._onAddDrop} />
      </div>
    );
  }

}

SearchInput.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
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
  value: PropTypes.oneOfType([
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    PropTypes.string
  ])
};
