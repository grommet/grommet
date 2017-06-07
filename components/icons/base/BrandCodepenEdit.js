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


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-brand-codepen-edit', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'brand-codepen-edit');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 312 137', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fillRule: 'evenodd', d: 'M312,125 C312,131.627 306.627,137 300,137 L12,137 C5.373,137 0,131.627 0,125 L0,12 C0,5.373 5.373,0 12,0 L300,0 C306.627,0 312,5.373 312,12 L312,125 L312,125 Z M52.22,79.064 C54.916,79.064 57.388,80.039 59.306,81.65 L61.916,78.539 C59.292,76.333 55.909,75.001 52.22,75.001 C43.898,75.001 37.127,81.772 37.127,90.094 C37.127,98.416 43.898,105.188 52.22,105.188 C55.909,105.188 59.292,103.856 61.916,101.649 L59.306,98.54 C57.388,100.151 54.916,101.125 52.22,101.125 C46.139,101.125 41.191,96.177 41.191,90.097 C41.191,84.014 46.139,79.064 52.22,79.064 L52.22,79.064 Z M135.772,75.873 L127.645,75.873 C126.523,75.873 125.613,76.783 125.613,77.904 L125.613,102.285 C125.613,103.408 126.523,104.316 127.645,104.316 L135.772,104.316 C143.614,104.316 149.994,97.937 149.994,90.092 C149.994,82.251 143.614,75.873 135.772,75.873 L135.772,75.873 Z M135.772,100.254 L129.676,100.254 L129.676,79.938 L135.772,79.938 C141.374,79.938 145.932,84.496 145.932,90.096 C145.932,95.697 141.373,100.254 135.772,100.254 L135.772,100.254 Z M160.995,77.904 L160.995,102.285 C160.995,103.408 161.905,104.316 163.027,104.316 L179.959,104.316 L179.959,100.253 L165.061,100.253 L165.061,92.126 L174.541,92.126 L174.541,88.063 L165.061,88.063 L165.061,79.936 L179.959,79.936 L179.959,75.874 L163.027,75.874 C161.906,75.873 160.995,76.783 160.995,77.904 L160.995,77.904 Z M222.498,77.904 L222.498,102.285 C222.498,103.408 223.406,104.316 224.529,104.316 L241.461,104.316 L241.461,100.253 L226.563,100.253 L226.563,92.126 L236.043,92.126 L236.043,88.063 L226.563,88.063 L226.563,79.936 L241.461,79.936 L241.461,75.874 L224.529,75.874 C223.408,75.873 222.498,76.783 222.498,77.904 L222.498,77.904 Z M203.16,75.873 L194.355,75.873 C193.234,75.873 192.324,76.783 192.324,77.904 L192.324,104.318 L196.386,104.318 L196.386,92.127 L203.158,92.127 C207.637,92.127 211.285,88.481 211.285,84 C211.285,79.519 207.643,75.873 203.16,75.873 L203.16,75.873 Z M203.16,88.062 L196.389,88.062 L196.389,79.935 L203.16,79.935 C205.402,79.935 207.222,81.756 207.222,83.997 C207.225,86.241 205.402,88.062 203.16,88.062 L203.16,88.062 Z M273.227,75.873 L273.227,96.674 L256.501,76.604 C255.952,75.946 255.053,75.704 254.247,75.996 C253.442,76.288 252.907,77.051 252.907,77.905 L252.907,104.319 L256.97,104.319 L256.97,83.518 L273.696,103.587 C274.092,104.061 274.665,104.318 275.258,104.318 C275.489,104.318 275.725,104.277 275.948,104.195 C276.754,103.904 277.29,103.14 277.29,102.285 L277.29,75.873 L273.227,75.873 L273.227,75.873 Z M114.071,83.168 C114.061,83.115 114.051,83.063 114.038,83.012 C114.03,82.981 114.018,82.952 114.009,82.921 C113.994,82.875 113.98,82.83 113.962,82.785 C113.948,82.754 113.935,82.724 113.92,82.695 C113.899,82.652 113.879,82.611 113.857,82.57 C113.839,82.542 113.822,82.513 113.803,82.484 C113.779,82.445 113.752,82.409 113.725,82.372 C113.704,82.346 113.683,82.318 113.661,82.292 C113.632,82.257 113.6,82.225 113.569,82.191 C113.544,82.166 113.52,82.142 113.494,82.118 C113.461,82.087 113.425,82.058 113.389,82.029 C113.362,82.008 113.334,81.986 113.305,81.966 C113.295,81.958 113.285,81.949 113.274,81.944 L93.464,68.737 C92.838,68.319 92.024,68.319 91.399,68.737 L71.586,81.941 C71.575,81.949 71.566,81.958 71.556,81.963 C71.527,81.984 71.499,82.005 71.471,82.026 C71.435,82.053 71.4,82.084 71.366,82.115 C71.341,82.137 71.316,82.162 71.292,82.186 C71.26,82.219 71.23,82.252 71.199,82.289 C71.177,82.313 71.156,82.342 71.136,82.369 C71.108,82.406 71.082,82.442 71.057,82.481 C71.039,82.51 71.021,82.539 71.004,82.567 C70.981,82.608 70.96,82.649 70.941,82.69 C70.926,82.721 70.913,82.752 70.899,82.782 C70.881,82.826 70.866,82.872 70.851,82.918 C70.841,82.949 70.83,82.98 70.823,83.011 C70.809,83.062 70.8,83.113 70.79,83.165 C70.785,83.19 70.779,83.22 70.775,83.245 C70.764,83.326 70.758,83.406 70.758,83.489 L70.758,96.696 C70.758,96.776 70.764,96.858 70.775,96.938 C70.779,96.964 70.785,96.993 70.79,97.018 C70.8,97.072 70.81,97.122 70.823,97.173 C70.831,97.204 70.842,97.233 70.851,97.264 C70.866,97.311 70.881,97.356 70.899,97.401 C70.913,97.432 70.926,97.463 70.941,97.493 C70.961,97.535 70.981,97.576 71.004,97.617 C71.021,97.645 71.039,97.675 71.057,97.703 C71.082,97.742 71.108,97.778 71.136,97.815 C71.157,97.842 71.177,97.87 71.199,97.895 C71.229,97.93 71.26,97.962 71.292,97.998 C71.316,98.022 71.341,98.047 71.366,98.069 C71.4,98.1 71.435,98.13 71.471,98.158 C71.499,98.179 71.527,98.202 71.556,98.221 C71.567,98.229 71.576,98.239 71.586,98.243 L91.397,111.45 C91.709,111.659 92.069,111.763 92.429,111.763 C92.789,111.763 93.15,111.659 93.462,111.45 L113.272,98.243 C113.284,98.236 113.293,98.226 113.303,98.221 C113.332,98.2 113.36,98.178 113.387,98.158 C113.423,98.13 113.459,98.1 113.492,98.069 C113.518,98.047 113.542,98.022 113.567,97.998 C113.598,97.965 113.629,97.933 113.659,97.895 C113.681,97.87 113.703,97.842 113.723,97.815 C113.75,97.778 113.777,97.742 113.801,97.703 C113.82,97.675 113.837,97.645 113.855,97.617 C113.877,97.576 113.898,97.535 113.918,97.493 C113.933,97.463 113.946,97.432 113.96,97.401 C113.978,97.356 113.992,97.311 114.007,97.264 C114.017,97.233 114.028,97.204 114.036,97.173 C114.05,97.122 114.059,97.07 114.069,97.018 C114.073,96.993 114.08,96.964 114.084,96.938 C114.094,96.858 114.101,96.776 114.101,96.696 L114.101,83.49 C114.101,83.407 114.094,83.327 114.084,83.246 C114.081,83.223 114.075,83.195 114.071,83.168 L114.071,83.168 Z M92.429,94.501 L85.842,90.096 L92.429,85.69 L99.017,90.096 L92.429,94.501 L92.429,94.501 Z M90.567,82.454 L82.492,87.855 L75.974,83.495 L90.567,73.766 L90.567,82.454 L90.567,82.454 Z M79.142,90.096 L74.482,93.212 L74.482,86.979 L79.142,90.096 L79.142,90.096 Z M82.492,92.336 L90.567,97.736 L90.567,106.424 L75.974,96.695 L82.492,92.336 L82.492,92.336 Z M94.291,97.736 L102.366,92.336 L108.885,96.695 L94.291,106.424 L94.291,97.736 L94.291,97.736 L94.291,97.736 Z M105.717,90.096 L110.377,86.979 L110.377,93.211 L105.717,90.096 L105.717,90.096 Z M102.367,87.854 L94.292,82.455 L94.292,73.767 L108.886,83.496 L102.367,87.854 L102.367,87.854 Z M97.999,28.261 L84.337,28.261 L84.337,35.908 L96.56,35.908 L96.56,38.212 L84.337,38.212 L84.337,46.052 L98.16,46.052 L98.16,48.356 L81.809,48.356 L81.809,25.957 L97.999,25.957 L97.999,28.261 L97.999,28.261 Z M113.328,48.355 L105.553,48.355 L105.553,25.957 L113.328,25.957 C120.368,25.957 125.231,30.789 125.231,37.124 C125.231,43.46 120.368,48.355 113.328,48.355 L113.328,48.355 Z M113.328,28.293 L108.08,28.293 L108.08,46.02 L113.328,46.02 C118.992,46.02 122.607,42.18 122.607,37.189 C122.608,32.196 118.992,28.293 113.328,28.293 L113.328,28.293 Z M135.632,25.957 L135.632,48.355 L133.104,48.355 L133.104,25.957 L135.632,25.957 L135.632,25.957 Z M152.975,48.355 L150.415,48.355 L150.415,28.293 L142.894,28.293 L142.894,25.957 L160.494,25.957 L160.494,28.293 L152.974,28.293 L152.974,48.355 L152.975,48.355 L152.975,48.355 Z M189.84,48.739 C183.025,48.739 178.447,43.395 178.447,37.188 C178.447,30.98 183.088,25.573 189.902,25.573 C196.718,25.573 201.294,30.917 201.294,37.124 C201.294,43.332 196.654,48.739 189.84,48.739 L189.84,48.739 Z M189.84,27.909 C184.719,27.909 181.072,32.005 181.072,37.124 C181.072,42.244 184.783,46.403 189.902,46.403 C195.021,46.403 198.67,42.307 198.67,37.188 C198.67,32.068 194.959,27.909 189.84,27.909 L189.84,27.909 Z M225.422,25.957 L227.887,25.957 L227.887,48.355 L225.871,48.355 L211.408,29.989 L211.408,48.355 L208.943,48.355 L208.943,25.957 L211.31,25.957 L225.421,43.908 L225.421,25.957 L225.422,25.957 L225.422,25.957 Z' })
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

Icon.displayName = 'BrandCodepenEdit';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];