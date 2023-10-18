"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleActions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var actions = [{
  label: 'Get Started',
  primary: true
}, {
  label: 'Follow',
  secondary: true
}, {
  label: 'File Issue',
  secondary: true
}];
var controls = {
  small: /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.map(function (action) {
      return {
        label: action.label
      };
    }),
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null)
  }),
  medium: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_grommet.Button, actions[0]), /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
    dropAlign: {
      top: 'bottom',
      right: 'right'
    },
    items: actions.slice(1),
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null)
  })),
  large: actions.map(function (action) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, action);
  })
};
var MultipleActions = exports.MultipleActions = function MultipleActions() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        gap: "small",
        align: "center"
      }, controls[size]),
      parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        label: "Parent Page"
      })
    })))
    // </Grommet>
  );
};

MultipleActions.storyName = 'Multiple Actions';
var _default = exports["default"] = {
  title: 'Layout/PageHeader/Multiple Actions'
};