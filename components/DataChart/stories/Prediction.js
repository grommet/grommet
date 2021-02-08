"use strict";

exports.__esModule = true;
exports["default"] = exports.Prediction = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */
var keyFrameExampleOne = (0, _styledComponents.keyframes)(["0%{width:200px;background-color:#FFFFFF;}100%{width:0px;background-color:#FFFFFF;}"]);
var AnimatedBox = (0, _styledComponents["default"])(_grommet.Box).withConfig({
  displayName: "Prediction__AnimatedBox",
  componentId: "sc-2m8o8b-0"
})(["animation:", " 3s linear;"], keyFrameExampleOne);
var data = [];

for (var i = 0; i < 13; i += 1) {
  var v = -Math.sin(i / 2.0);
  var v2 = Math.cos(i / 2.0);
  data.push({
    date: "2020-07-" + (i % 30 + 1).toString().padStart(2, 0),
    amount: Math.floor(v * 100),
    need: Math.floor(v2 * 10)
  });
}

for (var _i = 0; _i < 13; _i += 1) {
  var _v = -Math.sin(_i / 2.0);

  var _v2 = Math.cos(_i / 2.0);

  data.push({
    date: "2020-08-" + (_i % 30 + 1).toString().padStart(2, 0),
    amountPredicted: Math.floor(_v * 100),
    needPredicted: Math.floor(_v2 * 10)
  });
}

var Prediction = function Prediction() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Stack, {
    anchor: "top-right",
    interactiveChild: "first"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataChart, {
    data: data,
    series: ['date', {
      property: 'amount',
      label: 'Amount'
    }, {
      property: 'need',
      label: 'Demand'
    }, {
      property: 'amountPredicted',
      label: 'Predicted Amount'
    }, {
      property: 'needPredicted'
    }],
    chart: [{
      property: 'amount',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'amount',
      type: 'line',
      thickness: 'xsmall',
      round: true
    }, {
      property: 'amountPredicted',
      type: 'area',
      thickness: 'xsmall',
      color: 'graph-3',
      opacity: 'medium'
    }, {
      property: 'amountPredicted',
      type: 'line',
      thickness: 'xsmall',
      round: true,
      dash: true
    }, {
      property: 'amountPredicted',
      type: 'point',
      thickness: 'small',
      point: 'circle'
    }, {
      property: 'amount',
      type: 'point',
      thickness: 'small'
    }, // {
    //   property: 'needPredicted',
    //   type: 'line',
    //   thickness: 'xxsmall',
    //   round: true,
    //   dash: true,
    // },
    {
      property: 'need',
      type: 'line',
      thickness: 'xxsmall',
      dash: true,
      round: true
    }, {
      property: 'need',
      type: 'point',
      thickness: 'small'
    }],
    axis: {
      x: 'date',
      y: {
        property: 'amount',
        granularity: 'medium'
      }
    },
    guide: {
      y: {
        granularity: 'fine'
      },
      x: {
        granularity: 'fine'
      }
    },
    gap: "medium",
    pad: "small",
    legend: true,
    detail: true
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    width: "small",
    height: "small",
    border: [{
      side: 'left',
      size: 'medium'
    }],
    background: {
      color: '#FFFFFF',
      opacity: 0.4
    }
  }), /*#__PURE__*/_react["default"].createElement(AnimatedBox, {
    width: "small",
    height: "small"
  }))));
};

exports.Prediction = Prediction;
var _default = {
  title: 'Visualizations/DataChart/Prediction'
};
exports["default"] = _default;