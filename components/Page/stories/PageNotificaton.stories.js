"use strict";

exports.__esModule = true;
exports["default"] = exports.PageNotification = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PageNotification = exports.PageNotification = function PageNotification() {
  var _useState = (0, _react.useState)('narrow'),
    kind = _useState[0],
    setKind = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, {
      pad: {
        vertical: 'medium'
      },
      kind: kind,
      background: "background-back"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, {
      background: "background-front"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      pad: {
        vertical: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      margin: "none"
    }, kind.slice(0, 1).toUpperCase() + kind.slice(1), " Page"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      align: "end"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Wide",
      onClick: function onClick() {
        return setKind('wide');
      },
      primary: kind === 'wide',
      color: kind === 'wide' ? 'background-back' : undefined
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Narrow",
      onClick: function onClick() {
        return setKind('narrow');
      },
      primary: kind === 'narrow',
      color: kind === 'narrow' ? 'background-back' : undefined
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Full",
      onClick: function onClick() {
        return setKind('full');
      },
      primary: kind === 'full',
      color: kind === 'full' ? 'background-back' : undefined
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "critical",
      message: "Page level notification.",
      onClose: function onClose() {
        return console.log('close notification');
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt."), /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      rows: "small",
      columns: {
        count: 'fit',
        size: 'small'
      },
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      background: "white",
      pad: "large"
    }, "Card"), /*#__PURE__*/_react["default"].createElement(_grommet.Card, {
      background: "white",
      pad: "large"
    }, "Card")), /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo gravida tincidunt. Nunc fringilla blandit tortor, id accumsan nisi dictum quis. Aenean porttitor at mi id semper. Donec mattis bibendum leo, interdum ullamcorper lectus ultrices vel. Fusce nec enim faucibus nunc porta egestas. Fusce dapibus lobortis tincidunt.")))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Layout/Page/Page Notification'
};