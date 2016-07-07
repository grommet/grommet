'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Search = require('./icons/base/Search');

var _Search2 = _interopRequireDefault(_Search);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SEARCH_INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var SearchInput = function (_Component) {
  (0, _inherits3.default)(SearchInput, _Component);

  function SearchInput(props) {
    (0, _classCallCheck3.default)(this, SearchInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchInput).call(this, props));

    _this._onInputChange = _this._onInputChange.bind(_this);
    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onNextSuggestion = _this._onNextSuggestion.bind(_this);
    _this._onPreviousSuggestion = _this._onPreviousSuggestion.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onClickSuggestion = _this._onClickSuggestion.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);

    _this.state = {
      dropActive: false,
      defaultValue: props.defaultValue,
      value: props.value,
      activeSuggestionIndex: -1
    };
    return _this;
  }

  (0, _createClass3.default)(SearchInput, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
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
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, focusedKeyboardHandlers);
      }

      if (!this.state.dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = null;
        }
      }

      if (this.state.focused && !prevState.focused) {
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
      }

      if (this.state.dropActive && !prevState.dropActive) {
        document.addEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.refs.component, FORM_FIELD) || this.refs.component;
        this._drop = _Drop2.default.add(control, this._renderDrop(), { align: { top: 'bottom', left: 'left' } });
      } else if (this.state.dropActive && prevState.dropActive) {
        this._drop.render(this._renderDrop());
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
    key: '_fireDOMChange',
    value: function _fireDOMChange() {
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
      this.refs.input.dispatchEvent(event);
      // Manually dispatched events aren't delivered by React, so we notify too.
      this.props.onDOMChange(event);
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(event) {
      this.setState({ dropActive: true, activeSuggestionIndex: -1 });
      if (this.props.onDOMChange) {
        this._fireDOMChange();
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      event.preventDefault();
      // Get values of suggestions, so we can highlight selected suggestion
      if (this.props.suggestions) {
        var suggestionValues = this.props.suggestions.map(function (suggestion) {
          if ((typeof suggestion === 'undefined' ? 'undefined' : (0, _typeof3.default)(suggestion)) === 'object') {
            return suggestion.value;
          } else {
            return suggestion;
          }
        });
        var activeSuggestionIndex = suggestionValues.indexOf(this.props.value);
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
      var index = this.state.activeSuggestionIndex;
      index = Math.min(index + 1, this.props.suggestions.length - 1);
      this.setState({ activeSuggestionIndex: index });
    }
  }, {
    key: '_onPreviousSuggestion',
    value: function _onPreviousSuggestion() {
      var index = this.state.activeSuggestionIndex;
      index = Math.max(index - 1, 0);
      this.setState({ activeSuggestionIndex: index });
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      this.setState({ dropActive: false });
      if (this.state.activeSuggestionIndex >= 0) {
        event.preventDefault(); // prevent submitting forms
        var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
        this.setState({ value: suggestion });
        if (this.props.onSelect) {
          this.props.onSelect({ target: this.refs.input, suggestion: suggestion });
        }
      }
    }
  }, {
    key: '_onClickSuggestion',
    value: function _onClickSuggestion(suggestion) {
      this.setState({ value: suggestion, dropActive: false });
      if (this.props.onSelect) {
        this.props.onSelect({ target: this.refs.input, suggestion: suggestion });
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      var _this2 = this;

      this.setState({
        focused: true,
        activeSuggestionIndex: -1
      });
      // delay to wait out subsequent render after state change
      setTimeout(function () {
        _this2.refs.input.select();
      }, 10);
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
      var suggestions = null;
      if (this.props.suggestions) {
        suggestions = this.props.suggestions.map(function (suggestion, index) {
          var _classnames;

          var classes = (0, _classnames4.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__suggestion', true), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__suggestion--active', index === this.state.activeSuggestionIndex), _classnames));
          return _react2.default.createElement(
            'li',
            { key: index,
              className: classes,
              onClick: this._onClickSuggestion.bind(this, suggestion) },
            this._renderLabel(suggestion)
          );
        }, this);
      }

      return _react2.default.createElement(
        'ol',
        { className: CLASS_ROOT + '__suggestions', onClick: this._onRemoveDrop },
        suggestions
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames4.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', this.state.active), this.props.className);

      return _react2.default.createElement(
        'div',
        { ref: 'component', className: classes },
        _react2.default.createElement('input', { ref: 'input', className: CLASS_ROOT + '__input',
          id: this.props.id, name: this.props.name,
          value: this._renderLabel(this.props.value),
          defaultValue: this._renderLabel(this.props.defaultValue),
          placeholder: this.props.placeHolder,
          autoComplete: 'off',
          onChange: this._onInputChange,
          onFocus: this._onFocus }),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', icon: _react2.default.createElement(_Search2.default, null),
          onClick: this._onAddDrop })
      );
    }
  }]);
  return SearchInput;
}(_react.Component);

SearchInput.displayName = 'SearchInput';
exports.default = SearchInput;


SearchInput.propTypes = {
  defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string]),
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onDOMChange: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  placeHolder: _react.PropTypes.string,
  suggestions: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.any
  }), _react.PropTypes.string])),
  value: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.string
  }), _react.PropTypes.string])
};
module.exports = exports['default'];