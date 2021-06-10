"use strict";

exports.__esModule = true;
exports.YAxis = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _Box = require("../Box");

var _Chart = require("../Chart");

var _utils = require("./utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var YAxis = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var chartProps = _ref.chartProps,
      pad = _ref.pad,
      renderValue = _ref.renderValue,
      _ref$serie = _ref.serie,
      serie = _ref$serie === void 0 ? {} : _ref$serie;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var render = serie.render,
      suffix = serie.suffix; // pull the x-axis values from the first chart, all should have the same

  var _axis = (Array.isArray(chartProps[0]) ? chartProps[0][0] : chartProps[0]).axis,
      axisValues = _axis[1];
  var divideBy;
  var unit;

  if (!render && !suffix) {
    // figure out how many digits to show
    var maxValue = Math.max.apply(Math, axisValues.map(function (v) {
      return Math.abs(v);
    }));

    if (maxValue > 10000000) {
      divideBy = 1000000;
      unit = 'M';
    } else if (maxValue > 10000) {
      divideBy = 1000;
      unit = 'K';
    }
  } // Set basis to match double the vertical pad, so we can align the
  // text with the guides


  var edgeSize = _utils.doublePad[pad.vertical || pad];
  var basis = theme.global.edgeSize[edgeSize] || edgeSize;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: ref,
    gridArea: "yAxis",
    justify: "between",
    flex: true
  }, axisValues.map(function (axisValue, i) {
    var content = renderValue(serie, undefined, axisValue);

    if (content === axisValue) {
      if (divideBy) content = (0, _Chart.round)(content / divideBy, 0);
      if (unit) content = "" + content + unit;
    }

    return /*#__PURE__*/_react["default"].createElement(_Box.Box // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      align: "end",
      basis: basis,
      flex: "shrink",
      justify: basis ? 'center' : undefined
    }, content);
  }));
});
exports.YAxis = YAxis;