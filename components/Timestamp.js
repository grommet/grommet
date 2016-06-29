'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Locale = require('../utils/Locale');

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

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
  _inherits(Timestamp, _Component);

  function Timestamp() {
    _classCallCheck(this, Timestamp);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timestamp).call(this));

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
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--' + this.props.align);
      if (this.props.className) {
        classes.push(this.props.className);
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
  align: _react.PropTypes.oneOf(['left', 'right']),
  fields: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(FIELD_TYPES), FIELD_TYPES]),
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, // ISO-8601 string
  _react.PropTypes.object // Date object
  ]).isRequired
};

Timestamp.defaultProps = {
  align: 'left'
};
module.exports = exports['default'];