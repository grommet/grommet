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

var _reactDom = require('react-dom');

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Search = require('./icons/base/Search');

var _Search2 = _interopRequireDefault(_Search);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SEARCH;
var INPUT = _CSSClassnames2.default.INPUT;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search(props, context) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props, context));

    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onFocusInput = _this._onFocusInput.bind(_this);
    _this._onChangeInput = _this._onChangeInput.bind(_this);
    _this._onClickBody = _this._onClickBody.bind(_this);
    _this._onNextSuggestion = _this._onNextSuggestion.bind(_this);
    _this._onPreviousSuggestion = _this._onPreviousSuggestion.bind(_this);
    _this._announceSuggestion = _this._announceSuggestion.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onClickSuggestion = _this._onClickSuggestion.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
    _this._onInputKeyDown = _this._onInputKeyDown.bind(_this);
    _this._onSink = _this._onSink.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._stopPropagation = _this._stopPropagation.bind(_this);

    _this.state = {
      announceChange: false,
      activeSuggestionIndex: -1,
      align: 'left',
      dropActive: false,
      inline: props.inline,
      small: false
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialFocus = _props.initialFocus,
          inline = _props.inline,
          responsive = _props.responsive;

      if (inline && responsive) {
        this._responsive = _Responsive2.default.start(this._onResponsive);
      }
      if (initialFocus) {
        (0, _reactDom.findDOMNode)(this._inputRef).focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _state = this.state,
          dropActive = _state.dropActive,
          inline = _state.inline,
          small = _state.small;

      if (nextProps.suggestions && nextProps.suggestions.length > 0 && !dropActive && this._inputRef === document.activeElement) {
        this.setState({ dropActive: true });
      } else if ((!nextProps.suggestions || nextProps.suggestions.length === 0) && inline) {
        this.setState({ dropActive: false });
      }
      if (!small && nextProps.inline !== this.props.inline) {
        this.setState({ inline: nextProps.inline });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props2 = this.props,
          dropAlign = _props2.dropAlign,
          suggestions = _props2.suggestions;
      var _state2 = this.state,
          announceChange = _state2.announceChange,
          dropActive = _state2.dropActive,
          inline = _state2.inline;
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

      if (!dropActive && prevState.dropActive) {
        document.removeEventListener('click', this._onClickBody);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (dropActive && !prevState.dropActive) {
        document.addEventListener('click', this._onClickBody);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        var baseElement = void 0;
        if (this._controlRef) {
          baseElement = (0, _reactDom.findDOMNode)(this._controlRef);
        } else {
          baseElement = this._inputRef;
        }
        var align = dropAlign || {
          top: inline ? 'bottom' : 'top',
          left: 'left'
        };
        this._drop = new _Drop2.default(baseElement, this._renderDropContent(), {
          align: align,
          focusControl: !inline,
          responsive: false // so suggestion changes don't re-align
        });

        if (this._inputRef) {
          this._inputRef.focus();
        }
      } else if (this._drop) {
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
      document.removeEventListener('click', this._onClickBody);
      _KeyboardAccelerators2.default.stopListeningToKeyboard(this);
      if (this._responsive) {
        this._responsive.stop();
      }
      if (this._drop) {
        this._drop.remove();
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      var input = this._inputRef;
      if (input) {
        (0, _reactDom.findDOMNode)(input).focus();
      }
    }
  }, {
    key: '_stopPropagation',
    value: function _stopPropagation() {
      if (document.activeElement === this._inputRef) {
        return true;
      }
    }
  }, {
    key: '_onInputKeyDown',
    value: function _onInputKeyDown(event) {
      var _props3 = this.props,
          inline = _props3.inline,
          onSelect = _props3.onSelect,
          suggestions = _props3.suggestions,
          onKeyDown = _props3.onKeyDown;

      var enter = 13;
      var dropActive = this.state.dropActive;

      if (suggestions) {
        var up = 38;
        var down = 40;
        if (event.keyCode === up || event.keyCode === down) {
          // stop the input to move the cursor when suggestions are present
          event.preventDefault();

          if (event.keyCode === down && !dropActive && inline) {
            this._onAddDrop();
          }
        }
      }
      if (!dropActive && onSelect && event.keyCode === enter) {
        onSelect({
          target: this._inputRef || this._controlRef
        }, false);
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: '_onClickBody',
    value: function _onClickBody(event) {
      // don't close drop when clicking on input
      if (event.target !== this._inputRef) {
        this._onRemoveDrop();
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop() {
      this.setState({ dropActive: true, activeSuggestionIndex: -1 });
    }
  }, {
    key: '_onRemoveDrop',
    value: function _onRemoveDrop() {
      this.setState({ dropActive: false });
    }
  }, {
    key: '_onFocusInput',
    value: function _onFocusInput(event) {
      var _props4 = this.props,
          onFocus = _props4.onFocus,
          suggestions = _props4.suggestions;

      if (onFocus) {
        onFocus(event);
      }
      if (suggestions && suggestions.length > 0) {
        this._onAddDrop();
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
      var target = this._inputRef;
      target.dispatchEvent(event);
      onDOMChange(event);
    }
  }, {
    key: '_onChangeInput',
    value: function _onChangeInput(event) {
      var onDOMChange = this.props.onDOMChange;

      this.setState({ activeSuggestionIndex: -1, announceChange: true });
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
    key: '_onNextSuggestion',
    value: function _onNextSuggestion() {
      var suggestions = this.props.suggestions;

      if (suggestions) {
        var index = this.state.activeSuggestionIndex;
        index = Math.min(index + 1, suggestions.length - 1);
        this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
      }
    }
  }, {
    key: '_onPreviousSuggestion',
    value: function _onPreviousSuggestion() {
      var suggestions = this.props.suggestions;

      if (suggestions) {
        var index = this.state.activeSuggestionIndex;
        index = Math.max(index - 1, 0);
        this.setState({ activeSuggestionIndex: index }, this._announceSuggestion.bind(this, index));
      }
    }
  }, {
    key: '_onEnter',
    value: function _onEnter(event) {
      var _this2 = this;

      var _props5 = this.props,
          inline = _props5.inline,
          onSelect = _props5.onSelect,
          suggestions = _props5.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;
      var intl = this.context.intl;
      // for not inline search the enter should NOT submit the form
      // in this case double enter is required

      if (!inline) {
        event.preventDefault(); // prevent submitting forms
      }

      if (activeSuggestionIndex >= 0) {
        var suggestion = suggestions[activeSuggestionIndex];
        this.setState({ value: suggestion }, function () {
          var suggestionMessage = _this2._renderLabel(suggestion);
          var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
          (0, _Announcer.announce)(suggestionMessage + ' ' + selectedMessage);
        });
        if (onSelect) {
          onSelect({
            target: this._inputRef || this._controlRef,
            suggestion: suggestion
          }, true);
        }
      } else if (onSelect) {
        onSelect({
          target: this._inputRef || this._controlRef
        }, false);
      }

      this._onRemoveDrop();
    }
  }, {
    key: '_onClickSuggestion',
    value: function _onClickSuggestion(suggestion) {
      var onSelect = this.props.onSelect;

      this._onRemoveDrop();
      if (onSelect) {
        onSelect({
          target: this._inputRef || this._controlRef,
          suggestion: suggestion
        }, true);
      }
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      var onMouseUp = this.props.onMouseUp;
      // This fixes a Safari bug which prevents the input
      // text from being selected on focus.

      event.preventDefault();
      if (onMouseUp) {
        onMouseUp(event);
      }
    }
  }, {
    key: '_onSink',
    value: function _onSink(event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      var inline = this.props.inline;

      if (small) {
        this.setState({ inline: false, small: small });
      } else {
        this.setState({ inline: inline, small: small });
      }
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(suggestion) {
      if ((typeof suggestion === 'undefined' ? 'undefined' : _typeof(suggestion)) === 'object') {
        return suggestion.label || suggestion.value;
      } else {
        return suggestion;
      }
    }
  }, {
    key: '_renderDropContent',
    value: function _renderDropContent() {
      var _classnames,
          _this3 = this;

      var _props6 = this.props,
          defaultValue = _props6.defaultValue,
          dropAlign = _props6.dropAlign,
          dropColorIndex = _props6.dropColorIndex,
          suggestions = _props6.suggestions,
          value = _props6.value;
      var _state3 = this.state,
          inline = _state3.inline,
          activeSuggestionIndex = _state3.activeSuggestionIndex;

      var restProps = _Props2.default.omit(this.props, Object.keys(Search.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT + '__drop', (_classnames = {}, _defineProperty(_classnames, BACKGROUND_COLOR_INDEX + '-' + dropColorIndex, dropColorIndex), _defineProperty(_classnames, CLASS_ROOT + '__drop--controlled', !inline), _classnames));

      var input = void 0;
      if (!inline) {
        input = _react2.default.createElement('input', _extends({}, restProps, { key: 'input', ref: function ref(_ref) {
            return _this3._inputRef = _ref;
          },
          type: 'search', autoComplete: 'off', value: value,
          defaultValue: defaultValue, onChange: this._onChangeInput,
          className: INPUT + ' ' + CLASS_ROOT + '__input',
          onKeyDown: this._onInputKeyDown }));
      }

      var suggestionsNode = void 0;
      if (suggestions) {
        suggestionsNode = suggestions.map(function (suggestion, index) {
          var classes = (0, _classnames5.default)(CLASS_ROOT + '__suggestion', _defineProperty({}, CLASS_ROOT + '__suggestion--active', index === activeSuggestionIndex));

          return _react2.default.createElement(
            'div',
            { key: index, className: classes, tabIndex: '-1', role: 'button',
              onClick: _this3._onClickSuggestion.bind(_this3, suggestion),
              onFocus: function onFocus() {
                return _this3.setState({ activeSuggestionIndex: index });
              } },
            _this3._renderLabel(suggestion)
          );
        }, this);
        suggestionsNode = _react2.default.createElement(
          'div',
          { key: 'suggestions', className: CLASS_ROOT + '__suggestions' },
          suggestionsNode
        );
      }

      var contents = [input, suggestionsNode];

      if (!inline) {
        contents = [_react2.default.createElement(
          'div',
          { key: 'contents', className: CLASS_ROOT + '__drop-contents',
            onClick: this._onSink },
          contents
        )];
        if (!dropAlign || !dropAlign.top && !dropAlign.bottom) {
          var control = _react2.default.createElement(_Button2.default, { key: 'icon', icon: _react2.default.createElement(_Search2.default, null),
            className: CLASS_ROOT + '__drop-control',
            onClick: this._onRemoveDrop });
          if (!dropAlign || dropAlign.left === 'left') {
            contents.unshift(control);
          } else if (dropAlign.right === 'right') {
            contents.push(control);
          }
        }
      }

      return _react2.default.createElement(
        'div',
        { className: classes },
        contents
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames3,
          _this4 = this;

      var _props7 = this.props,
          className = _props7.className,
          defaultValue = _props7.defaultValue,
          iconAlign = _props7.iconAlign,
          id = _props7.id,
          fill = _props7.fill,
          pad = _props7.pad,
          placeHolder = _props7.placeHolder,
          size = _props7.size,
          value = _props7.value;
      var inline = this.state.inline;

      var restProps = _Props2.default.omit(this.props, Object.keys(Search.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT, (_classnames3 = {}, _defineProperty(_classnames3, CLASS_ROOT + '--controlled', !inline), _defineProperty(_classnames3, CLASS_ROOT + '--fill', fill), _defineProperty(_classnames3, CLASS_ROOT + '--icon-align-' + iconAlign, iconAlign), _defineProperty(_classnames3, CLASS_ROOT + '--pad-' + pad, pad), _defineProperty(_classnames3, CLASS_ROOT + '--inline', inline), _defineProperty(_classnames3, CLASS_ROOT + '--' + size, size), _classnames3), className);

      if (inline) {
        return _react2.default.createElement(
          'div',
          { className: classes },
          _react2.default.createElement('input', _extends({}, restProps, { ref: function ref(_ref2) {
              return _this4._inputRef = _ref2;
            },
            type: 'search', id: id, placeholder: placeHolder,
            autoComplete: 'off',
            defaultValue: this._renderLabel(defaultValue),
            value: this._renderLabel(value),
            className: INPUT + ' ' + CLASS_ROOT + '__input',
            onFocus: this._onFocusInput,
            onChange: this._onChangeInput,
            onMouseUp: this._onMouseUp,
            onKeyDown: this._onInputKeyDown })),
          _react2.default.createElement(_Search2.default, null)
        );
      } else {
        return _react2.default.createElement(_Button2.default, { ref: function ref(_ref3) {
            return _this4._controlRef = _ref3;
          },
          id: id, className: className, icon: _react2.default.createElement(_Search2.default, null),
          onClick: this._onAddDrop });
      }
    }
  }]);

  return Search;
}(_react.Component);

Search.displayName = 'Search';
exports.default = Search;


Search.contextTypes = {
  intl: _propTypes2.default.object
};

Search.defaultProps = {
  align: 'left',
  iconAlign: 'end',
  inline: false,
  responsive: true
};

Search.propTypes = {
  align: _propTypes2.default.string,
  defaultValue: _propTypes2.default.string,
  dropAlign: _Drop.dropAlignPropType,
  dropColorIndex: _propTypes2.default.string,
  fill: _propTypes2.default.bool,
  iconAlign: _propTypes2.default.oneOf(['start', 'end']),
  id: _propTypes2.default.string,
  initialFocus: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  onDOMChange: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  pad: _propTypes2.default.oneOf(['small', 'medium']),
  placeHolder: _propTypes2.default.string,
  responsive: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.shape({
    label: _propTypes2.default.node,
    value: _propTypes2.default.any
  }), _propTypes2.default.string])),
  value: _propTypes2.default.string
};
module.exports = exports['default'];