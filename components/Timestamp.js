'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Locale = require('../utils/Locale');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.TIMESTAMP;

var FORMATS = {
  year: 'numeric',
  month: 'short',
  'month-full': 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

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
  _inherits(Timestamp, _Component);

  function Timestamp(props, context) {
    _classCallCheck(this, Timestamp);

    var _this = _possibleConstructorReturn(this, (Timestamp.__proto__ || Object.getPrototypeOf(Timestamp)).call(this, props, context));

    _this._formatForLocale = _this._formatForLocale.bind(_this);
    _this.state = {};
    return _this;
  }

  _createClass(Timestamp, [{
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
      var dateOptions = {};
      var timeOptions = {};

      if (_showField('date', fields)) {
        dateOptions.year = FORMATS.year;
        dateOptions.month = FORMATS.month;
        dateOptions.day = FORMATS.day;
      }
      if (_showField('year', fields)) {
        dateOptions.year = FORMATS.year;
      }
      if (_showField('month', fields)) {
        dateOptions.month = FORMATS.month;
      } else if (_showField('month-full', fields)) {
        dateOptions.month = FORMATS['month-full'];
      }
      if (_showField('day', fields)) {
        dateOptions.day = FORMATS.day;
      }

      if (_showField('time', fields)) {
        timeOptions.hour = FORMATS.hour;
        timeOptions.minute = FORMATS.minute;
      }
      if (_showField('hour', fields) || _showField('hours', fields)) {
        timeOptions.hour = FORMATS.hour;
      }
      if (_showField('minute', fields) || _showField('minutes', fields)) {
        timeOptions.minute = FORMATS.minute;
      }
      if (_showField('second', fields) || _showField('seconds', fields)) {
        timeOptions.second = FORMATS.second;
      }

      var date = Object.keys(dateOptions).length > 0 ? dateObj.toLocaleDateString(locale, dateOptions) : undefined;
      var time = Object.keys(timeOptions).length > 0 ? dateObj.toLocaleTimeString(locale, timeOptions) : undefined;

      this.setState({ date: date, time: time });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          align = _props.align,
          className = _props.className,
          props = _objectWithoutProperties(_props, ['align', 'className']);

      var _state = this.state,
          date = _state.date,
          time = _state.time;

      delete props.fields;
      delete props.value;
      var classes = (0, _classnames3.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--' + align, align), className);

      var dateElement = void 0;
      if (date) {
        dateElement = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__date' },
          date
        );
      }

      var timeElement = void 0;
      if (time) {
        timeElement = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__time' },
          time
        );
      }

      return _react2.default.createElement(
        'span',
        _extends({}, props, { className: classes }),
        dateElement,
        timeElement
      );
    }
  }]);

  return Timestamp;
}(_react.Component);

Timestamp.displayName = 'Timestamp';
exports.default = Timestamp;


var FIELD_TYPES = _propTypes2.default.oneOf(['date', 'time', 'year', 'month', 'month-full', 'day', 'hour', 'minute', 'second', 'hours', 'minutes', 'seconds' // deprecated
]);

Timestamp.propTypes = {
  align: _propTypes2.default.oneOf(['start', 'center', 'end']),
  fields: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(FIELD_TYPES), FIELD_TYPES]),
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, // ISO-8601 string
  _propTypes2.default.object // Date object
  ]).isRequired
};

Timestamp.defaultProps = {
  fields: ["date", "time"]
};
module.exports = exports['default'];