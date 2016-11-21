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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.STATUS_ICON;

var Status = function (_Component) {
  (0, _inherits3.default)(Status, _Component);

  function Status() {
    (0, _classCallCheck3.default)(this, Status);
    return (0, _possibleConstructorReturn3.default)(this, (Status.__proto__ || (0, _getPrototypeOf2.default)(Status)).apply(this, arguments));
  }

  (0, _createClass3.default)(Status, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          size = _props.size,
          value = _props.value,
          props = (0, _objectWithoutProperties3.default)(_props, ['className', 'size', 'value']);

      var classes = (0, _classnames3.default)((0, _defineProperty3.default)({}, CLASS_ROOT + '--' + size, size), className);

      var icon = _react2.default.createElement(
        'span',
        null,
        '?'
      );
      switch (value.toLowerCase()) {
        case 'ok':
        case 'normal':
          icon = _react2.default.createElement(_OK2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'warning':
          icon = _react2.default.createElement(_Warning2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'critical':
          icon = _react2.default.createElement(_CriticalStatus2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'disabled':
          icon = _react2.default.createElement(_Disabled2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'unknown':
          icon = _react2.default.createElement(_Unknown2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'blank':
          icon = _react2.default.createElement(_Blank2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
        case 'label':
          icon = _react2.default.createElement(_Label2.default, (0, _extends3.default)({}, props, { className: classes }));
          break;
      }
      return icon;
    }
  }]);
  return Status;
}(_react.Component);

Status.displayName = 'Status';
exports.default = Status;


Status.propTypes = {
  a11yTitle: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  value: _react.PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'label', 'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};

Status.defaultProps = {
  value: 'unknown'
};
module.exports = exports['default'];