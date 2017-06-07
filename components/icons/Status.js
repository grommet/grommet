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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.STATUS_ICON;

var Status = function (_Component) {
  _inherits(Status, _Component);

  function Status() {
    _classCallCheck(this, Status);

    return _possibleConstructorReturn(this, (Status.__proto__ || Object.getPrototypeOf(Status)).apply(this, arguments));
  }

  _createClass(Status, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          size = _props.size,
          value = _props.value,
          props = _objectWithoutProperties(_props, ['className', 'size', 'value']);

      var classes = (0, _classnames3.default)(_defineProperty({}, CLASS_ROOT + '--' + size, size), className);

      var icon = _react2.default.createElement(
        'span',
        null,
        '?'
      );
      switch (value.toLowerCase()) {
        case 'ok':
        case 'normal':
          icon = _react2.default.createElement(_OK2.default, _extends({}, props, { className: classes }));
          break;
        case 'warning':
          icon = _react2.default.createElement(_Warning2.default, _extends({}, props, { className: classes }));
          break;
        case 'critical':
          icon = _react2.default.createElement(_CriticalStatus2.default, _extends({}, props, { className: classes }));
          break;
        case 'disabled':
          icon = _react2.default.createElement(_Disabled2.default, _extends({}, props, { className: classes }));
          break;
        case 'unknown':
          icon = _react2.default.createElement(_Unknown2.default, _extends({}, props, { className: classes }));
          break;
        case 'blank':
          icon = _react2.default.createElement(_Blank2.default, _extends({}, props, { className: classes }));
          break;
        case 'label':
          icon = _react2.default.createElement(_Label2.default, _extends({}, props, { className: classes }));
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
  a11yTitle: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  value: _propTypes2.default.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'label', 'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};

Status.defaultProps = {
  value: 'unknown'
};
module.exports = exports['default'];