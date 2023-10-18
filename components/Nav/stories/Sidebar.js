"use strict";

exports.__esModule = true;
exports["default"] = exports.Sidebar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _excluded = ["label"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Button, _extends({
    plain: true
  }, rest), function (_ref2) {
    var hover = _ref2.hover;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: hover ? 'teal' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "large"
    }, label));
  });
};
var SidebarNav = function SidebarNav() {
  var _useState = (0, _react.useState)(),
    active = _useState[0],
    setActive = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Nav, {
      background: "brand"
    }, ['Dashboard', 'Devices', 'Settings'].map(function (label) {
      return /*#__PURE__*/_react["default"].createElement(SidebarButton, {
        key: label,
        label: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          color: "white"
        }, label),
        active: label === active,
        onClick: function onClick() {
          return setActive(label);
        }
      });
    })))
    // </Grommet>
  );
};

var Sidebar = exports.Sidebar = function Sidebar() {
  return /*#__PURE__*/_react["default"].createElement(SidebarNav, null);
};
Sidebar.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Controls/Nav/Sidebar'
};