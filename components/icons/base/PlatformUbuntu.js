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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-platform-ubuntu', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'platform-ubuntu');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M24,12.000127 C24,18.6272309 18.6273155,23.9999153 11.999873,23.9999153 C5.37243046,23.9999153 0,18.6273155 0,12.000127 C0,5.37251513 5.37234579,0 11.9997883,0 C18.6272309,0 24,5.37251513 24,12.000127 L24,12.000127 Z M3.84013547,10.3980668 C2.95511615,10.3980668 2.23799058,11.1151924 2.23799058,12.0002117 C2.23799058,12.8848923 2.95511615,13.6021026 3.84013547,13.6021026 C4.72481611,13.6021026 5.44202635,12.8848923 5.44202635,12.0002117 C5.44202635,11.1151077 4.72490078,10.3980668 3.84013547,10.3980668 L3.84013547,10.3980668 Z M15.2791773,17.6795583 C14.5128605,18.121941 14.2505636,19.1013635 14.6927769,19.8673416 C15.1352442,20.6336585 16.114582,20.8961247 16.8808989,20.4537421 C17.6469617,20.0114441 17.909428,19.0320216 17.4670453,18.2657894 C17.0247473,17.4998113 16.0452402,17.2372603 15.2791773,17.6795583 L15.2791773,17.6795583 Z M7.32009948,11.9999577 C7.32009948,10.4166088 8.10690561,9.01808689 9.31010178,8.17125218 L8.1388249,6.20927451 C6.73674704,7.14602508 5.69382463,8.57807489 5.26058596,10.255319 C5.76663786,10.6678144 6.08997936,11.2959554 6.08997936,12.000127 C6.08997936,12.7041293 5.76663786,13.3322703 5.2605013,13.744681 C5.6936553,15.4220944 6.73666237,16.8541443 8.13874023,17.7908102 L9.31010178,15.8286632 C8.10690561,14.9819978 7.32009948,13.5835606 7.32009948,11.9999577 L7.32009948,11.9999577 Z M12.0000423,7.32001482 C14.4449579,7.32001482 16.4504542,9.19461662 16.6606812,11.5849223 L18.9439684,11.5515637 C18.8316159,9.78677438 18.0607271,8.20198614 16.8759882,7.03722858 C16.2668971,7.26735223 15.5632336,7.23246962 14.9550738,6.88127282 C14.3461521,6.52973736 13.964052,5.93673293 13.8594042,5.29318258 C13.2674157,5.12935283 12.6443547,5.04002963 12.000127,5.04002963 C10.8921807,5.04002963 9.84544829,5.30012524 8.91564038,5.7607112 L10.0286667,7.75545482 C10.6278518,7.47664791 11.2955321,7.32001482 12.0000423,7.32001482 L12.0000423,7.32001482 Z M12.0000423,16.6799852 C11.2954474,16.6799852 10.6278518,16.5233521 10.028582,16.2445452 L8.91538638,18.2394581 C9.84527896,18.6998748 10.892096,18.960055 12.0000423,18.960055 C12.64427,18.960055 13.2673311,18.8707318 13.8594042,18.7069021 C13.964052,18.0633517 14.3462367,17.4703473 14.9552432,17.1185578 C15.5634029,16.7675304 16.2670665,16.7326478 16.8761576,16.9628561 C18.0608117,15.7980139 18.8317006,14.2132256 18.9438837,12.4484363 L16.6605965,12.4150777 C16.4505389,14.805722 14.4449579,16.6799852 12.0000423,16.6799852 L12.0000423,16.6799852 Z M15.2789233,6.32027234 C16.0451555,6.76282433 17.0246627,6.5002734 17.466876,5.73429524 C17.9093433,4.96797841 17.6470464,3.98855591 16.8807295,3.54608858 C16.114582,3.10379059 15.1351595,3.36625686 14.6926922,4.13257369 C14.2503942,4.89855185 14.5128605,5.87805902 15.2789233,6.32027234 L15.2789233,6.32027234 Z' })
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

Icon.displayName = 'PlatformUbuntu';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];