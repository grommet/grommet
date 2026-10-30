"use strict";

exports.__esModule = true;
exports["default"] = exports.Prediction = void 0;
var _react = _interopRequireDefault(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var keyFrameExampleOne = (0, _styledComponents.keyframes)(["0%{width:200px;background-color:#FFFFFF;}100%{width:0px;background-color:#FFFFFF;}"]);
var AnimatedBox = (0, _styledComponents["default"])(_grommet.Box).withConfig({
  displayName: "Predictionstories__AnimatedBox",
  componentId: "sc-1lajsyc-0"
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
var Prediction = exports.Prediction = function Prediction() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
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
      },
      // {
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
    })))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/DataChart/Prediction'
};