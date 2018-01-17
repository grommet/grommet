'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TEXT_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props, context) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props, context));

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
      activeSuggestionIndex: -1
    };
    return _this;
  }

  _createClass(TextInput, [{
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
        var control = this.componentRef;
        this._drop = new _Drop2.default(control, this._renderDropContent(), {
          align: { top: 'bottom', left: 'left' },
          responsive: false // so suggestion changes don't re-align
        });
      } else if (dropActive && prevState.dropActive) {
        this._drop.render(this._renderDropContent());
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
    key: '_onInputChange',
    value: function _onInputChange(event) {
      var _props = this.props,
          onDOMChange = _props.onDOMChange,
          suggestions = _props.suggestions;


      if (suggestions && Array.isArray(suggestions)) {
        this.setState({
          activeSuggestionIndex: -1, announceChange: true, dropActive: true
        });
      }

      if (onDOMChange) {
        onDOMChange(event);
      }
    }
  }, {
    key: '_announceSuggestion',
    value: function _announceSuggestion(index) {
      var suggestions = this.props.suggestions;
      var intl = this.context.intl;

      if (suggestions && suggestions.length > 0) {
        var labelMessage = this._renderLabel(suggestions[index]);
        var enterSelectMessage = _Intl2.default.getMessage(intl, 'Enter Select');
        (0, _Announcer.announce)(labelMessage + ' ' + enterSelectMessage);
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      var _props2 = this.props,
          suggestions = _props2.suggestions,
          value = _props2.value;
      // Get values of suggestions, so we can highlight selected suggestion

      if (suggestions) {
        event.preventDefault();
        var suggestionValues = suggestions.map(function (suggestion) {
          if ((typeof suggestion === 'undefined' ? 'undefined' : _typeof(suggestion)) === 'object') {
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

      var _props3 = this.props,
          onSelect = _props3.onSelect,
          suggestions = _props3.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;
      var intl = this.context.intl;

      this.setState({ dropActive: false });
      if (activeSuggestionIndex >= 0) {
        event.preventDefault(); // prevent submitting forms
        var suggestion = suggestions[activeSuggestionIndex];
        this.setState({ value: suggestion }, function () {
          var suggestionMessage = _this2._renderLabel(suggestion);
          var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
          (0, _Announcer.announce)(suggestionMessage + ' ' + selectedMessage);
        });
        if (onSelect) {
          onSelect({
            target: this.componentRef, suggestion: suggestion
          });
        }
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
      var onFocus = this.props.onFocus;

      this.setState({
        focused: true,
        activeSuggestionIndex: -1
      });

      if (onFocus) {
        onFocus(event);
      }
    }
  }, {
    key: '_onInputKeyDown',
    value: function _onInputKeyDown(event) {
      var _props4 = this.props,
          onKeyDown = _props4.onKeyDown,
          suggestions = _props4.suggestions;
      var dropActive = this.state.dropActive;

      if (suggestions) {
        var up = 38;
        var down = 40;
        var tab = 9;
        if (event.keyCode === up || event.keyCode === down) {
          // stop the input to move the cursor when suggestions are present
          event.preventDefault();

          if (event.keyCode === down && !dropActive) {
            this._onAddDrop(event);
          }
        }

        if (event.keyCode === tab) {
          this.setState({ focused: false });
        }
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(suggestion) {
      if (suggestion && (typeof suggestion === 'undefined' ? 'undefined' : _typeof(suggestion)) === 'object') {
        return suggestion.label || suggestion.value;
      } else {
        return suggestion;
      }
    }
  }, {
    key: '_renderDropContent',
    value: function _renderDropContent() {
      var _this3 = this;

      var suggestions = this.props.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;

      var items = void 0;
      if (suggestions) {
        items = suggestions.map(function (suggestion, index) {
          var _classnames;

          var classes = (0, _classnames4.default)((_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__suggestion', true), _defineProperty(_classnames, CLASS_ROOT + '__suggestion--active', index === activeSuggestionIndex), _classnames));
          return _react2.default.createElement(
            'li',
            { key: index, className: classes,
              onClick: _this3._onClickSuggestion.bind(_this3, suggestion) },
            _this3._renderLabel(suggestion)
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
      var _this4 = this;

      var _props5 = this.props,
          className = _props5.className,
          defaultValue = _props5.defaultValue,
          value = _props5.value,
          placeHolder = _props5.placeHolder,
          props = _objectWithoutProperties(_props5, ['className', 'defaultValue', 'value', 'placeHolder']);

      delete props.suggestions;
      delete props.onDOMChange;
      delete props.onSelect;
      var classes = (0, _classnames4.default)(CLASS_ROOT, INPUT, _defineProperty({}, CLASS_ROOT + '--active', this.state.active), className);

      return _react2.default.createElement('input', _extends({
        ref: function ref(_ref) {
          return _this4.componentRef = _ref;
        },
        type: 'text',
        autoComplete: 'off'
      }, props, {
        className: classes,
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
  intl: _propTypes2.default.object
};

TextInput.propTypes = {
  defaultValue: _propTypes2.default.string,
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  onDOMChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  placeHolder: _propTypes2.default.string,
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.shape({
    label: _propTypes2.default.node,
    value: _propTypes2.default.any
  }), _propTypes2.default.string])),
  value: _propTypes2.default.string
};
module.exports = exports['default'];