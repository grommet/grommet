"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleValues = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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