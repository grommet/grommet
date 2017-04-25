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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-google-wallet', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-google-wallet');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#4285F4', fillRule: 'evenodd', d: 'M12.3007772,20.2064516 C11.8620675,20.9290323 11.1007772,21.3548387 10.2620675,21.3548387 C10.0298095,21.3548387 9.79755139,21.316129 9.57819655,21.2516129 C9.39755139,21.1870968 9.204003,21.1096774 9.03626107,21.0064516 C8.36529333,20.5935484 7.96529333,19.9096774 7.9007772,19.1870968 C7.89140409,19.0839926 7.88808323,18.9793754 7.89136416,18.8743442 C7.55009449,15.0742313 5.43254085,11.8144954 2.19755139,10.0774194 C1.1007772,9.49677419 0.674970747,8.11612903 1.26851913,7.01935484 C1.66851913,6.27096774 2.42980946,5.81935484 3.26851913,5.81935484 C3.64271268,5.81935484 4.01690623,5.90967742 4.33948688,6.09032258 C6.48434923,7.23339294 8.37353109,8.87504028 9.73981084,10.748043 C9.55437093,9.20494486 9.06580772,7.70138229 8.2491643,6.38709677 C7.86206752,5.74193548 7.82335784,4.95483871 8.05561591,4.3483871 C8.17174494,4.03870968 8.32658365,3.75483871 8.59755139,3.47096774 C8.86851913,3.18709677 9.16529333,3.03225806 9.4491643,2.91612903 C9.72013204,2.81290323 9.91368042,2.76129032 10.3007772,2.76129032 C10.7652933,2.76129032 11.2169062,2.90322581 11.5910998,3.1483871 C11.6256625,3.16950877 11.659368,3.19148766 11.6922588,3.21432378 C11.6556159,3.17419355 11.5910998,3.13548387 11.5910998,3.13548387 C14.3738522,4.83605479 16.7449876,7.17977729 18.3834315,9.79420491 C18.1429112,7.64929068 17.5519189,5.57240342 16.6104546,3.57419355 C16.0169062,2.33548387 16.5459385,0.838709677 17.7975514,0.24516129 C18.1330353,0.0774193548 18.4943256,0 18.8685191,0 C19.8233578,0 20.7136804,0.567741935 21.1265836,1.43225806 C21.9007772,3.05806452 22.4943256,4.76129032 22.8943256,6.51612903 C23.2943256,8.29677419 23.5136804,10.1677419 23.5265836,12.0258065 C23.5265836,13.9096774 23.3072288,15.7419355 22.9072288,17.5354839 C22.804003,18.0129032 22.687874,18.4645161 22.5459385,18.9419355 C22.1072288,20.5290323 21.604003,21.7548387 21.1007772,22.6967742 C20.6620675,23.4967742 19.8233578,24 18.9072288,24 C18.5330353,24 18.1717449,23.9096774 17.8362611,23.7548387 C17.087874,23.4064516 16.6362611,22.7612903 16.4685191,22.0516129 C16.4169062,21.8451613 16.404003,21.6258065 16.404003,21.4709677 C16.404003,20.9290323 16.3781966,20.5677419 16.3781966,20.5677419 C16.3781966,17.8729043 15.7339615,15.3069136 14.548495,13.0500263 C14.3781966,15.6 13.6169062,18.0516129 12.3007772,20.2064516 Z', stroke: 'none' })
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

Icon.displayName = 'SocialGoogleWallet';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];