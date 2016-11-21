'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.DATE_TIME;
var INPUT = _CSSClassnames2.default.INPUT;
var FORM_FIELD = _CSSClassnames2.default.FORM_FIELD;
var FORMATS = {
  M: 'months',
  D: 'days',
  Y: 'years',
  H: 'hours',
  h: 'hours',
  m: 'minutes',
  s: 'seconds'
};
var TIME_REGEXP = new RegExp('[hmsa]');

var DateTime = function (_Component) {
  (0, _inherits3.default)(DateTime, _Component);

  function DateTime(props, context) {
    (0, _classCallCheck3.default)(this, DateTime);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateTime.__proto__ || (0, _getPrototypeOf2.default)(DateTime)).call(this, props, context));

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

  (0, _createClass3.default)(DateTime, [{
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
        this.inputRef.setSelectionRange(cursor, cursor);
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
      var _props = this.props,
          format = _props.format,
          onChange = _props.onChange,
          value = _props.value;

      var currentValue = event.target.value;
      if (currentValue.length > 0) {
        var date = (0, _moment2.default)(currentValue, format);
        // Only notify if the value looks valid
        if (date.isValid() && !date.parsingFlags().charsLeftOver) {
          if (onChange) {
            onChange(currentValue);
          }
        } else if (typeof value === 'string' && currentValue.length < value.length) {
          // or if the user is removing characters
          if (onChange) {
            onChange(currentValue);
          }
        }
      } else if (onChange) {
        onChange(currentValue);
      }
    }
  }, {
    key: '_notify',
    value: function _notify(date, checkClose) {
      var _props2 = this.props,
          format = _props2.format,
          onChange = _props2.onChange;

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
      if (!(0, _DOM.isDescendant)(this.containerRef, event.target) && !(0, _DOM.isDescendant)(this._drop.container, event.target)) {
        this.setState({ dropActive: false, cursor: -1 });
      }
    }
  }, {
    key: '_onNext',
    value: function _onNext(event) {
      if (this.inputRef === document.activeElement) {
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
      if (this.inputRef === document.activeElement) {
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

      var input = this.inputRef;
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
      var listeners = {
        esc: this._onForceClose,
        up: this._onPrevious,
        down: this._onNext
      };

      if (dropActive) {

        document.addEventListener('click', this._onClose);
        _KeyboardAccelerators2.default.startListeningToKeyboard(this, listeners);

        // If this is inside a FormField, place the drop in reference to it.
        var control = (0, _DOM.findAncestor)(this.containerRef, '.' + FORM_FIELD) || this.containerRef;
        this._drop = _Drop2.default.add(control, this._renderDrop(), {
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
    }
  }, {
    key: '_renderDrop',
    value: function _renderDrop() {
      var _props3 = this.props,
          format = _props3.format,
          step = _props3.step;
      var current = this.state.current;

      return _react2.default.createElement(_DateTimeDrop2.default, { format: format, value: current,
        step: step, onChange: this._notify });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          className = _props4.className,
          format = _props4.format,
          value = _props4.value,
          props = (0, _objectWithoutProperties3.default)(_props4, ['className', 'format', 'value']);

      delete props.onChange;
      delete props.step;
      var dropActive = this.state.dropActive;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--active', dropActive), className);

      var inputValue = value;
      if (value instanceof Date) {
        inputValue = (0, _moment2.default)(value).format(format);
      } else if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        inputValue = value.format(format);
      }
      var Icon = TIME_REGEXP.test(format) ? _Clock2.default : _Calendar2.default;

      var dateTimeIconMessage = _Intl2.default.getMessage(intl, 'Date Time Icon');

      return _react2.default.createElement(
        'div',
        { ref: function ref(_ref2) {
            return _this2.containerRef = _ref2;
          }, className: classes },
        _react2.default.createElement('input', (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2.inputRef = _ref;
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
  intl: _react.PropTypes.object
};

DateTime.defaultProps = {
  format: 'M/D/YYYY h:mm a',
  step: 1
};

DateTime.propTypes = {
  format: _react.PropTypes.string,
  id: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  step: _react.PropTypes.number,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object])
};
module.exports = exports['default'];