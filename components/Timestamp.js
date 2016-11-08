'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Locale = require('../utils/Locale');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TIMESTAMP;

function _showField(field, fields) {
  var result = true;
  if (fields) {
    if (Array.isArray(fields)) {
      result = fields.indexOf(field) !== -1;
    } else {
      result = field === fields;
    }
  }
  return result;
}

var Timestamp = function (_Component) {
  (0, _inherits3.default)(Timestamp, _Component);

  function Timestamp(props, context) {
    (0, _classCallCheck3.default)(this, Timestamp);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Timestamp.__proto__ || (0, _getPrototypeOf2.default)(Timestamp)).call(this, props, context));

    _this._formatForLocale = _this._formatForLocale.bind(_this);
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Timestamp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._formatForLocale(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._formatForLocale(nextProps);
    }
  }, {
    key: '_formatForLocale',
    value: function _formatForLocale(_ref) {
      var value = _ref.value,
          fields = _ref.fields;

      var locale = (0, _Locale.getCurrentLocale)();
      var dateObj = typeof value === 'string' ? new Date(value) : value;

      // Date only.
      var date = void 0;
      if (_showField('date', fields)) {
        var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        date = dateObj.toLocaleDateString(locale, dateOptions);
      }

      // Hours, Minutes, and Seconds.
      // Time only.
      var time = void 0;
      if (_showField('time', fields)) {
        var timeOptions = !_showField('seconds', fields) ? { hour: '2-digit', minute: '2-digit' } : { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        time = dateObj.toLocaleTimeString(locale, timeOptions);
      }

      // Hours only.
      var hours = void 0;
      if (_showField('hours', fields) && !_showField('minutes', fields) && !_showField('time', fields)) {
        var _timeOptions = { hour: '2-digit' };
        hours = dateObj.toLocaleTimeString(locale, _timeOptions);
      }

      // Hours and Minutes.
      if (_showField('hours', fields) && _showField('minutes', fields)) {
        var _timeOptions2 = !_showField('seconds', fields) ? { hour: '2-digit', minute: '2-digit' } : { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        time = dateObj.toLocaleTimeString(locale, _timeOptions2);
      }

      // Minutes only.
      var minutes = void 0;
      if (_showField('minutes', fields) && !_showField('hours', fields) && !_showField('time', fields)) {
        var _timeOptions3 = { minute: '2-digit' };
        minutes = dateObj.toLocaleTimeString(locale, _timeOptions3);
      }

      // Seconds only.
      var seconds = void 0;
      if (_showField('seconds', fields) && !_showField('time', fields)) {
        if (!_showField('hours', fields) || !_showField('minutes', fields)) {
          var _timeOptions4 = { second: '2-digit' };
          // This avoids spacing issues when Seconds is used with
          // Hours or Minutes.
          seconds = Array.isArray(fields) ? ' ' + dateObj.toLocaleTimeString(locale, _timeOptions4) : dateObj.toLocaleTimeString(locale, _timeOptions4);
        }
      }

      this.setState({
        date: date,
        time: time,
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          align = _props.align,
          className = _props.className,
          props = (0, _objectWithoutProperties3.default)(_props, ['align', 'className']);

      delete props.fields;
      delete props.value;
      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--' + align, align), className);

      var date = this.state.date ? _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__date' },
        this.state.date
      ) : undefined;

      var time = this.state.time || this.state.hours || this.state.minutes || this.state.seconds ? _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__time' },
        this.state.time,
        this.state.hours,
        this.state.minutes,
        this.state.seconds
      ) : undefined;

      return _react2.default.createElement(
        'span',
        (0, _extends3.default)({}, props, { className: classes }),
        date,
        ' ',
        time
      );
    }
  }]);
  return Timestamp;
}(_react.Component);

Timestamp.displayName = 'Timestamp';
exports.default = Timestamp;


var FIELD_TYPES = _react.PropTypes.oneOf(['date', 'time', 'hours', 'minutes', 'seconds']);

Timestamp.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  fields: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(FIELD_TYPES), FIELD_TYPES]),
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, // ISO-8601 string
  _react.PropTypes.object // Date object
  ]).isRequired
};

Timestamp.defaultProps = {
  fields: ["date", "time"]
};
module.exports = exports['default'];