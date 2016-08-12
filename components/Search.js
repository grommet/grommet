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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.SEARCH; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var BACKGROUND_COLOR_INDEX = _CSSClassnames2.default.BACKGROUND_COLOR_INDEX;

var Search = function (_Component) {
  (0, _inherits3.default)(Search, _Component);

  function Search(props, context) {
    (0, _classCallCheck3.default)(this, Search);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Search).call(this, props, context));

    _this._onAddDrop = _this._onAddDrop.bind(_this);
    _this._onRemoveDrop = _this._onRemoveDrop.bind(_this);
    _this._onFocusControl = _this._onFocusControl.bind(_this);
    _this._onBlurControl = _this._onBlurControl.bind(_this);
    _this._onFocusInput = _this._onFocusInput.bind(_this);
    _this._onBlurInput = _this._onBlurInput.bind(_this);
    _this._onChangeInput = _this._onChangeInput.bind(_this);
    _this._onNextSuggestion = _this._onNextSuggestion.bind(_this);
    _this._onPreviousSuggestion = _this._onPreviousSuggestion.bind(_this);
    _this._onEnter = _this._onEnter.bind(_this);
    _this._onClickSuggestion = _this._onClickSuggestion.bind(_this);
    _this._onSink = _this._onSink.bind(_this);
    _this._onResponsive = _this._onResponsive.bind(_this);

    _this.state = {
      align: 'left',
      controlFocused: false,
      inline: props.inline,
      dropActive: false,
      activeSuggestionIndex: -1
    };
    return _this;
  }

  (0, _createClass3.default)(Search, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.inline && this.props.responsive) {
        this._responsive = _Responsive2.default.start(this._onResponsive);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.suggestions && nextProps.suggestions.length > 0 && !this.state.dropActive && this.refs.input === document.activeElement) {
        this.setState({ dropActive: true });
      } else if ((!nextProps.suggestions || nextProps.suggestions.length === 0) && this.state.inline) {
        this.setState({ dropActive: false });
      }
    }
  }, {
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
        space: this._onAddDrop
      };

      // the order here is important, need to turn off keys before turning on

      if (!this.state.controlFocused && prevState.controlFocused) {
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

      if (this.state.controlFocused && !prevState.controlFocused) {
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, focusedKeyboardHandlers);
      }

      if (this.state.dropActive && !prevState.dropActive) {
        // Slow down adding the click handler,
        // otherwise the drop will close when the mouse is released.
        // Not observable in Safari, 1ms is sufficient for Chrome,
        // Firefox needs 100ms though. :(
        // TODO: re-evaluate how to solve this without a timeout.
        document.addEventListener('click', this._onRemoveDrop);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, activeKeyboardHandlers);

        var baseElement = void 0;
        if (this.refs.control) {
          baseElement = this.refs.control.firstChild;
        } else {
          baseElement = this.refs.input;
        }
        var dropAlign = this.props.dropAlign || {
          top: this.state.inline ? 'bottom' : 'top',
          left: 'left'
        };
        this._drop = _Drop2.default.add(baseElement, this._renderDrop(), { align: dropAlign });

        if (!this.state.inline) {
          document.getElementById('search-drop-input').focus();
        }
      } else if (this._drop) {
        this._drop.render(this._renderDrop());
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
    key: '_onFocusControl',
    value: function _onFocusControl() {
      this.setState({
        controlFocused: true,
        dropActive: true,
        activeSuggestionIndex: -1
      });
    }
  }, {
    key: '_onBlurControl',
    value: function _onBlurControl() {
      this.setState({ controlFocused: false });
    }
  }, {
    key: '_onFocusInput',
    value: function _onFocusInput() {
      this.refs.input.select();
      this.setState({
        activeSuggestionIndex: -1
      });
    }
  }, {
    key: '_onBlurInput',
    value: function _onBlurInput() {
      //this.setState({drop: false});
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
      var controlInput = document.getElementById('search-drop-input');
      var target = this.refs.input || controlInput;
      target.dispatchEvent(event);
      this.props.onDOMChange(event);
    }
  }, {
    key: '_onChangeInput',
    value: function _onChangeInput(event) {
      this.setState({ activeSuggestionIndex: -1 });
      if (this.props.onDOMChange) {
        this._fireDOMChange();
      }
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

      // for not inline search the enter should NOT submit the form
      // in this case double enter is required
      if (!this.props.inline) {
        event.preventDefault(); // prevent submitting forms
      }

      this._onRemoveDrop();
      var suggestion = void 0;
      if (this.state.activeSuggestionIndex >= 0) {
        suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
        this.setState({ value: suggestion });
        if (this.props.onSelect) {
          this.props.onSelect({
            target: this.refs.input || this.refs.control,
            suggestion: suggestion
          }, true);
        }
      }
    }
  }, {
    key: '_onClickSuggestion',
    value: function _onClickSuggestion(suggestion) {
      this._onRemoveDrop();

      if (this.props.onSelect) {
        this.props.onSelect({
          target: this.refs.input || this.refs.control,
          suggestion: suggestion
        }, true);
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
      if (small) {
        this.setState({ inline: false });
      } else {
        this.setState({ inline: this.props.inline });
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      var ref = this.refs.input || this.refs.control;
      if (ref) {
        ref.focus();
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
      var _classnames;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Search.propTypes));
      var classes = (0, _classnames5.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, BACKGROUND_COLOR_INDEX + '-' + this.props.dropColorIndex, this.props.dropColorIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop', true), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--controlled', !this.state.inline), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__drop--large', this.props.large), _classnames));

      var input = void 0;
      if (!this.state.inline) {
        input = _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { key: 'input', id: 'search-drop-input', type: 'search',
          autoComplete: 'off',
          defaultValue: this.props.defaultValue,
          value: this.props.value,
          className: CLASS_ROOT + '__input',
          onChange: this._onChangeInput }));
      }

      var suggestions = void 0;
      if (this.props.suggestions) {
        suggestions = this.props.suggestions.map(function (suggestion, index) {
          var _classnames2;

          var classes = (0, _classnames5.default)((_classnames2 = {}, (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__suggestion', true), (0, _defineProperty3.default)(_classnames2, CLASS_ROOT + '__suggestion--active', index === this.state.activeSuggestionIndex), _classnames2));

          return _react2.default.createElement(
            'div',
            { key: index,
              className: classes,
              onClick: this._onClickSuggestion.bind(this, suggestion) },
            this._renderLabel(suggestion)
          );
        }, this);
        suggestions = _react2.default.createElement(
          'div',
          { key: 'suggestions', className: CLASS_ROOT + '__suggestions' },
          suggestions
        );
      }

      var contents = [input, suggestions];

      if (!this.state.inline) {
        contents = [_react2.default.createElement(_Button2.default, { key: 'icon', icon: _react2.default.createElement(_Search2.default, null),
          className: CLASS_ROOT + '__drop-control',
          onClick: this._onRemoveDrop }), _react2.default.createElement(
          'div',
          { key: 'contents', className: CLASS_ROOT + '__drop-contents',
            onClick: this._onSink },
          contents
        )];
        if (this.props.dropAlign && !this.props.dropAlign.left) {
          contents.reverse();
        }
      }

      return _react2.default.createElement(
        'div',
        { id: 'search-drop', className: classes },
        contents
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames3;

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Search.propTypes));
      var classes = (0, _classnames5.default)(CLASS_ROOT, (_classnames3 = {}, (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--controlled', !this.state.inline), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--fill', this.props.fill), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--icon-align-' + this.props.iconAlign, this.props.iconAlign), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--inline', this.state.inline), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--large', this.props.large && !this.props.size), (0, _defineProperty3.default)(_classnames3, CLASS_ROOT + '--' + this.props.size, this.props.size), _classnames3), this.props.className);

      if (this.state.inline) {
        return _react2.default.createElement(
          'div',
          { className: classes },
          _react2.default.createElement('input', (0, _extends3.default)({}, restProps, { ref: 'input', type: 'search',
            id: this.props.id,
            placeholder: this.props.placeHolder,
            autoComplete: 'off',
            defaultValue: this._renderLabel(this.props.defaultValue),
            value: this._renderLabel(this.props.value),
            className: CLASS_ROOT + '__input',
            onFocus: this._onFocusInput,
            onBlur: this._onBlurInput,
            onChange: this._onChangeInput })),
          _react2.default.createElement(_Search2.default, null)
        );
      } else {
        return _react2.default.createElement(
          'div',
          { ref: 'control' },
          _react2.default.createElement(_Button2.default, { id: this.props.id,
            className: classes,
            icon: _react2.default.createElement(_Search2.default, null),
            tabIndex: '0',
            onClick: this._onAddDrop,
            onFocus: this._onFocusControl,
            onBlur: this._onBlurControl })
        );
      }
    }
  }]);
  return Search;
}(_react.Component);

Search.displayName = 'Search';
exports.default = Search;


Search.propTypes = {
  align: _react.PropTypes.string,
  defaultValue: _react.PropTypes.string,
  dropAlign: _Drop2.default.alignPropType,
  dropColorIndex: _react.PropTypes.string,
  fill: _react.PropTypes.bool,
  iconAlign: _react2.default.PropTypes.oneOf(['start', 'end']),
  id: _react2.default.PropTypes.string,
  inline: _react.PropTypes.bool,
  onDOMChange: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  placeHolder: _react.PropTypes.string,
  responsive: _react.PropTypes.bool,
  size: _react2.default.PropTypes.oneOf(['small', 'medium', 'large']),
  suggestions: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({
    label: _react.PropTypes.node,
    value: _react.PropTypes.any
  }), _react.PropTypes.string])),
  value: _react.PropTypes.string
};

Search.defaultProps = {
  align: 'left',
  iconAlign: 'end',
  inline: false,
  responsive: true
};
module.exports = exports['default'];