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

var _OK = require('./status/OK');

var _OK2 = _interopRequireDefault(_OK);

var _CriticalStatus = require('./status/CriticalStatus');

var _CriticalStatus2 = _interopRequireDefault(_CriticalStatus);

var _Warning = require('./status/Warning');

var _Warning2 = _interopRequireDefault(_Warning);

var _Disabled = require('./status/Disabled');

var _Disabled2 = _interopRequireDefault(_Disabled);

var _Unknown = require('./status/Unknown');

var _Unknown2 = _interopRequireDefault(_Unknown);

var _Blank = require('./status/Blank');

var _Blank2 = _interopRequireDefault(_Blank);

var _Label = require('./status/Label');

var _Label2 = _interopRequireDefault(_Label);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.STATUS_ICON; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Status = function (_Component) {
  (0, _inherits3.default)(Status, _Component);

  function Status() {
    (0, _classCallCheck3.default)(this, Status);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Status).apply(this, arguments));
  }

  (0, _createClass3.default)(Status, [{
    key: 'render',
    value: function render() {
      var classes = [];
      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var size = _props.size;


      if (this.props.className) {
        classes.push(this.props.className);
      }
      if (size) {
        classes.push(CLASS_ROOT + "--" + size);
      }
      var className = classes.join(' ');
      var icon = _react2.default.createElement(
        'span',
        null,
        '?'
      );
      switch (this.props.value.toLowerCase()) {
        case 'ok':
        case 'normal':
          icon = _react2.default.createElement(_OK2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'warning':
          icon = _react2.default.createElement(_Warning2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'critical':
          icon = _react2.default.createElement(_CriticalStatus2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'disabled':
          icon = _react2.default.createElement(_Disabled2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'unknown':
          icon = _react2.default.createElement(_Unknown2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'blank':
          icon = _react2.default.createElement(_Blank2.default, { className: className, a11yTitle: a11yTitle });
          break;
        case 'label':
          icon = _react2.default.createElement(_Label2.default, { className: className, a11yTitle: a11yTitle });
          break;
      }
      return icon;
    }
  }]);
  return Status;
}(_react.Component);

Status.displayName = 'Status';
exports.default = Status;


Status.defaultProps = { value: 'unknown' };

Status.propTypes = {
  a11yTitle: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  value: _react.PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'label', 'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};
module.exports = exports['default'];