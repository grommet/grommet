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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-skype', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-skype');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#00AFF0', fillRule: 'evenodd', d: 'M12.05175,18.85575 C8.025,18.85575 6.22425,16.8765 6.22425,15.393 C6.22425,14.63175 6.786,14.0985 7.56,14.0985 C9.2835,14.0985 8.83725,16.57275 12.05175,16.57275 C13.69725,16.57275 14.60625,15.67875 14.60625,14.7645 C14.60625,14.21475 14.33475,13.605 13.251,13.338 L9.66975,12.444 C6.786,11.721 6.2625,10.16175 6.2625,8.69625 C6.2625,5.65275 9.1275,4.5105 11.8185,4.5105 C14.2965,4.5105 17.2185,5.88 17.2185,7.7055 C17.2185,8.48775 16.54125,8.943 15.76725,8.943 C14.2965,8.943 14.56725,6.9075 11.6055,6.9075 C10.1355,6.9075 9.32175,7.5735 9.32175,8.526 C9.32175,9.47625 10.48275,9.78 11.49,10.0095 L14.14125,10.59825 C17.0445,11.24475 17.78025,12.93975 17.78025,14.5365 C17.78025,17.00925 15.88275,18.85575 12.05175,18.85575 M23.15025,13.9695 C23.14275,14.0115 23.1375,14.05425 23.12925,14.09625 L23.08875,13.85475 C23.1105,13.89225 23.12925,13.93125 23.15025,13.9695 C23.274,13.29525 23.33925,12.60525 23.33925,11.91525 C23.33925,10.38525 23.03925,8.901 22.44825,7.50375 C21.87675,6.1545 21.06075,4.9425 20.019,3.9015 C18.97875,2.8605 17.766,2.04375 16.41675,1.473 C15.02025,0.882 13.536,0.58275 12.00675,0.58275 C11.28525,0.58275 10.563,0.65025 9.86025,0.78525 C9.85875,0.78525 9.85725,0.78525 9.855,0.786 C9.89475,0.807 9.9345,0.82575 9.9735,0.8475 L9.735,0.81 C9.77475,0.8025 9.81525,0.79425 9.855,0.786 C8.8905,0.27375 7.80675,0 6.70875,0 C4.917,0 3.23175,0.6975 1.965,1.965 C0.69825,3.23175 0,4.917 0,6.7095 C0,7.8495 0.29325,8.97075 0.84375,9.96225 C0.8505,9.921 0.85575,9.879 0.864,9.8385 L0.90525,10.07625 C0.8835,10.03875 0.86475,9.99975 0.84375,9.96225 C0.732,10.6035 0.67275,11.25975 0.67275,11.91525 C0.67275,13.44525 0.97275,14.9295 1.5645,16.32675 C2.1345,17.67675 2.952,18.888 3.99225,19.929 C5.03325,20.96925 6.2445,21.7875 7.59525,22.35675 C8.99175,22.94925 10.47675,23.2485 12.00675,23.2485 C12.672,23.2485 13.3395,23.18775 13.99125,23.07225 C13.953,23.05125 13.914,23.03175 13.87575,23.00925 L14.118,23.052 C14.076,23.0595 14.034,23.06475 13.99125,23.07225 C14.99475,23.64075 16.131,23.94225 17.29125,23.94225 C19.08375,23.94225 20.7675,23.2455 22.035,21.97725 C23.3025,20.71125 24,19.026 24,17.2335 C24,16.089 23.70525,14.964 23.15025,13.9695', stroke: 'none' })
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

Icon.displayName = 'SocialSkype';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];