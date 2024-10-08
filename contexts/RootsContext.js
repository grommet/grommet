"use strict";

exports.__esModule = true;
exports.useRoots = exports.RootsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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