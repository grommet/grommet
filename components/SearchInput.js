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

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Search = require('./icons/base/Search');

var _Search2 = _interopRequireDefault(_Search);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SEARCH_INPUT;
var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;

var SearchInput = function (_Component) {
  (0, _inherits3.default)(SearchInput, _Component);

  function SearchInput(props, context) {
    (0, _classCallCheck3.default)(this, SearchInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchInput.__proto__ || (0, _getPrototypeOf2.default)(SearchInput)).call(this, props, context));

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

  (0, _createClass3.default)(SearchInput, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var suggestions = this.props.suggestions;
      var _state = this.state,
          announceChange = _state.announceChange,
          dropActive = _state.dropActive;
      var intl = this.context.intl;
      // Set up keyboard listeners appropriate to the current state.

      var activeKeyboardHandlers = {
        esc: this._onRemoveDrop,
        tab: this._onRemoveDrop,
        up: this._onPreviousSuggestion,
        down: this._onNextSuggestion,
        enter: this._onEnter,
        left: this._stopPropagation,
        right: this._stopPropagation
      };

      // the order here is important, need to turn off keys before turning on
      if (!dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (dropActive && !prevState.dropActive) {
        document.addEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.componentRef, FORM_FIELD) || this.componentRef;
        this._drop = _Drop2.default.add(control, this._renderDrop(), {
          align: { top: 'bottom', left: 'left' }
        });

        this.inputRef.focus();
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
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
    }
  }, {
    key: '_stopPropagation',
    value: function _stopPropagation() {
      if (document.activeElement === this.inputRef) {
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
      this.inputRef.dispatchEvent(event);
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
      var intl = this.context.intl;

      var labelMessage = this._renderLabel(this.props.suggestions[index]);
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
        var suggestionValues = suggestions.map(this._renderLabel);
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

      if (suggestions) {
        var index = Math.min(activeSuggestionIndex + 1, suggestions.length - 1);
        this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
      }
    }
  }, {
    key: '_onPreviousSuggestion',
    value: function _onPreviousSuggestion() {
      var index = this.state.activeSuggestionIndex;
      index = Math.max(index - 1, 0);
      this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var _this2 = this;

      var _props2 = this.props,
          suggestions = _props2.suggestions,
          onSelect = _props2.onSelect;
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
            onSelect({ target: _this2.inputRef, suggestion: suggestion });
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
        onSelect({ target: this.inputRef, suggestion: suggestion });
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus() {
      this.setState({
        activeSuggestionIndex: -1
      });
    }
  }, {
    key: '_onInputKeyDown',
    value: function _onInputKeyDown(event) {
      var suggestions = this.props.suggestions;
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
      var _this3 = this;

      var suggestions = this.props.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;

      var suggestionsNode = void 0;
      if (suggestions) {
        suggestionsNode = suggestions.map(function (suggestion, index) {
          var classes = (0, _classnames4.default)(CLASS_ROOT + '__suggestion', (0, _defineProperty3.default)({}, CLASS_ROOT + '__suggestion--active', index === activeSuggestionIndex));
          return _react2.default.createElement(
            'li',
            { key: index, className: classes,
              onClick: _this3._onClickSuggestion.bind(_this3, suggestion) },
            _this3._renderLabel(suggestion)
          );
        }, this);
      }

      return _react2.default.createElement(
        'ol',
        { className: CLASS_ROOT + '__suggestions', onClick: this._onRemoveDrop },
        suggestionsNode
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props3 = this.props,
          className = _props3.className,
          defaultValue = _props3.defaultValue,
          id = _props3.id,
          name = _props3.name,
          placeHolder = _props3.placeHolder,
          value = _props3.value;
      var active = this.state.active;

      var classes = (0, _classnames4.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', active), className);

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this4.componentRef = _ref2;
          }, className: classes },
        _react2.default.createElement('input', { ref: function ref(_ref) {
            return _this4.inputRef = _ref;
          }, id: id, name: name,
          className: INPUT + ' ' + CLASS_ROOT + '__input',
          value: this._renderLabel(value),
          defaultValue: this._renderLabel(defaultValue),
          placeholder: placeHolder, autoComplete: 'off',
          onChange: this._onInputChange, onFocus: this._onFocus,
          onKeyDown: this._onInputKeyDown }),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', icon: _react2.default.createElement(_Search2.default, null),
          onClick: this._onAddDrop })
      );
    }
  }]);
  return SearchInput;
}(_react.Component);

SearchInput.displayName = 'SearchInput';
exports.default = SearchInput;


SearchInput.contextTypes = {
  intl: _react.PropTypes.object
};

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