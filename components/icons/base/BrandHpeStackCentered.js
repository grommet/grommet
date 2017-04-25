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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-brand-hpe-stack-centered', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'brand-hpe-stack-centered');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 126 48', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement(
          'g',
          { fill: 'none', fillRule: 'evenodd' },
          _react2.default.createElement('path', { fill: '#333', d: 'M0,29 L0,17 L3,17 L3,22 L8,22 L8,17 L11,17 L11,29 L8,29 L8,24 L3,24 L3,29 L0,29 Z M16.5,29 C13.5,29 12,27 12,24.5 C12,21.5 14,20 16,20 C19,20 20,22.5 20,24 L20,25 L14.5,25 C14.5,26 15,27 16.5,27 C18,27 18.5,26 18.5,26 L19.5,27.5 C19.5,27.5 18.5,29 16.5,29 Z M17.5,23.5 C17.5,23 17.25,22 16,22 C14.75,22 14.5,23 14.5,23.5 L17.5,23.5 Z M25,28.5 L23,28.5 L20,20 L22.5,20 L24,25 L25.5,20 L27.5,20 L29,25 L30.5,20 L33,20 L30,28.5 L28,28.5 L26.5,24 L25,28.5 Z M34,25.5 L34,17 L37,17 C37,17 37,25 37,26 C37,27 38.5,27 39,26.5 L39,28.5 C39,28.5 38,29 37,29 C34.9791644,29 34,28 34,25.5 Z M45.5,23.5 C45.5,23 45.25,22 44,22 C42.75,22 42.5,23 42.5,23.5 L45.5,23.5 Z M44.5,29 C41.5,29 40,27 40,24.5 C40,21.5 42,20 44,20 C47,20 48,22.5 48,24 L48,25 L42.5,25 C42.5,26 43,27 44.5,27 C46,27 46.5,26 46.5,26 L47.5,27.5 C47.5,27.5 46.5,29 44.5,29 Z M61,20 L61,22 L59,22 L59,26 C59,27 60.5,27 61,26.5 L61,28.5 C61,28.5 60,29 59,29 C57,29 56,28 56,25.5 L56,22 L53,22 L53,26 C53,27 54.5,27 55,26.5 L55,28.5 C55,28.5 54,29 53,29 C51,29 50,28 50,25.5 L50,22 L49,22 L49,20 L50,20 L50,18 L53,18 L53,20 L56,20 L56,18 L59,18 L59,20 L61,20 Z M70,25 C70,25 68,25 68,25 L68.0000001,29 L65,29 L65,17 L70,17 C73.5,17 75,19 75,21 C75,23 73.5,25 70,25 Z M72,21 C72,20 71.5,19.5 69.5,19.5 L68,19.5 L68,22.5 L69.5,22.5 C71.5,22.5 72,22 72,21 Z M78.5,29 C76.4999999,29 75,28 75,26 C75,24 76.5,23 78.5,23 C79.5,23 80.5,23.5 80.5,23.5 C80.5,22.5 80,22 78.5,22 C77,22 76.5,22.5 76.5,22.5 L76,21 C76.5,20.5 77.5,20 78.5,20 C81,20 83,20.5 83,23.5 L82.9999999,29.0000001 L80.9999999,29.0000001 L80.5,28.5 C80.5,28.5 79.5,29 78.5,29 Z M80.5,25.5 C80.5,25.5 80,25 79,25 C78,25 77.5,25.5 77.5,26 C77.5,26.5 78,27 79,27 C80,27 80.5,26.5 80.5,25.5 Z M91,23 C91,23 90,22 89,22 C88,22 86.8571429,22.5 86.8571429,24.5 C86.8571429,26.5 88,27 89,27 C90,27 91,26 91,26 L92,27.5 C92,27.5 91,29 88.5714288,29 C85.5,29 84,27 84,24.5 C84,21.5 86,20 88.5714286,20 C91,20 92,21.5 92,21.5 L91,23 Z M96,25 L96,29 L93.5,29 L93.5,17 L96,17 L96,24 L99,20 L102,20 L98.5,24.5 L102,29 L99,29 L96,25 Z M107.5,25.5 C107.5,25.5 107,25 106,25 C105,25 104.5,25.5 104.5,26 C104.5,26.5 105,27 106,27 C107,27 107.5,26.5 107.5,25.5 Z M105.5,29 C103.5,29 102,28 102,26 C102,24 103.5,23 105.5,23 C106.5,23 107.5,23.5 107.5,23.5 C107.5,22.5 107,22 105.5,22 C104,22 103.5,22.5 103.5,22.5 L103,21 C103.5,20.5 104.5,20 105.5,20 C108,20 110,20.5 110,23.5 L110,29.0000001 L108,29.0000001 L107.5,28.5 C107.5,28.5 106.5,29 105.5,29 Z M114,21.5 C114.5,20.5 115,20 116,20 C116.5,20 117,20.5 117,20.5 L116.5,23 C116.5,23 116,22.5 115.5,22.5 C114.5,22.5 114,23.1685183 114,24 L114,29 L111.5,29 L111.5,20 L114,20 L114,21.5 Z M121,29 C119,29 117.5,27.5 117.5,24.5 C117.5,21.5 119,20 121,20 C122.5,20 123.5,21 123.5,21 L123.5,17.5 L126,17.5 L126,29 L123.5,29 L123.5,28 C123.5,28 122.5,29 121,29 Z M122.5,26.4999999 C123.5,25.9999999 123.5,24.9999999 123.5,24.4999999 C123.5,23.9999999 123.5,23 122.5,22.5 C121.5,22 120,22.5 120,24.5 C120,26.5 121.5,26.9999999 122.5,26.4999999 Z M31,33 L31,35 L26,35 L26,38 L30.5,38 L30.5,40 L26,40 L26,43 L31,43 L31,44.9999998 L24,45 L24,33 L31,33 Z M41,39.5 L41,45 L39,45 L39,39.5 C39,38 38.0298955,37.5 37,37.5 C36,37.5 35,38.5 35,40.5 L35,45 L33,45 L33,36 L35,36 L35,37 C35,37 36,36 37.5,36 C39.5,36 41,37 41,39.5 Z M45,36 L47,36 L47,38 L45,38 L45,42.5 C45,43.5 46.5,43.5 47,43 L47,44.5 C47,44.5 46.5,45 45.5,45 C45,45 43,45 43,42 L43,38 L42,38 L42,36 L43,36 L43,34 L45.0000001,34 L45,36 Z M48,40.5 C48,38 49,36 52,36 C54.5,36 56,38 56,40 L56,41 L50,41 C50,43 51.5,43.5 52.5,43.5 C54,43.5 54.5,42.5 54.5,42.5 L55.5,43.5 C55.5,43.5 54.5,45 52.5,45 C49.5,45 48,43 48,40.5 Z M54,39.5 C54,38 53,37.5 52,37.5 C50.5,37.5 50,38.5 50,39.5 L54,39.5 Z M62,36.0000001 C62.5,36.0000001 63,36.5 63,36.5 L63,38.4999999 C63,38.4999999 62.5,38 61.5,38 C60.5,38 60,38.5 60,40 L60,45.0000001 L58,45.0000001 L58,36.0000001 L60,36.0000001 L60,37.5000001 C60,37.5000001 60.5,36.0000001 62,36.0000001 Z M72.5,40.5 C72.5,43 71.5,45 69,45 C67,45 66,43.5 66,43.5 L66,48 L64,48 L64,36 L66,36 L66,37.5 C66,37.5 67,36 69,36 C71.5,36 72.5,38 72.5,40.5 Z M66,41 C66,42 66.5,43.5 68.5,43.5 C69.5,43.5 70.5,42.5 70.5,40.5 C70.5,38.5 69.5,37.5 68.5,37.5 C67,37.5 66,38.5 66,40 C66,40 66,41 66,41 Z M78,36.0000001 C78.5,36.0000001 79,36.5 79,36.5 L79,38.4999999 C79,38.4999999 78.5,38 77.5,38 C76.5,38 76,38.5 76,40 L76,45.0000001 L74,45.0000001 L74,36.0000001 L76,36.0000001 L76,37.5000001 C76,37.5000001 76.5,36.0000001 78,36.0000001 Z M81,36 L83,36 L83,45 L81,45 L81,36 Z M82,33 C83,33 83,33 83,34.0002128 C83,35.0004257 83,35 82,35 C81,35 81,35.0004257 81,34.0002128 C81,33 81,33 82,33 Z M91.5,37 C91.5,37 90,36 88.5,36 C86.5,36 85,37 85,38.5 C85,41.5 90,40.5 90,42.5 C90,43 89.5,43.5 88,43.5 C86.5,43.5 85.5,43 85.5,43 L85,44 C85,44 86.5,45 88.5,45 C90.5,45 92,44 92,42.5 C92,39.5 87,40 87,38.5 C87,38 87,37.5 89,37.5 C90,37.5 91,38 91,38 L91.5,37 Z M99,39.5 C99,38 98,37.5 97,37.5 C95.5,37.5 95,38.5 95,39.5 L99,39.5 Z M93,40.5 C93,38 94,36 97,36 C99.5,36 101,38 101,40 L101,41 L95,41 C95,43 96.5,43.5 97.5,43.5 C99,43.5 99.5,42.5 99.5,42.5 L100.5,43.5 C100.5,43.5 99.5,45 97.5,45 C94.5,45 93,43 93,40.5 Z', stroke: 'none' }),
          _react2.default.createElement('path', { fill: '#01A982', d: 'M43,12 L83,12 L83,0 L43,0 L43,12 Z M46,3 L80,3 L80,9 L46,9 L46,3 Z', stroke: 'none' })
        )
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

Icon.displayName = 'BrandHpeStackCentered';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];