"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleActions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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