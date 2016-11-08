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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LABEL;

var Label = function (_Component) {
  (0, _inherits3.default)(Label, _Component);

  function Label() {
    (0, _classCallCheck3.default)(this, Label);
    return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).apply(this, arguments));
  }

  (0, _createClass3.default)(Label, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.announce) {
        (0, _Announcer.announce)(this.labelRef.textContent);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          labelFor = _props.labelFor,
          margin = _props.margin,
          size = _props.size,
          uppercase = _props.uppercase,
          props = (0, _objectWithoutProperties3.default)(_props, ['children', 'className', 'labelFor', 'margin', 'size', 'uppercase']);

      delete props.announce;
      var labelMargin = margin ? margin : 'small' === size ? 'none' : 'medium';
      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--uppercase', uppercase), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--margin-' + labelMargin, labelMargin), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), _classnames), className);

      return _react2.default.createElement(
        'label',
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this2.labelRef = _ref;
          } }, props, {
          className: classes, htmlFor: labelFor }),
        children
      );
    }
  }]);
  return Label;
}(_react.Component);

Label.displayName = 'Label';
exports.default = Label;
;

Label.propTypes = {
  announce: _react.PropTypes.bool,
  labelFor: _react.PropTypes.string,
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium']),
  uppercase: _react.PropTypes.bool
};

Label.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];