"use strict";

exports.__esModule = true;
exports.Stack = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledStack = require("./StyledStack");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["anchor", "children", "fill", "guidingChild", "interactiveChild"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var buildStyledChildren = function buildStyledChildren(_ref) {
  var anchor = _ref.anchor,
    fill = _ref.fill,
    guidingIndex = _ref.guidingIndex,
    interactiveChild = _ref.interactiveChild,
    interactiveIndex = _ref.interactiveIndex;
  return function (child, index) {
    var interactive = interactiveChild === undefined || interactiveIndex === index;
    var isGuidingIndex = index === guidingIndex;
    var props = isGuidingIndex ? {
      guiding: true,
      fillContainer: fill
    } : {
      anchor: anchor
    };
    return /*#__PURE__*/_react["default"].createElement(_StyledStack.StyledStackLayer, _extends({
      key: index,
      interactive: interactive
    }, props), child);
  };
};
var Stack = exports.Stack = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var anchor = _ref2.anchor,
    children = _ref2.children,
    fill = _ref2.fill,
    guidingChild = _ref2.guidingChild,
    interactiveChild = _ref2.interactiveChild,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var prunedChildren = _react.Children.toArray(children).filter(function (c) {
    return c;
  });
  var toChildIndex = function toChildIndex(child) {
    var index = child;
    if (index === 'first' || !index) index = 0;else if (index === 'last') index = prunedChildren.length - 1;
    return index;
  };
  var guidingIndex = toChildIndex(guidingChild);
  var interactiveIndex = interactiveChild && toChildIndex(interactiveChild);
  var styledChildren = prunedChildren.map(buildStyledChildren({
    anchor: anchor,
    fill: fill,
    guidingIndex: guidingIndex,
    interactiveChild: interactiveChild,
    interactiveIndex: interactiveIndex
  }));
  return /*#__PURE__*/_react["default"].createElement(_StyledStack.StyledStack, _extends({
    ref: ref,
    fillContainer: fill
  }, passThemeFlag, rest), styledChildren);
});
Stack.displayName = 'Stack';
Stack.propTypes = _propTypes.StackPropTypes;