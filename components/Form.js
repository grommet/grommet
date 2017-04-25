'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.FORM;

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          compact = _props.compact,
          fill = _props.fill,
          pad = _props.pad,
          plain = _props.plain,
          props = _objectWithoutProperties(_props, ['className', 'compact', 'fill', 'pad', 'plain']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--compact', compact), _defineProperty(_classnames, CLASS_ROOT + '--fill', fill), _defineProperty(_classnames, CLASS_ROOT + '--pad-' + pad, typeof pad === 'string'), _defineProperty(_classnames, CLASS_ROOT + '--pad-horizontal-' + pad.horizontal, (typeof pad === 'undefined' ? 'undefined' : _typeof(pad)) === 'object' && 'horizontal' in pad), _defineProperty(_classnames, CLASS_ROOT + '--pad-vertical-' + pad.vertical, (typeof pad === 'undefined' ? 'undefined' : _typeof(pad)) === 'object' && 'vertical' in pad), _defineProperty(_classnames, CLASS_ROOT + '--plain', plain), _classnames), className);

      return _react2.default.createElement(
        'form',
        _extends({}, props, { className: classes, onSubmit: this.props.onSubmit }),
        this.props.children
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.displayName = 'Form';
exports.default = Form;


Form.propTypes = {
  compact: _propTypes2.default.bool,
  fill: _propTypes2.default.bool,
  onSubmit: _propTypes2.default.func,
  pad: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['none', 'small', 'medium', 'large']), _propTypes2.default.shape({
    horizontal: _propTypes2.default.oneOf(['none', 'small', 'medium', 'large']),
    vertical: _propTypes2.default.oneOf(['none', 'small', 'medium', 'large'])
  })]),
  plain: _propTypes2.default.bool
};

Form.defaultProps = {
  compact: false,
  fill: false,
  pad: 'none'
};
module.exports = exports['default'];