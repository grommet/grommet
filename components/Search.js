'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SEARCH;
var INPUT = _CSSClassnames2.default.INPUT;
var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Search = function (_Component) {
  (0, _inherits3.default)(Search, _Component);

  function Search(props, context) {
    (0, _classCallCheck3.default)(this, Search);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Search.__proto__ || (0, _getPrototypeOf2.default)(Search)).call(this, props, context));

    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onFocusInput = _this._onFocusInput.bind(_this);
    _this._onChangeInput = _this._onChangeInput.bind(_this);
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

  (0, _createClass3.default)(Search, [{
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
        document.removeEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, activeKeyboardHandlers);
        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (dropActive && !prevState.dropActive) {
        // Slow down adding the click handler,
        // otherwise the drop will close when the mouse is released.
        // Not observable in Safari, 1ms is sufficient for Chrome,
        // Firefox needs 100ms though. :(
        // TODO: re-evaluate how to solve this without a timeout.
        document.addEventListener('click', this._onRemoveDrop);
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
        this._drop = _Drop2.default.add(baseElement, this._renderDrop(), { align: align, focusControl: true });

        this._inputRef.focus();
      } else if (this._drop) {
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
          suggestions = _props3.suggestions,
          onKeyDown = _props3.onKeyDown;
      var dropActive = this.state.dropActive;

      if (suggestions) {
        var up = 38;
        var down = 40;
        if (event.keyCode === up || event.keyCode === down) {
          // stop the input to move the cursor when suggestions are present
          event.preventDefault();

          if (event.keyCode === down && !dropActive && inline) {
            this._onAddDrop(event);
          }
        }
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }, {
    key: '_onAddDrop',
    value: function _onAddDrop(event) {
      event.preventDefault();
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
      var onFocus = this.props.onFocus;

      this.setState({
        activeSuggestionIndex: -1
      });
      if (onFocus) {
        onFocus(event);
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

      var _props4 = this.props,
          inline = _props4.inline,
          onSelect = _props4.onSelect,
          suggestions = _props4.suggestions;
      var activeSuggestionIndex = this.state.activeSuggestionIndex;
      var intl = this.context.intl;
      // for not inline search the enter should NOT submit the form
      // in this case double enter is required

      if (!inline) {
        event.preventDefault(); // prevent submitting forms
      }

      this._onRemoveDrop();
      if (activeSuggestionIndex >= 0) {
        (function () {
          var suggestion = suggestions[activeSuggestionIndex];
          _this2.setState({ value: suggestion }, function () {
            var suggestionMessage = _this2._renderLabel(suggestion);
            var selectedMessage = _Intl2.default.getMessage(intl, 'Selected');
            (0, _Announcer.announce)(suggestionMessage + ' ' + selectedMessage);
          });
          if (onSelect) {
            onSelect({
              target: _this2._inputRef || _this2._controlRef,
              suggestion: suggestion
            }, true);
          }
        })();
      }
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
      if ((typeof suggestion === 'undefined' ? 'undefined' : (0, _typeof3.default)(suggestion)) === 'object') {
        return suggestion.label || suggestion.value;
      } else {
        return suggestion;
      }
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var _classnames,
          _this3 = this;

      var _props5 = this.props,
          defaultValue = _props5.defaultValue,
          dropAlign = _props5.dropAlign,
          dropColorIndex = _props5.dropColorIndex,
          suggestions = _props5.suggestions,
          value = _props5.value;
      var _state3 = this.state,
          inline = _state3.inline,
          activeSuggestionIndex = _state3.activeSuggestionIndex;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Search.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT + '__drop', (_classnames = {}, (0, _defineProperty3.default)(_classnames, BACKGROUND_COLOR_INDEX + '-' + dropColorIndex, dropColorIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--controlled', !inline), _classnames));

      var input = void 0;
      if (!inline) {
        input = _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { key: 'input', ref: function ref(_ref) {
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
          var classes = (0, _classnames5.default)(CLASS_ROOT + '__suggestion', (0, _defineProperty3.default)({}, CLASS_ROOT + '__suggestion--active', index === activeSuggestionIndex));

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
        contents = [_react2.default.createElement(_Button2.default, { key: 'icon', icon: _react2.default.createElement(_Search2.default, null),
          className: CLASS_ROOT + '__drop-control',
          onClick: this._onRemoveDrop }), _react2.default.createElement(
          'div',
          { key: 'contents', className: CLASS_ROOT + '__drop-contents',
            onClick: this._onSink },
          contents
        )];
        if (dropAlign && !dropAlign.left) {
          contents.reverse();
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

      var _props6 = this.props,
          className = _props6.className,
          defaultValue = _props6.defaultValue,
          iconAlign = _props6.iconAlign,
          id = _props6.id,
          fill = _props6.fill,
          pad = _props6.pad,
          placeHolder = _props6.placeHolder,
          size = _props6.size,
          value = _props6.value;
      var inline = this.state.inline;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Search.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT, (_classnames3 = {}, (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--controlled', !inline), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--fill', fill), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--icon-align-' + iconAlign, iconAlign), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--pad-' + pad, pad), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--inline', inline), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--' + size, size), _classnames3), className);

      if (inline) {
        return _react2.default.createElement(
          'div',
          { className: classes },
          _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { ref: function ref(_ref2) {
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
  intl: _react.PropTypes.object
};

Search.defaultProps = {
  align: 'left',
  iconAlign: 'end',
  inline: false,
  responsive: true
};

Search.propTypes = {
  align: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  fill: _react.PropTypes.bool,
  iconAlign: _react.PropTypes.oneOf(['start', 'end']),
  id: _react.PropTypes.string,
  initialFocus: _react.PropTypes.bool,
  inline: _react.PropTypes.bool,
  onDOMChange: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  pad: _react.PropTypes.oneOf(['small', 'medium']),
  placeHolder: _react.PropTypes.string,
  responsive: _react.PropTypes.bool,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  suggestions: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.any
  }), _react.PropTypes.string])),
  value: _react.PropTypes.string
};
module.exports = exports['default'];