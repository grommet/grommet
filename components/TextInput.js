'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _DOM = require('../utils/DOM');

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TEXT_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var TextInput = function (_Component) {
  (0, _inherits3.default)(TextInput, _Component);

  function TextInput(props, context) {
    (0, _classCallCheck3.default)(this, TextInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TextInput.__proto__ || (0, _getPrototypeOf2.default)(TextInput)).call(this, props, context));

    _this._onInputChange = _this._onInputChange.bind(_this);
    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onNextSuggestion = _this._onNextSuggestion.bind(_this);
    _this._onPreviousSuggestion = _this._onPreviousSuggestion.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onClickSuggestion = _this._onClickSuggestion.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._onInputKeyDown = _this._onInputKeyDown.bind(_this);
    _this._stopPropagation = _this._stopPropagation.bind(_this);
    _this._announceSuggestion = _this._announceSuggestion.bind(_this);

    _this.state = {
      announceChange: false,
      dropActive: false,
      defaultValue: props.defaultValue,
      value: props.value,
      activeSuggestionIndex: -1
    };
    return _this;
  }

  (0, _createClass3.default)(TextInput, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var suggestions = this.props.suggestions;
      var _state = this.state,
          announceChange = _state.announceChange,
          dropActive = _state.dropActive,
          focused = _state.focused;
      var intl = this.context.intl;
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

      if (!focused && prevState.focused) {
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
      }

      if (!dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (focused && !prevState.focused) {
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
      }

      if (dropActive && !prevState.dropActive) {
        document.addEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.componentRef, FORM_FIELD) || this.componentRef;
        this._drop = _Drop2.default.add(control, this._renderDrop(), { align: { top: 'bottom', left: 'left' } });
      } else if (dropActive && prevState.dropActive) {
        this._drop.render(this._renderDrop());
      }

      if (announceChange && suggestions) {
        var matchResultsMessage = _Intl2.default.getMessage(intl, 'Match Results', {
          count: suggestions.length
        });
        var navigationHelpMessage = '';
        if (suggestions.length) {
          navigationHelpMessage = '(' + _Intl2.default.getMessage(intl, 'Navigation Help') + ')';
        }
        (0, _Announcer.announce)(matchResultsMessage + ' ' + navigationHelpMessage);
        this.setState({ announceChange: false });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._onRemoveDrop);
      if (this._drop) {
        this._drop.remove();
      }
    }
  }, {
    key: '_stopPropagation',
    value: function _stopPropagation() {
      if (document.activeElement === this.componentRef) {
        return true;
      }
    }
  }, {
    key: '_fireDOMChange',
    value: function _fireDOMChange() {
      var onDOMChange = this.props.onDOMChange;

      var event = void 0;
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
      onDOMChange(event);
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(event) {
      var onDOMChange = this.props.onDOMChange;

      this.setState({
        activeSuggestionIndex: -1, announceChange: true, dropActive: true
      });
      if (onDOMChange) {
        this._fireDOMChange();
      }
    }
  }, {
    key: '_announceSuggestion',
    value: function _announceSuggestion(index) {
      var suggestions = this.props.suggestions;
      var intl = this.context.intl;

      var labelMessage = this._renderLabel(suggestions[index]);
      var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
      (0, _Announcer.announce)(labelMessage + ' ' + enterSelectMessage);
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      var _props = this.props,
          suggestions = _props.suggestions,
          value = _props.value;
      // Get values of suggestions, so we can highlight selected suggestion

      if (suggestions) {
        event.preventDefault();
        var suggestionValues = suggestions.map(function (suggestion) {
          if ((typeof suggestion === 'undefined' ? 'undefined' : (0, _typeof3.default)(suggestion)) === 'object') {
            return suggestion.value;
          } else {
            return suggestion;
          }
        });
        var activeSuggestionIndex = suggestionValues.indexOf(value);
        this.setState({
          dropActive: true,
          activeSuggestionIndex: activeSuggestionIndex
        });
      }
    }
  }, {
    key: '_onRemoveDrop',
    value: function _onRemoveDrop() {
      this.setState({ dropActive: false });
    }
  }, {
    key: '_onNextSuggestion',
    value: function _onNextSuggestion() {
      var suggestions = this.props.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;

      var index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
      this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
    }
  }, {
    key: '_onPreviousSuggestion',
    value: function _onPreviousSuggestion() {
      var activeSuggestionIndex = this.state.activeSuggestionIndex;

      var index = Math.max(activeSuggestionIndex - 1, 0);
      this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var _this2 = this;

      var _props2 = this.props,
          onSelect = _props2.onSelect,
          suggestions = _props2.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;
      var intl = this.context.intl;

      this.setState({ dropActive: false });
      if (activeSuggestionIndex >= 0) {
        (function () {
          event.preventDefault(); // prevent submitting forms
          var suggestion = suggestions[activeSuggestionIndex];
          _this2.setState({ value: suggestion }, function () {
            var suggestionMessage = _this2._renderLabel(suggestion);
            var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
            (0, _Announcer.announce)(suggestionMessage + ' ' + selectedMessage);
          });
          if (onSelect) {
            onSelect({
              target: _this2.componentRef, suggestion: suggestion
            });
          }
        })();
      }
    }
  }, {
    key: '_onClickSuggestion',
    value: function _onClickSuggestion(suggestion) {
      var onSelect = this.props.onSelect;

      this.setState({ value: suggestion, dropActive: false });
      if (onSelect) {
        onSelect({
          target: this.componentRef, suggestion: suggestion
        });
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus(event) {
      var _this3 = this;

      var onFocus = this.props.onFocus;

      this.setState({
        focused: true,
        activeSuggestionIndex: -1
      });
      // delay to wait out subsequent render after state change
      setTimeout(function () {
        _this3.componentRef.select();
      }, 10);

      if (onFocus) {
        onFocus(event);
      }
    }
  }, {
    key: '_onInputKeyDown',
    value: function _onInputKeyDown(event) {
      var _props3 = this.props,
          onKeyDown = _props3.onKeyDown,
          suggestions = _props3.suggestions;
      var dropActive = this.state.dropActive;

      if (suggestions) {
        var up = 38;
        var down = 40;
        if (event.keyCode === up || event.keyCode === down) {
          // stop the input to move the cursor when suggestions are present
          event.preventDefault();

          if (event.keyCode === down && !dropActive) {
            this._onAddDrop(event);
          }
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(suggestion) {
      if ((typeof suggestion === 'undefined' ? 'undefined' : (0, _typeof3.default)(suggestion)) === 'object') {
        return suggestion.label || suggestion.value;
      } else {
        return suggestion;
      }
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var _this4 = this;

      var suggestions = this.props.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;

      var items = void 0;
      if (suggestions) {
        items = suggestions.map(function (suggestion, index) {
          var _classnames;

          var classes = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__suggestion', true), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__suggestion--active', index === activeSuggestionIndex), _classnames));
          return _react2.default.createElement(
            'li',
            { key: index, className: classes,
              onClick: _this4._onClickSuggestion.bind(_this4, suggestion) },
            _this4._renderLabel(suggestion)
          );
        });
      }

      return _react2.default.createElement(
        'ol',
        { className: CLASS_ROOT + '__suggestions', onClick: this._onRemoveDrop },
        items
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props4 = this.props,
          className = _props4.className,
          defaultValue = _props4.defaultValue,
          value = _props4.value,
          placeHolder = _props4.placeHolder,
          props = (0, _objectWithoutProperties3.default)(_props4, ['className', 'defaultValue', 'value', 'placeHolder']);

      delete props.suggestions;
      delete props.onDOMChange;
      delete props.onSelect;
      var classes = (0, _classnames4.default)(CLASS_ROOT, INPUT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', this.state.active), className);

      return _react2.default.createElement('input', (0, _extends3.default)({ ref: function ref(_ref) {
          return _this5.componentRef = _ref;
        } }, props, {
        className: classes, autoComplete: 'off',
        defaultValue: this._renderLabel(defaultValue),
        value: this._renderLabel(value),
        placeholder: placeHolder,
        onChange: this._onInputChange, onFocus: this._onFocus,
        onKeyDown: this._onInputKeyDown }));
    }
  }]);
  return TextInput;
}(_react.Component);

TextInput.displayName = 'TextInput';
exports.default = TextInput;


TextInput.contextTypes = {
  intl: _react.PropTypes.object
};

TextInput.propTypes = {
  defaultValue: _react.PropTypes.string,
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onDOMChange: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  placeHolder: _react.PropTypes.string,
  suggestions: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.any
  }), _react.PropTypes.string])),
  value: _react.PropTypes.string
};
module.exports = exports['default'];