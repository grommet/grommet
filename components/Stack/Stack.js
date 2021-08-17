"use strict";

exports.__esModule = true;
exports.Stack = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledStack = require("./StyledStack");

var _propTypes = require("./propTypes");

var _excluded = ["anchor", "children", "fill", "guidingChild", "interactiveChild"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Stack = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var anchor = _ref2.anchor,
      children = _ref2.children,
      fill = _ref2.fill,
      guidingChild = _ref2.guidingChild,
      interactiveChild = _ref2.interactiveChild,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded);

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
  }, rest), styledChildren);
});
exports.Stack = Stack;
Stack.displayName = 'Stack';
Stack.propTypes = _propTypes.StackPropTypes;