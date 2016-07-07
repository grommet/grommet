'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.FORM; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Form = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form() {
    (0, _classCallCheck3.default)(this, Form);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Form).apply(this, arguments));
  }

  (0, _createClass3.default)(Form, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var className = _props.className;
      var compact = _props.compact;
      var fill = _props.fill;
      var pad = _props.pad;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--compact', compact), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--pad-' + pad, typeof pad === 'string'), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--pad-horizontal-' + pad.horizontal, (typeof pad === 'undefined' ? 'undefined' : (0, _typeof3.default)(pad)) === 'object' && 'horizontal' in pad), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--pad-vertical-' + pad.vertical, (typeof pad === 'undefined' ? 'undefined' : (0, _typeof3.default)(pad)) === 'object' && 'vertical' in pad), _classnames));

      return _react2.default.createElement(
        'form',
        { className: classes, onSubmit: this.props.onSubmit },
        this.props.children
      );
    }
  }]);
  return Form;
}(_react.Component);

Form.displayName = 'Form';
exports.default = Form;
;

Form.propTypes = {
  compact: _react.PropTypes.bool,
  fill: _react.PropTypes.bool,
  onSubmit: _react.PropTypes.func,
  pad: _react.PropTypes.oneOfType([_react.PropTypes.oneOf(['none', 'small', 'medium', 'large']), _react.PropTypes.shape({
    horizontal: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    vertical: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large'])
  })])
};

Form.defaultProps = {
  compact: false,
  fill: false,
  pad: 'none'
};
module.exports = exports['default'];