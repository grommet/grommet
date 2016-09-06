'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Locale = require('../utils/Locale');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.TIMESTAMP; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
    value: function _formatForLocale(props) {
      var locale = (0, _Locale.getCurrentLocale)();
      var value = typeof props.value === 'string' ? new Date(props.value) : props.value;

      var date = void 0;
      if (_showField('date', props.fields)) {
        var dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        date = value.toLocaleDateString(locale, dateOptions);
      }

      var time = void 0;
      if (_showField('time', props.fields)) {
        var timeOptions = { hour: '2-digit', minute: '2-digit' };
        time = value.toLocaleTimeString(locale, timeOptions);
      }

      this.setState({ date: date, time: time });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var align = _props.align;
      var className = _props.className;

      var classes = [CLASS_ROOT];
      if (align) {
        classes.push(CLASS_ROOT + '--' + align);
      }
      if (className) {
        classes.push(className);
      }

      var date = void 0;
      if (this.state.date) {
        date = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__date' },
          this.state.date
        );
      }

      var time = void 0;
      if (this.state.time) {
        time = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__time' },
          this.state.time
        );
      }

      return _react2.default.createElement(
        'span',
        { className: classes.join(' ') },
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


var FIELD_TYPES = _react.PropTypes.oneOf(['date', 'time']);

Timestamp.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  fields: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(FIELD_TYPES), FIELD_TYPES]),
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, // ISO-8601 string
  _react.PropTypes.object // Date object
  ]).isRequired
};
module.exports = exports['default'];