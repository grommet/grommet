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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-creative-commons', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-creative-commons');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#333', fillRule: 'evenodd', d: 'M11.9836946,0 C8.691525,0 5.7944764,1.21835303 3.55571004,3.48973014 C1.25096379,5.82708715 0,8.85609556 0,12.0163054 C0,15.2098843 1.21797384,18.1729128 3.52272009,20.4772799 C5.82746635,22.7820262 8.82310561,24.03299 11.9836946,24.03299 C15.1439044,24.03299 18.2059028,22.7820262 20.5762498,20.4446692 C22.8150161,18.2388928 24,15.3088542 24,12.0163054 C24,8.7571257 22.8150161,5.7944764 20.5432598,3.52272009 C18.2388928,1.21797384 15.2758642,0 11.9836946,0 L11.9836946,0 Z M12.0163054,2.17278645 C14.7161727,2.17278645 17.1195096,3.19319977 18.9957657,5.07021425 C20.839411,6.91348038 21.8268344,9.34980724 21.8268344,12.0163054 C21.8268344,14.7157935 20.8720217,17.0865196 19.0287556,18.897175 C17.0861404,20.806421 14.5842129,21.8272135 12.0163054,21.8272135 C9.41578715,21.8272135 6.97946028,20.8068002 5.102825,18.9297858 C3.22618972,17.0531505 2.17278645,14.5842129 2.17278645,12.0163054 C2.17278645,9.41578715 3.22618972,6.94684952 5.102825,5.0368451 C6.94647033,3.16058902 9.31681729,2.17278645 12.0163054,2.17278645 L12.0163054,2.17278645 Z M11.8615939,10.0194653 C11.1828351,8.78177337 10.0247741,8.28919927 8.68052834,8.28919927 C6.72388296,8.28919927 5.16652974,9.67326044 5.16652974,12.0159262 C5.16652974,14.3984074 6.63060102,15.7430323 8.74688744,15.7430323 C10.1047842,15.7430323 11.2628452,14.9975352 11.9014093,13.866397 L10.4107944,13.1076281 C10.0778613,13.9058333 9.57201542,14.1458636 8.93345131,14.1458636 C7.82847753,14.1458636 7.32263161,13.2274537 7.32263161,12.0159262 C7.32263161,10.805157 7.74884662,9.88636795 8.93345131,9.88636795 C9.25273336,9.88636795 9.89167667,10.0592808 10.2644252,10.8582443 L11.8615939,10.0194653 L11.8615939,10.0194653 Z M18.7936548,10.0194653 C18.114896,8.78177337 16.956835,8.28919927 15.6125893,8.28919927 C13.6559439,8.28919927 12.0985907,9.67326044 12.0985907,12.0159262 C12.0985907,14.3984074 13.5626619,15.7430323 15.6789484,15.7430323 C17.0368451,15.7430323 18.1949061,14.9975352 18.8334703,13.866397 L17.3428553,13.1076281 C17.0099223,13.9058333 16.5040763,14.1458636 15.8655122,14.1458636 C14.7605385,14.1458636 14.2546925,13.2274537 14.2546925,12.0159262 C14.2546925,10.805157 14.6809075,9.88636795 15.8655122,9.88636795 C16.1847943,9.88636795 16.8237376,10.0592808 17.1964861,10.8582443 L18.7936548,10.0194653 L18.7936548,10.0194653 Z', stroke: 'none' })
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

Icon.displayName = 'SocialCreativeCommons';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];