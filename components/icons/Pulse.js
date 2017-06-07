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

var _Add = require('./base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.PULSE;

var Pulse = function (_Component) {
  _inherits(Pulse, _Component);

  function Pulse() {
    _classCallCheck(this, Pulse);

    return _possibleConstructorReturn(this, (Pulse.__proto__ || Object.getPrototypeOf(Pulse)).apply(this, arguments));
  }

  _createClass(Pulse, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          icon = _props.icon,
          props = _objectWithoutProperties(_props, ['className', 'icon']);

      var classes = (0, _classnames2.default)(CLASS_ROOT, className);

      return _react2.default.createElement(
        'div',
        _extends({}, props, { className: classes }),
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__icon' },
          icon
        ),
        _react2.default.createElement('div', { className: CLASS_ROOT + '__icon-anim' })
      );
    }
  }]);

  return Pulse;
}(_react.Component);

Pulse.displayName = 'Pulse';
exports.default = Pulse;


Pulse.propTypes = {
  className: _propTypes2.default.string,
  icon: _propTypes2.default.node
};

Pulse.defaultProps = {
  icon: _react2.default.createElement(_Add2.default, null)
};
module.exports = exports['default'];