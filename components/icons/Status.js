'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = "status-icon";

var Status = function (_Component) {
  _inherits(Status, _Component);

  function Status() {
    _classCallCheck(this, Status);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Status).apply(this, arguments));
  }

  _createClass(Status, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
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

exports.default = Status;


Status.defaultProps = { value: 'unknown' };

Status.propTypes = {
  a11yTitle: _react.PropTypes.string,
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  value: _react.PropTypes.oneOf(['critical', 'warning', 'ok', 'unknown', 'disabled', 'label', 'Critical', 'Warning', 'OK', 'Unknown', 'Disabled', 'Label', 'blank'])
};
module.exports = exports['default'];