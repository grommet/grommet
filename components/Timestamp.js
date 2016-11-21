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

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var FORMATS = {
  year: 'numeric',
  month: 'short',
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

      var date = (0, _keys2.default)(dateOptions).length > 0 ? dateObj.toLocaleDateString(locale, dateOptions) : undefined;
      var time = (0, _keys2.default)(timeOptions).length > 0 ? dateObj.toLocaleTimeString(locale, timeOptions) : undefined;

      this.setState({ date: date, time: time });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          align = _props.align,
          className = _props.className,
          props = (0, _objectWithoutProperties3.default)(_props, ['align', 'className']);
      var _state = this.state,
          date = _state.date,
          time = _state.time;

      delete props.fields;
      delete props.value;
      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, CLASS_ROOT + '--' + align, align), className);

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
        (0, _extends3.default)({}, props, { className: classes }),
        dateElement,
        timeElement
      );
    }
  }]);
  return Timestamp;
}(_react.Component);

Timestamp.displayName = 'Timestamp';
exports.default = Timestamp;


var FIELD_TYPES = _react.PropTypes.oneOf(['date', 'time', 'year', 'month', 'day', 'hour', 'minute', 'second', 'hours', 'minutes', 'seconds' // deprecated
]);

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