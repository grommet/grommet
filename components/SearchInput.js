// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var SearchIcon = require('./icons/Search');

var CLASS_ROOT = "search-input";

var SearchInput = React.createClass({
  displayName: 'SearchInput',

  propTypes: {
    defaultValue: React.PropTypes.oneOfType([React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string
    }), React.PropTypes.string]),
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string
    }), React.PropTypes.string])),
    value: React.PropTypes.oneOfType([React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.string
    }), React.PropTypes.string])
  },

  getInitialState: function getInitialState() {
    return {
      dropActive: false,
      defaultValue: this.props.defaultValue,
      value: this.props.value,
      activeSuggestionIndex: -1
    };
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
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

    if (!this.state.focused && prevState.focused) {
      KeyboardAccelerators.stopListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (!this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.stopListeningToKeyboard(this, activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.focused && !prevState.focused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (this.state.dropActive && !prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      this._drop = Drop.add(ReactDOM.findDOMNode(this.refs.component), this._renderDrop(), { top: 'bottom', left: 'left' });
    } else if (this.state.dropActive && prevState.dropActive) {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this._onRemoveDrop);
  },

  _onInputChange: function _onInputChange(event) {
    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
    this.props.onChange(event.target.value, false);
  },

  _onAddDrop: function _onAddDrop(event) {
    event.preventDefault();
    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
  },

  _onRemoveDrop: function _onRemoveDrop() {
    this.setState({ dropActive: false });
  },

  _onNextSuggestion: function _onNextSuggestion() {
    var index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({ activeSuggestionIndex: index });
  },

  _onPreviousSuggestion: function _onPreviousSuggestion() {
    var index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({ activeSuggestionIndex: index });
  },

  _onEnter: function _onEnter() {
    this.setState({ dropActive: false });
    if (this.state.activeSuggestionIndex >= 0) {
      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({ value: suggestion });
      this.props.onChange(suggestion, true);
    }
  },

  _onClickSuggestion: function _onClickSuggestion(suggestion) {
    this.setState({ value: suggestion, dropActive: false });
    this.props.onChange(suggestion, true);
  },

  _onFocus: function _onFocus() {
    ReactDOM.findDOMNode(this.refs.input).select();
    this.setState({
      focused: true,
      dropActive: false,
      activeSuggestionIndex: -1
    });
  },

  _valueText: function _valueText(value) {
    var text = '';
    if (value) {
      if ('string' === typeof value) {
        text = value;
      } else {
        text = value.label || value.value;
      }
    }
    return text;
  },

  _renderDrop: function _renderDrop() {
    var suggestions = null;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        var classes = [CLASS_ROOT + "__suggestion"];
        if (index === this.state.activeSuggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        return React.createElement(
          'li',
          { key: this._valueText(suggestion),
            className: classes.join(' '),
            onClick: this._onClickSuggestion.bind(this, suggestion) },
          this._valueText(suggestion)
        );
      }, this);
    }

    return React.createElement(
      'ol',
      { className: CLASS_ROOT + "__suggestions", onClick: this._onRemoveDrop },
      suggestions
    );
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.state.active) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return React.createElement(
      'div',
      { ref: 'component', className: classes.join(' ') },
      React.createElement('input', { ref: 'input', className: CLASS_ROOT + "__input",
        id: this.props.id, name: this.props.name,
        value: this._valueText(this.props.value),
        defaultValue: this._valueText(this.props.defaultValue),
        placeholder: this.props.placeHolder,
        onChange: this._onInputChange,
        onFocus: this._onFocus }),
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__control", onClick: this._onAddDrop },
        React.createElement(SearchIcon, null)
      )
    );
  }

});

module.exports = SearchInput;