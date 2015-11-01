// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var KeyboardAccelerators = require('../utils/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var Responsive = require('../utils/Responsive');
var SearchIcon = require('./icons/Search');

var CLASS_ROOT = "search";

var Search = React.createClass({
  displayName: 'Search',

  propTypes: {
    defaultValue: PropTypes.string,
    dropAlign: Drop.alignPropType,
    dropColorIndex: PropTypes.string,
    inline: PropTypes.bool,
    large: PropTypes.bool,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    responsive: PropTypes.bool,
    suggestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      label: PropTypes.string.isRequired
    })])),
    value: PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      align: 'left',
      inline: false,
      responsive: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      align: 'left',
      controlFocused: false,
      inline: this.props.inline,
      dropActive: false,
      activeSuggestionIndex: -1
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.inline && this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.suggestions && nextProps.suggestions.length > 0 && !this.state.dropActive && this.refs.input === document.activeElement) {
      this.setState({ dropActive: true });
    } else if (!nextProps.suggestions || nextProps.suggestions.length === 0) {
      this.setState({ dropActive: false });
    }
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
      space: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (!this.state.controlFocused && prevState.controlFocused) {
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

    if (this.state.controlFocused && !prevState.controlFocused) {
      KeyboardAccelerators.startListeningToKeyboard(this, focusedKeyboardHandlers);
    }

    if (this.state.dropActive && !prevState.dropActive) {
      // Slow down adding the click handler,
      // otherwise the drop will close when the mouse is released.
      // Not observable in Safari, 1ms is sufficient for Chrome, Firefox needs 100ms though. :(
      // TODO: re-evaluate how to solve this without a timeout.
      setTimeout((function () {
        document.addEventListener('click', this._onRemoveDrop);
      }).bind(this), 100);
      KeyboardAccelerators.startListeningToKeyboard(this, activeKeyboardHandlers);

      var baseElement = this.refs.control || this.refs.input;
      var dropAlign = this.props.dropAlign || {
        top: this.state.inline ? 'bottom' : 'top',
        left: 'left'
      };
      this._drop = Drop.add(baseElement, this._renderDrop(), dropAlign);

      if (!this.state.inline) {
        document.getElementById('search-drop-input').focus();
      }
    } else if (this._drop) {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    document.removeEventListener('click', this._onRemoveDrop);
    KeyboardAccelerators.stopListeningToKeyboard(this);
    if (this._responsive) {
      this._responsive.stop();
    }
    if (this._drop) {
      this._drop.remove();
    }
  },

  _onAddDrop: function _onAddDrop(event) {
    event.preventDefault();
    this.setState({ dropActive: true, activeSuggestionIndex: -1 });
  },

  _onRemoveDrop: function _onRemoveDrop() {
    this.setState({ dropActive: false });
  },

  _onFocusControl: function _onFocusControl() {
    this.setState({
      controlFocused: true,
      dropActive: true,
      activeSuggestionIndex: -1
    });
  },

  _onBlurControl: function _onBlurControl() {
    this.setState({ controlFocused: false });
  },

  _onFocusInput: function _onFocusInput() {
    this.refs.input.select();
    this.setState({
      dropActive: !this.state.inline || this.props.suggestions && this.props.suggestions.length > 0,
      activeSuggestionIndex: -1
    });
  },

  _onBlurInput: function _onBlurInput() {
    //this.setState({drop: false});
  },

  _onChangeInput: function _onChangeInput(event) {
    this.setState({ activeSuggestionIndex: -1 });
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
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
    if (this.state.activeSuggestionIndex >= 0) {
      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      if (this.props.onChange) {
        this.props.onChange(suggestion);
      }
    }
    this._onRemoveDrop();
  },

  _onClickSuggestion: function _onClickSuggestion(item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._onRemoveDrop();
  },

  _onSink: function _onSink(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  },

  _onResponsive: function _onResponsive(small) {
    if (small) {
      this.setState({ inline: false });
    } else {
      this.setState({ inline: this.props.inline });
    }
  },

  focus: function focus() {
    var ref = this.refs.input || this.refs.control;
    if (ref) {
      ref.focus();
    }
  },

  _createControl: function _createControl() {
    var controlClassName = CLASS_ROOT + "__control";
    return React.createElement(
      'div',
      { className: controlClassName },
      React.createElement(SearchIcon, null)
    );
  },

  _classes: function _classes(prefix) {
    var classes = [prefix];

    if (this.state.inline) {
      classes.push(prefix + "--inline");
    } else {
      classes.push(prefix + "--controlled");
    }

    return classes;
  },

  _renderSuggestionLabel: function _renderSuggestionLabel(suggestion) {
    var label;
    if (suggestion.hasOwnProperty('label')) {
      label = suggestion.label;
    } else {
      label = suggestion;
    }
    return label;
  },

  _renderDrop: function _renderDrop() {
    var classes = this._classes(CLASS_ROOT + "__drop");
    if (this.props.dropColorIndex) {
      classes.push("background-color-index-" + this.props.dropColorIndex);
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "__drop--large");
    }

    var input;
    if (!this.state.inline) {
      input = React.createElement('input', { id: 'search-drop-input', type: 'search',
        defaultValue: this.props.defaultValue,
        value: this.props.value,
        className: CLASS_ROOT + "__input",
        onChange: this._onChangeInput });
    }

    var suggestions;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (item, index) {
        var classes = [CLASS_ROOT + "__suggestion"];
        if (index === this.state.activeSuggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        return React.createElement(
          'div',
          { key: index,
            className: classes.join(' '),
            onClick: this._onClickSuggestion.bind(this, item) },
          this._renderSuggestionLabel(item)
        );
      }, this);
    }

    var contents = React.createElement(
      'div',
      { className: CLASS_ROOT + "__drop-contents", onClick: this._onSink },
      input,
      React.createElement(
        'div',
        { className: CLASS_ROOT + "__suggestions" },
        suggestions
      )
    );

    if (!this.state.inline) {
      var control = this._createControl();
      var rightAlign = this.props.dropAlign && !this.props.dropAlign.left;
      var first = rightAlign ? contents : control;
      var second = rightAlign ? control : contents;

      contents = React.createElement(
        'div',
        { className: CLASS_ROOT + "__drop-header" },
        first,
        second
      );
    }

    return React.createElement(
      'div',
      { id: 'search-drop', className: classes.join(' ') },
      contents
    );
  },

  render: function render() {

    var classes = this._classes(CLASS_ROOT);
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {

      return React.createElement(
        'div',
        { className: classes.join(' ') },
        React.createElement('input', { ref: 'input', type: 'search',
          placeholder: this.props.placeHolder,
          defaultValue: this.props.defaultValue,
          value: this.props.value,
          className: CLASS_ROOT + "__input",
          onFocus: this._onFocusInput,
          onBlur: this._onBlurInput,
          onChange: this._onChangeInput })
      );
    } else {

      var controlContents = this._createControl();

      return React.createElement(
        'div',
        { ref: 'control', className: classes.join(' '),
          tabIndex: '0',
          onClick: this._onAddDrop,
          onFocus: this._onFocusControl,
          onBlur: this._onBlurControl },
        controlContents
      );
    }
  }

});

module.exports = Search;