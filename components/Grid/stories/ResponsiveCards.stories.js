"use strict";

exports.__esModule = true;
exports["default"] = exports.Example = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var cards = Array(20).fill()
// eslint-disable-next-line react/no-array-index-key
.map(function (_, i) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    key: i
  }, "Card " + i);
});
var Example = exports.Example = function Example() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: size !== 'small' ? 'small' : '100%',
      gap: "small"
    }, cards.map(function (card, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react["default"].createElement(_grommet.Card, {
          pad: "large",
          key: index
        }, card)
      );
    })))
    // </Grommet>
  );
};
Example.storyName = 'Responsive cards';
var _default = exports["default"] = {
  title: 'Layout/Grid/Responsive cards'
};