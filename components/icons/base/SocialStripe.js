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

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-stripe', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-stripe');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#00AFE1', fillRule: 'evenodd', d: 'M24,12.16 C24,10.4533333 23.1733333,9.10666667 21.5933333,9.10666667 C20.0066667,9.10666667 19.0466667,10.4533333 19.0466667,12.1466667 C19.0466667,14.1533333 20.18,15.1666667 21.8066667,15.1666667 C22.6,15.1666667 23.2,14.9866667 23.6533333,14.7333333 L23.6533333,13.4 C23.2,13.6266667 22.68,13.7666667 22.02,13.7666667 C21.3733333,13.7666667 20.8,13.54 20.7266667,12.7533333 L23.9866667,12.7533333 C23.9866667,12.6666667 24,12.32 24,12.16 L24,12.16 Z M20.7066667,11.5266667 C20.7066667,10.7733333 21.1666667,10.46 21.5866667,10.46 C21.9933333,10.46 22.4266667,10.7733333 22.4266667,11.5266667 L20.7066667,11.5266667 L20.7066667,11.5266667 Z M16.4733333,9.10666667 C15.82,9.10666667 15.4,9.41333333 15.1666667,9.62666667 L15.08,9.21333333 L13.6133333,9.21333333 L13.6133333,16.9866667 L15.28,16.6333333 L15.2866667,14.7466667 C15.5266667,14.92 15.88,15.1666667 16.4666667,15.1666667 C17.66,15.1666667 18.7466667,14.2066667 18.7466667,12.0933333 C18.74,10.16 17.64,9.10666667 16.4733333,9.10666667 L16.4733333,9.10666667 Z M16.0733333,13.7 C15.68,13.7 15.4466667,13.56 15.2866667,13.3866667 L15.28,10.9133333 C15.4533333,10.72 15.6933333,10.5866667 16.0733333,10.5866667 C16.68,10.5866667 17.1,11.2666667 17.1,12.14 C17.1,13.0333333 16.6866667,13.7 16.0733333,13.7 L16.0733333,13.7 Z M11.32,8.71333333 L12.9933333,8.35333333 L12.9933333,7 L11.32,7.35333333 L11.32,8.71333333 Z M11.32,9.22 L12.9933333,9.22 L12.9933333,15.0533333 L11.32,15.0533333 L11.32,9.22 Z M9.52666667,9.71333333 L9.42,9.22 L7.98,9.22 L7.98,15.0533333 L9.64666667,15.0533333 L9.64666667,11.1 C10.04,10.5866667 10.7066667,10.68 10.9133333,10.7533333 L10.9133333,9.22 C10.7,9.14 9.92,8.99333333 9.52666667,9.71333333 L9.52666667,9.71333333 Z M6.19333333,7.77333333 L4.56666667,8.12 L4.56,13.46 C4.56,14.4466667 5.3,15.1733333 6.28666667,15.1733333 C6.83333333,15.1733333 7.23333333,15.0733333 7.45333333,14.9533333 L7.45333333,13.6 C7.24,13.6866667 6.18666667,13.9933333 6.18666667,13.0066667 L6.18666667,10.64 L7.45333333,10.64 L7.45333333,9.22 L6.18666667,9.22 L6.19333333,7.77333333 L6.19333333,7.77333333 Z M1.68666667,10.9133333 C1.68666667,10.6533333 1.9,10.5533333 2.25333333,10.5533333 C2.76,10.5533333 3.4,10.7066667 3.90666667,10.98 L3.90666667,9.41333333 C3.35333333,9.19333333 2.80666667,9.10666667 2.25333333,9.10666667 C0.9,9.10666667 0,9.81333333 0,10.9933333 C0,12.8333333 2.53333333,12.54 2.53333333,13.3333333 C2.53333333,13.64 2.26666667,13.74 1.89333333,13.74 C1.34,13.74 0.633333333,13.5133333 0.0733333333,13.2066667 L0.0733333333,14.7933333 C0.693333333,15.06 1.32,15.1733333 1.89333333,15.1733333 C3.28,15.1733333 4.23333333,14.4866667 4.23333333,13.2933333 C4.22666667,11.3066667 1.68666667,11.66 1.68666667,10.9133333 L1.68666667,10.9133333 Z', stroke: 'none' })
      );
    }
  }]);

  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _propTypes2.default.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialStripe';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];