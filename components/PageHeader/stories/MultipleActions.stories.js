"use strict";

exports.__esModule = true;
exports["default"] = exports.MultipleActions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

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