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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-access-assist-listening', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'access-assist-listening');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M3.32045903,20.4818876 C3.26277014,20.1218876 3.03814792,19.8990431 2.64810347,19.9009098 C2.25601459,19.9028653 2.00819236,20.1234876 2.00019236,20.5234876 C1.99237014,20.9169098 2.22357014,21.175132 2.6095257,21.1937987 C3.04721459,21.2150431 3.25574792,20.9250876 3.32045903,20.4818876 M12.1097035,11.7838431 C12.0871257,11.3757542 11.8483701,11.1225987 11.4829479,11.0955765 C11.0594813,11.0642876 10.7766368,11.3437542 10.7723701,11.7625098 C10.768459,12.152732 11.0577924,12.3814431 11.4349479,12.3923765 C11.8237479,12.4036653 12.0538813,12.1677542 12.1097035,11.7838431 M5.48019236,18.383932 C5.43708125,18.003132 5.26828125,17.7012653 4.8655257,17.6971765 C4.44445903,17.6929098 4.16099236,17.9630431 4.16845903,18.3859765 C4.17521459,18.7675765 4.46143681,19.0193987 4.83121459,19.0276653 C5.2183257,19.0362876 5.4303257,18.7650876 5.48019236,18.383932 M9.91023681,13.9429542 C9.88090347,13.5635765 9.69441459,13.273532 9.29965903,13.2604653 C8.87574792,13.2465098 8.59548125,13.5122876 8.59921459,13.9440209 C8.60259236,14.3312209 8.86197014,14.5890876 9.24721459,14.595132 C9.64037014,14.6013542 9.85165903,14.3349542 9.91023681,13.9429542 M7.75263681,17.6233098 C8.0895257,17.5200209 8.24970347,17.2761098 8.43317014,17.0699765 C8.65237014,16.8236653 8.43903681,16.6612653 8.28054792,16.5040209 C7.73965903,15.9673098 7.17930347,15.4490876 6.65805903,14.8940653 C6.2855257,14.4973542 6.09388125,14.7989542 5.83681459,15.0233098 C5.53334792,15.2881098 5.53183681,15.4948653 5.83183681,15.7761987 C6.36650347,16.2777098 6.86525903,16.817532 7.38534792,17.3348653 C7.5007257,17.4497098 7.64250347,17.5378876 7.75263681,17.6233098 M19.7345035,8.88686535 C20.1849924,8.77139868 20.6590368,8.72197646 20.3834813,8.0704209 C19.1999257,5.27193201 17.206059,3.33379868 14.319659,2.34330979 C14.0253479,2.24224312 13.7097035,2.14224312 13.5752146,2.60668757 C13.4519257,3.03264312 13.5126368,3.26819868 13.9895257,3.43104312 C16.5289924,4.29815424 18.3059701,5.99033201 19.3130813,8.48233201 C19.3989479,8.69486535 19.4565479,8.93095424 19.7345035,8.88686535 M14.6261479,0.0026875685 C14.1715701,-0.0351790982 14.2088146,0.335665346 14.1115701,0.574954235 C13.9317479,1.01744312 14.2522813,1.08935424 14.5695257,1.19548757 C17.8370813,2.28846535 20.1273924,4.44286535 21.4425924,7.61726535 C21.653259,8.12570979 21.8706813,8.26393201 22.3915701,8.06064312 C22.9886368,7.82757646 22.6811701,7.45628757 22.5571701,7.16428757 C21.0863257,3.70197646 18.5926368,1.32695424 15.0081035,0.127220902 C14.8734368,0.0821542352 14.7381479,0.0391320129 14.6261479,0.0026875685 M6.70801459,11.1408209 C6.70508125,11.381532 6.67201459,11.8606431 7.21281459,11.8925542 C7.7031257,11.921532 7.7207257,11.4576209 7.78623681,11.0932653 C7.83139236,10.8418876 7.88099236,10.5898876 7.95165903,10.344732 C8.40783681,8.76179868 9.8911257,7.61788757 11.4713035,7.62277646 C13.0341479,7.62766535 14.2730813,8.64810979 14.7546813,10.3291765 C14.8405479,10.6289987 14.916459,10.9315765 15.0032146,11.2310431 C15.1057924,11.5850876 15.2922813,11.8931765 15.7078368,11.823932 C16.1362813,11.7523765 16.1656146,11.3834876 16.1613479,11.0236653 C16.1334368,8.66997646 13.858859,6.53530979 11.363659,6.52357646 C9.01574792,6.51255424 6.78534792,8.64855424 6.70801459,11.1408209 M11.8176146,4.5456209 C8.88437014,4.57690979 6.7303257,5.84419868 5.50997014,8.07868757 C4.98685903,9.03655424 4.66801459,10.0653542 4.70765903,11.1761098 C4.72303681,11.6061542 4.85450347,12.0044653 5.35201459,12.0302431 C5.79565903,12.0532653 5.98134792,11.7096209 6.0591257,11.3156653 C6.11423681,11.0368209 6.16419236,10.7568209 6.2103257,10.4763765 C6.36099236,9.56037646 6.71974792,8.7392209 7.28543681,8.0000209 C8.77663681,6.05157646 11.4562813,5.39415424 13.6427701,6.45219868 C15.938859,7.56339868 17.1990368,10.0618876 16.6101479,12.3708653 C16.3145035,13.530332 15.5937924,14.4576209 14.8777035,15.3777098 C13.9071257,16.6248209 13.2993924,17.9683765 13.3477479,19.6076653 C13.4082813,21.6593098 13.1537035,21.9259765 11.144459,22.4739765 C10.8168146,22.5633987 10.5362813,22.715932 10.5289924,23.0804653 C10.5224146,23.410332 10.7043701,23.6697098 11.0193035,23.8193987 C11.2873035,23.9468653 11.557259,23.957532 11.8494368,23.9163765 C13.692459,23.656732 14.8787701,22.2812653 14.8654368,20.2922876 C14.8560146,18.8984209 14.9661479,17.5649987 15.8689035,16.4165542 C16.2199257,15.9700653 16.5355701,15.4958431 16.8794813,15.0435765 C18.4929035,12.9217098 18.6317479,10.6337098 17.4766368,8.30553201 C16.2562813,5.84570979 14.1591257,4.65993201 11.8176146,4.5456209' })
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

Icon.displayName = 'AccessAssistListening';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];