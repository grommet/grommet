"use strict";

exports.__esModule = true;
exports.useRoots = exports.RootsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// When toggling aria-hidden values, we only want to affect elements
// in the DOM that come from Grommet, so we track those elements in this
// context value. We also only want `trapFocus` to apply to the most recently
// opened Drop/Layer. See FocusedContainer.js
var RootsContext = exports.RootsContext = /*#__PURE__*/_react["default"].createContext(undefined);
var useRoots = exports.useRoots = function useRoots() {
  // If FocusedContainer is within Grommet React tree, there will be a value
  // from RootsContext. If not, set up a default value that can be passed
  // to drops that might open from within a drop.
  var defaultRoots = (0, _react.useRef)([]);
  var defaultValue = (0, _react.useMemo)(function () {
    return {
      roots: defaultRoots
    };
  }, []);
  var existingRoots = (0, _react.useContext)(RootsContext);
  return {
    contextValue: existingRoots || defaultValue,
    hasRoots: (existingRoots == null ? void 0 : existingRoots.roots) !== undefined
  };
};