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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.SPINNING;

var Spinning = function (_Component) {
  _inherits(Spinning, _Component);

  function Spinning() {
    _classCallCheck(this, Spinning);

    return _possibleConstructorReturn(this, (Spinning.__proto__ || Object.getPrototypeOf(Spinning)).apply(this, arguments));
  }

  _createClass(Spinning, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          small = _props.small,
          size = _props.size,
          responsive = _props.responsive,
          props = _objectWithoutProperties(_props, ['a11yTitle', 'className', 'small', 'size', 'responsive']);

      var intl = this.context.intl;


      var sizeOverride = small ? 'small' : size;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + sizeOverride, sizeOverride), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _classnames), className);

      return _react2.default.createElement(
        'svg',
        _extends({}, props, { className: classes, viewBox: '0 0 48 48', version: '1.1',
          role: 'img', 'aria-label': a11yTitle || _Intl2.default.getMessage(intl, 'Spinning') }),
        _react2.default.createElement('circle', { cx: '24', cy: '24', r: '21',
          stroke: '#979797', strokeWidth: '6', fill: 'none' })
      );
    }
  }]);

  return Spinning;
}(_react.Component);

Spinning.displayName = 'Spinning';
exports.default = Spinning;


Spinning.contextTypes = {
  intl: _propTypes2.default.object
};

Spinning.defaultProps = {
  responsive: true
};

Spinning.propTypes = {
  a11yTitle: _propTypes2.default.string,
  className: _propTypes2.default.string,
  small: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];