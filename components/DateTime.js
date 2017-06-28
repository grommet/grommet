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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _KeyboardAccelerators = require('../utils/KeyboardAccelerators');

var _KeyboardAccelerators2 = _interopRequireDefault(_KeyboardAccelerators);

var _Drop = require('../utils/Drop');

var _Drop2 = _interopRequireDefault(_Drop);

var _DOM = require('../utils/DOM');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Clock = require('./icons/base/Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _Calendar = require('./icons/base/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DateTimeDrop = require('./DateTimeDrop');

var _DateTimeDrop2 = _interopRequireDefault(_DateTimeDrop);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DATE_TIME;
var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;
var DATE_TIME_DROP = _CSSClassnames2.default.DATE_TIME_DROP;

var FORMATS = {
  M: 'months',
  D: 'days',
  Y: 'years',
  H: 'hours',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
};
var TIME_REGEXP = new RegExp('[Hhmsa]');

var DateTime = function (_Component) {
  _inherits(DateTime, _Component);

  function DateTime(props, context) {
    _classCallCheck(this, DateTime);

    var _this = _possibleConstructorReturn(this, (DateTime.__proto__ || Object.getPrototypeOf(DateTime)).call(this, props, context));

    _this._onInputChange = _this._onInputChange.bind(_this);
    _this._onOpen = _this._onOpen.bind(_this);
    _this._onForceClose = _this._onForceClose.bind(_this);
    _this._onControlClick = _this._onControlClick.bind(_this);
    _this._onClose = _this._onClose.bind(_this);
    _this._onNext = _this._onNext.bind(_this);
    _this._onPrevious = _this._onPrevious.bind(_this);
    _this._cursorScope = _this._cursorScope.bind(_this);
    _this._notify = _this._notify.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.cursor = -1;
    _this.state.dropActive = false;
    return _this;
  }

  _createClass(DateTime, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._activation(this.state.dropActive);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(this._stateFromProps(newProps));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _state = this.state,
          cursor = _state.cursor,
          dropActive = _state.dropActive;
      // Set up keyboard listeners appropriate to the current state.

      if (prevState.dropActive !== dropActive) {
        this._activation(dropActive);
      }

      if (dropActive) {
        this._drop.render(this._renderDrop());
      }

      if (cursor >= 0) {
        this._inputRef.setSelectionRange(cursor, cursor);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._activation(false);
    }
  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var value = props.value,
          format = props.format;

      var result = { current: undefined };
      var date = (0, _moment2.default)(value, format);
      if (date.isValid()) {
        result.current = date;
        result.textValue = undefined;
      } else {
        result.current = (0, _moment2.default)().startOf('hour').add(1, 'hour');
      }
      // figure out which scope the step should apply to
      if (format.indexOf('s') !== -1) {
        result.stepScope = 'second';
      } else if (format.indexOf('m') !== -1) {
        result.stepScope = 'minute';
      } else if (format.indexOf('h') !== -1) {
        result.stepScope = 'hour';
      }
      return result;
    }
  }, {
    key: '_onInputChange',
    value: function _onInputChange(event) {
      var onChange = this.props.onChange;

      var currentValue = event.target.value;
      // Always set textValue to what the user types.
      // If the user subsequently passes in a value property, we will
      // clear this textValue and use the new value.
      this.setState({ textValue: currentValue });
      if (onChange) {
        onChange(currentValue);
      }
    }
  }, {
    key: '_notify',
    value: function _notify(date, checkClose) {
      var _props = this.props,
          format = _props.format,
          onChange = _props.onChange;

      if (onChange) {
        onChange(date);
        if (checkClose && !TIME_REGEXP.test(format)) {
          // check to close the drop only if the user selected a day
          // and the format of the date does not include time
          this.setState({ dropActive: false, cursor: -1 });
        }
      }
    }
  }, {
    key: '_onControlClick',
    value: function _onControlClick(event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.dropActive) {
        this.setState({ dropActive: false, cursor: -1 });
      } else {
        this.setState({ dropActive: true });
      }
    }
  }, {
    key: '_onForceClose',
    value: function _onForceClose() {
      this.setState({ dropActive: false, cursor: -1 });
    }
  }, {
    key: '_onOpen',
    value: function _onOpen(event) {
      event.preventDefault();
      this.setState({ dropActive: true });
    }
  }, {
    key: '_onClose',
    value: function _onClose(event) {
      var dropElement = document.querySelector('.' + DATE_TIME_DROP);
      if (!(0, _DOM.isDescendant)(this._containerRef, event.target) && (!dropElement || !(0, _DOM.isDescendant)(dropElement, event.target))) {
        this.setState({ dropActive: false, cursor: -1 });
      }
    }
  }, {
    key: '_onNext',
    value: function _onNext(event) {
      if (this._inputRef === document.activeElement) {
        var step = this.props.step;
        var current = this.state.current;

        event.preventDefault();
        var date = current.clone();
        var scope = this._cursorScope();
        if ('a' === scope) {
          if (date.hours() < 12) {
            date.add(12, 'hours');
          }
        } else if ('m' === scope) {
          date.add(step, FORMATS[scope]);
        } else {
          date.add(1, FORMATS[scope]);
        }
        this.setState({ current: date }, this._notify(date));
      }
    }
  }, {
    key: '_onPrevious',
    value: function _onPrevious(event) {
      if (this._inputRef === document.activeElement) {
        var step = this.props.step;
        var current = this.state.current;

        event.preventDefault();
        var date = current.clone();
        var scope = this._cursorScope();
        if ('a' === scope) {
          if (date.hours() >= 12) {
            date.subtract(12, 'hours');
          }
        } else if ('m' === scope) {
          date.subtract(step, FORMATS[scope]);
        } else {
          date.subtract(1, FORMATS[scope]);
        }
        this.setState({ current: date }, this._notify(date));
      }
    }
  }, {
    key: '_cursorScope',
    value: function _cursorScope() {
      var format = this.props.format;

      var input = this._inputRef;
      var value = input.value;
      var end = input.selectionEnd;
      this.setState({ cursor: end });
      // Figure out which aspect of the date the cursor is on, so we know what
      // to change.
      var preDate = (0, _moment2.default)(value.slice(0, end + 1), format);
      var formatTokens = format.split(/[^A-Za-z]/);
      var unusedTokens = preDate.parsingFlags().unusedTokens;
      var index = -1;
      while (formatTokens[index + 1] !== unusedTokens[0]) {
        index += 1;
      }
      return formatTokens[index][0];
    }
  }, {
    key: '_activation',
    value: function _activation(dropActive) {
      var onDropChange = this.context.onDropChange;


      var listeners = {
        esc: this._onForceClose,
        up: this._onPrevious,
        down: this._onNext
      };

      if (dropActive) {

        document.addEventListener('click', this._onClose);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, listeners);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this._containerRef, '.' + FORM_FIELD) || this._containerRef;
        this._drop = new _Drop2.default(control, this._renderDrop(), {
          align: { top: 'bottom', left: 'left' },
          focusControl: true,
          context: this.context
        });
      } else {

        document.removeEventListener('click', this._onClose);
        _KeyboardAccelerators2.default.stopListeningToKeyboard(this, listeners);

        if (this._drop) {
          this._drop.remove();
          this._drop = undefined;
        }
      }

      if (onDropChange) {
        onDropChange(dropActive);
      }
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var _props2 = this.props,
          format = _props2.format,
          step = _props2.step;
      var current = this.state.current;

      return _react2.default.createElement(_DateTimeDrop2.default, { format: format, value: current,
        step: step, onChange: this._notify });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          className = _props3.className,
          format = _props3.format,
          value = _props3.value,
          props = _objectWithoutProperties(_props3, ['className', 'format', 'value']);

      delete props.onChange;
      delete props.step;
      var _state2 = this.state,
          dropActive = _state2.dropActive,
          textValue = _state2.textValue;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--active', dropActive), className);

      var inputValue = textValue || value;
      if (value instanceof Date) {
        inputValue = (0, _moment2.default)(value).format(format);
      } else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        inputValue = value.format(format);
      }
      var Icon = TIME_REGEXP.test(format) ? _Clock2.default : _Calendar2.default;

      var dateTimeIconMessage = _Intl2.default.getMessage(intl, 'Date Time Icon');

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this2._containerRef = _ref2;
          }, className: classes },
        _react2.default.createElement('input', _extends({ ref: function ref(_ref) {
            return _this2._inputRef = _ref;
          } }, props, {
          className: INPUT + ' ' + CLASS_ROOT + '__input', placeholder: format,
          value: inputValue || '', onChange: this._onInputChange })),
        _react2.default.createElement(_Button2.default, { className: CLASS_ROOT + '__control', icon: _react2.default.createElement(Icon, null),
          a11yTitle: dateTimeIconMessage,
          onClick: this._onControlClick })
      );
    }
  }]);

  return DateTime;
}(_react.Component);

DateTime.displayName = 'DateTime';
exports.default = DateTime;


DateTime.contextTypes = {
  intl: _propTypes2.default.object,
  onDropChange: _propTypes2.default.func
};

DateTime.defaultProps = {
  format: 'M/D/YYYY h:mm a',
  step: 1
};

DateTime.propTypes = {
  format: _propTypes2.default.string,
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  step: _propTypes2.default.number,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
module.exports = exports['default'];