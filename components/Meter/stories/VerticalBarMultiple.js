"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleValues = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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