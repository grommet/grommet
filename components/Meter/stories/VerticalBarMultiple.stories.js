"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleValues = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var MultipleValues = exports.MultipleValues = function MultipleValues() {
  var total = 100;
  var _useState = (0, _react.useState)(0),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(''),
    label = _useState2[0],
    setLabel = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    highlight = _useState3[0],
    setHighlight = _useState3[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      type: "bar",
      background: "light-2",
      values: [{
        value: 50,
        onHover: function onHover(over) {
          setActive(over ? 50 : 0);
          setLabel(over ? 'in use' : undefined);
        },
        onClick: function onClick() {
          setHighlight(function () {
            return !highlight;
          });
        },
        highlight: highlight
      }, {
        value: 30,
        onHover: function onHover(over) {
          setActive(over ? 30 : 0);
          setLabel(over ? 'available' : undefined);
        }
      }],
      max: 100,
      size: "medium",
      thickness: "medium",
      direction: "vertical"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "center",
      pad: {
        bottom: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "xxlarge",
      weight: "bold"
    }, active || total), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "GB")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, label || 'total')))
    // </Grommet>
  );
};
MultipleValues.storyName = 'Vertical Bar Multiple';
var _default = exports["default"] = {
  title: 'Visualizations/Meter/Vertical Bar Multiple'
};