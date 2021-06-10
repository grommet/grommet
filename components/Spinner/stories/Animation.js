"use strict";

exports.__esModule = true;
exports["default"] = exports.Animation = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable max-len */
var gradient = 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)';
var gradientRainbow = 'radial-gradient(circle at 50% -3.03%, #ff99ff 0, #ff91ff 3.33%, #ff8bf9 6.67%, #ff86e4 10%, #ff85cf 13.33%, #ff85b9 16.67%, #ff89a4 20%, #ff8f90 23.33%, #ff967d 26.67%, #ff9e6a 30%, #ffa758 33.33%, #ffb047 36.67%, #ffb937 40%, #ffc228 43.33%, #ffca1a 46.67%, #f8d110 50%, #e5d812 53.33%, #d0de1f 56.67%, #bae32f 60%, #a2e840 63.33%, #87ec52 66.67%, #67ef65 70%, #36f279 73.33%, #00f48e 76.67%, #00f6a3 80%, #00f7b9 83.33%, #00f8cf 86.67%, #00f9e5 90%, #00f9fb 93.33%, #00f9ff 96.67%, #00f8ff 100%);';
var BounceSpinner = (0, _styledComponents["default"])(_grommet.Spinner).withConfig({
  displayName: "Animation__BounceSpinner",
  componentId: "sc-1048bqa-0"
})(["animation-name:bounce-1;animation-timing-function:ease;animation-duration:2s;animation-iteration-count:infinite;@keyframes bounce-1{0%{transform:translateY(0);}50%{transform:translateY(-100px);}100%{transform:translateY(0);}}"]);

var Animation = function Animation() {
  var _useState = (0, _react.useState)(0),
      meterValue = _useState[0],
      setMeterValue = _useState[1];

  (0, _react.useEffect)(function () {
    var timer = setInterval(function () {
      if (meterValue < 100) setMeterValue(meterValue + 0.02);
    });
    return function () {
      clearTimeout(timer);
    };
  }, [meterValue]);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gap: "xlarge",
    pad: {
      vertical: 'xlarge',
      horizontal: 'large'
    },
    margin: "xlarge"
  }, /*#__PURE__*/_react["default"].createElement(BounceSpinner, {
    background: gradientRainbow,
    border: false,
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    background: gradient,
    size: "large",
    animation: [{
      type: 'fadeIn',
      duration: 1900,
      size: 'large'
    }, {
      type: 'pulse',
      duration: 1450,
      size: 'large'
    }],
    border: false
  })));
};

exports.Animation = Animation;
Animation.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Spinner/Animation'
};
exports["default"] = _default;