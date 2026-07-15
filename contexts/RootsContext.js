"use strict";

exports.__esModule = true;
exports.useRoots = exports.RootsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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