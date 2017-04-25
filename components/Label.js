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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LABEL;

var Label = function (_Component) {
  _inherits(Label, _Component);

  function Label() {
    _classCallCheck(this, Label);

    return _possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).apply(this, arguments));
  }

  _createClass(Label, [{
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
          align = _props.align,
          children = _props.children,
          className = _props.className,
          labelFor = _props.labelFor,
          margin = _props.margin,
          size = _props.size,
          truncate = _props.truncate,
          uppercase = _props.uppercase,
          props = _objectWithoutProperties(_props, ['align', 'children', 'className', 'labelFor', 'margin', 'size', 'truncate', 'uppercase']);

      delete props.announce;
      var labelMargin = margin ? margin : 'small' === size ? 'none' : 'medium';
      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--truncate', truncate), _defineProperty(_classnames, CLASS_ROOT + '--uppercase', uppercase), _defineProperty(_classnames, CLASS_ROOT + '--margin-' + labelMargin, labelMargin), _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _classnames), className);

      return _react2.default.createElement(
        'label',
        _extends({ ref: function ref(_ref) {
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


Label.propTypes = {
  align: _propTypes2.default.oneOf(['start', 'center', 'end']),
  announce: _propTypes2.default.bool,
  labelFor: _propTypes2.default.string,
  margin: _propTypes2.default.oneOf(['none', 'small', 'medium', 'large']),
  size: _propTypes2.default.oneOf(['small', 'medium', 'large']),
  truncate: _propTypes2.default.bool,
  uppercase: _propTypes2.default.bool
};

Label.defaultProps = {
  size: 'medium'
};
module.exports = exports['default'];