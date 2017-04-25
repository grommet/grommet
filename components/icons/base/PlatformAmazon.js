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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-amazon', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-amazon');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#221F20', fillRule: 'evenodd', d: 'M21.2015418,18.8897309 C21.8205964,18.9745309 21.9664873,19.1739491 21.8715055,19.7940218 C21.7682327,20.4677673 21.5560145,21.1098036 21.2998691,21.7391855 C21.2527418,21.8548218 21.1461236,21.9969309 21.3080145,22.0929309 C21.43936,22.1707491 21.5295418,22.0479855 21.6114327,21.9615855 C22.4480873,21.0795491 22.8719418,20.02544 22.9051055,18.8148218 C22.9171782,18.3717673 22.8021236,18.2248582 22.3739055,18.1279855 C21.7765236,17.9930036 21.1688145,18.0218036 20.5682327,18.0887127 C20.0358691,18.1480582 19.5299782,18.3223127 19.0687418,18.6037673 C18.9590691,18.6705309 18.8124509,18.7471855 18.8891055,18.9111127 C18.9531055,19.0481309 19.0941964,19.0007127 19.2136145,18.9883491 C19.6821236,18.9400582 20.1509236,18.89424 20.5263418,18.8568582 C20.81536,18.8696582 21.01056,18.8635491 21.2015418,18.8897309 M20.4232145,20.8567127 C20.6189964,20.6968582 20.8176873,20.5324945 20.9426327,20.3031127 C21.02656,20.1487855 21.0227782,19.9986764 20.9045236,19.8647127 C20.7916509,19.7368582 20.65056,19.7359855 20.5061236,19.8028945 C20.3522327,19.8741673 20.20096,19.9512582 20.0488145,20.0264582 C17.3749236,21.34864 14.5696873,22.04464 11.5640145,21.9281309 C9.49143273,21.8476945 7.50379636,21.4303855 5.58699636,20.6671855 C4.12968727,20.0868218 2.75965091,19.3368582 1.49245091,18.4058036 C1.37012364,18.3160582 1.22903273,18.1684218 1.07630545,18.3122764 C0.903214545,18.4753309 1.06568727,18.6199127 1.16139636,18.75344 C1.21056,18.8219491 1.27485091,18.8795491 1.33041455,18.9435491 C1.87965091,19.5771491 2.49303273,20.1445673 3.13957818,20.6756218 C5.74263273,22.8130764 8.70568727,23.9706036 12.8696145,23.9356945 C15.21696,23.8452218 18.0006691,22.8347491 20.4232145,20.8567127 M9.29521455,12.6053673 C9.29986909,12.7047127 9.30146909,12.8868218 9.31805091,13.0676218 C9.43659636,14.3615855 10.7243055,15.1105309 11.90336,14.5668218 C12.9350691,14.09104 13.3960145,13.1986764 13.6328145,12.15184 C13.8108509,11.3650764 13.7404509,10.5623127 13.7740509,9.76638545 C13.7859782,9.48507636 13.6086691,9.41205818 13.3702691,9.43474909 C12.8886691,9.48071273 12.4031418,9.50645818 11.9275055,9.58805818 C10.1824873,9.88754909 9.29259636,10.8903127 9.29521455,12.6053673 M18.1925236,8.25162182 C18.1925236,9.59213091 18.2101236,10.65904 18.1872873,11.7252218 C18.1666327,12.6892945 18.4723782,13.5320582 19.0299055,14.2994764 C19.7228509,15.2535127 19.7184873,15.3060218 18.8413964,16.0785309 C18.2594327,16.5911127 17.6768873,17.1034036 17.0888145,17.6090036 C16.6706327,17.9684218 16.3922327,17.9642036 15.9613964,17.6090036 C15.4803782,17.2123491 15.0911418,16.7354036 14.7336145,16.2274764 C14.4603055,15.8392582 14.3693964,15.8311127 14.02496,16.1512582 C13.3629964,16.7665309 12.6600145,17.3327855 11.7951418,17.6218036 C10.2931782,18.1240582 8.76823273,18.20304 7.27906909,17.5911127 C6.13288727,17.1201309 5.32939636,16.2613673 4.97477818,15.0706764 C4.45230545,13.31664 4.52445091,11.5914036 5.50976,9.99227636 C6.35383273,8.62238545 7.66874182,7.90704 9.17579636,7.50093091 C10.4195782,7.16580364 11.6968145,7.03285818 12.97536,6.91387636 C13.14336,6.89831273 13.3112145,6.87358545 13.4771782,6.84260364 C13.6701964,6.80667636 13.7926691,6.67620364 13.7731782,6.48667636 C13.7138327,5.90951273 13.7894691,5.31984 13.6288873,4.75358545 C13.4448873,4.10471273 13.0188509,3.69584 12.3616873,3.53133091 C10.9120873,3.16827636 9.75936,3.80449455 9.28866909,5.22805818 C9.10379636,5.78733091 8.91456,5.91765818 8.31805091,5.85540364 C7.51165091,5.77133091 6.70597818,5.67984 5.90146909,5.57874909 C5.27368727,5.49991273 5.10336,5.23285818 5.24430545,4.60144 C5.71252364,2.50485818 7.02656,1.18500364 9.02539636,0.508203636 C11.0715055,-0.184450909 13.1222691,-0.171069091 15.1541236,0.560276364 C16.9260509,1.19809455 17.8812509,2.50456727 18.1152873,4.34893091 C18.2912873,5.73671273 18.1426327,7.13351273 18.1925236,8.25162182', stroke: 'none' })
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

Icon.displayName = 'PlatformAmazon';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];