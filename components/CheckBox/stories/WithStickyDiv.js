"use strict";

exports.__esModule = true;
exports["default"] = exports.WithStickyDiv = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var boxStyle = {
  position: 'relative',
  display: 'block'
};
var titleBoxBackground = {
  color: 'light-2'
};
var titleBoxStyle = {
  position: 'sticky',
  top: 0
};
var checkboxes = Array(8).fill().map(function (_, i) {
  return "item " + (i + 1);
});
var removeItemFromArray = function removeItemFromArray(array, value) {
  return array.filter(function (item) {
    return item !== value;
  });
};
var WithStickyDiv = exports.WithStickyDiv = function WithStickyDiv() {
  var _useState = (0, _react.useState)([]),
    checks = _useState[0],
    setChecks = _useState[1];
  var onCheck = function onCheck(value) {
    return function (_ref) {
      var target = _ref.target;
      if (target.checked) {
        setChecks([].concat(checks, [value]));
      } else {
        setChecks(removeItemFromArray(checks, value));
      }
    };
  };
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "120px",
    width: "120px",
    overflow: "auto",
    style: boxStyle
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: titleBoxBackground,
    style: titleBoxStyle
  }, "Click & Scroll"), checkboxes.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      key: item,
      checked: checks.includes(item),
      label: item,
      onChange: onCheck(item)
    });
  })));
};
WithStickyDiv.storyName = 'With sticky div';
var _default = exports["default"] = {
  title: 'Input/CheckBox/With sticky div'
};