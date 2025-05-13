"use strict";

exports.__esModule = true;
exports.Badge = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _Box = require("../Box");
var _Stack = require("../Stack");
var _Text = require("../Text");
var _useThemeValue2 = require("../../utils/useThemeValue");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var StyledBadgeContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Badge__StyledBadgeContainer",
  componentId: "sc-1es4ws1-0"
})(["", ""], function (props) {
  return props.theme.button.badge.container.extend;
});
var Badge = exports.Badge = function Badge(_ref) {
  var children = _ref.children,
    content = _ref.content;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var containerRef = (0, _react.useRef)();
  var contentRef = (0, _react.useRef)();
  var stackRef = (0, _react.useRef)();
  var defaultBadgeDimension = typeof content === 'boolean' || content && content.value && typeof content.value === 'boolean' ? // empty badge should be smaller. this value was chosen as a default
  // after experimenting with various values
  (0, _utils.parseMetricToNum)(theme.button.badge.size.medium) / 2 + "px" : theme.button.badge.size.medium;

  // scale badge to fit its contents, leaving space horizontally
  // that is proportional to vertical space
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    // when window resizes and hits a responsive breakpoint, width of the badge
    // can change (because pad is responsive, etc.). we want to recalculate
    // width since badge offset is reliant on its dimensions.
    var onResize = function onResize() {
      if (containerRef != null && containerRef.current) {
        containerRef.current.style.minHeight = '';
        containerRef.current.style.minWidth = '';
        if (contentRef != null && contentRef.current) {
          if (typeof content === 'number' || typeof content === 'object' && content.value) {
            containerRef.current.style.minHeight = defaultBadgeDimension;
            containerRef.current.style.minWidth = defaultBadgeDimension;
            var _contentRef$current$g = contentRef.current.getBoundingClientRect(),
              contentHeight = _contentRef$current$g.height,
              contentWidth = _contentRef$current$g.width;

            // only adjust the width if contentHeight > 0
            // jest returns 0 for all getBoundingClientRect values,
            // so this ensures snapshots are closer to correct values
            if (contentHeight) {
              // height of content includes extra space around font from
              // line-height. account for this extra space with 2.5 multiplier
              // to add proportional horizontal space
              var height = defaultBadgeDimension;
              var width = defaultBadgeDimension;
              var verticalSpace = ((0, _utils.parseMetricToNum)(height) - contentHeight) * 2.5;
              containerRef.current.style.minHeight = height;
              containerRef.current.style.minWidth = Math.max((0, _utils.parseMetricToNum)(width), Math.ceil(contentWidth + verticalSpace)) + "px";
            }
          } else {
            // caller has provided custom JSX
            containerRef.current.style.minHeight = contentRef.current.getBoundingClientRect().width;
            containerRef.current.style.minWidth = contentRef.current.getBoundingClientRect().height;
          }
        } else {
          containerRef.current.style.minHeight = defaultBadgeDimension;
          containerRef.current.style.minWidth = defaultBadgeDimension;
        }
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, [content, defaultBadgeDimension]);

  // offset the badge so it overlaps content
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (stackRef != null && stackRef.current) {
      // when badge has content, offset should be 50%.
      // when badge is empty, offset by a smaller amount to keep the badge
      // closer to the content. this value was chosen as a reasonable default
      // after testing with various grommet icons.
      var offset = typeof content === 'boolean' || content && content.value === true ? '25%' : '50%';

      // second child of Stack is the div that receives absolute positioning
      // and contains our badge content
      stackRef.current.children[1].style.top = 0;
      stackRef.current.children[1].style.right = 0;
      // eslint-disable-next-line max-len
      stackRef.current.children[1].style.transform = "translate(" + offset + ", -" + offset + ")";
      stackRef.current.children[1].style.transformOrigin = '100% 0%';
    }
  }, [content]);
  var value;
  if (typeof content === 'number') value = content;else if (typeof content === 'object') value = content.value;
  var badge;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof content === 'boolean') {
    if (typeof value === 'number') {
      var max = content.max || 9;
      badge = /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: "text-strong",
        size: theme.button.badge.text.size.medium,
        weight: "normal",
        ref: contentRef
      }, value > max ? max + "+" : value);
    }
    badge = /*#__PURE__*/_react["default"].createElement(StyledBadgeContainer, _extends({
      ref: containerRef,
      align: "center",
      background: content.background || theme.button.badge.container.background,
      flex: false,
      justify: "center",
      round: true,
      pad: !(typeof value === 'boolean' || typeof content === 'boolean') ? theme.button.badge.container.pad : undefined
    }, passThemeFlag), badge);
    // caller has provided their own JSX and we will just render that
  } else badge = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: contentRef
  }, content);
  return /*#__PURE__*/_react["default"].createElement(_Stack.Stack, {
    ref: stackRef,
    anchor: "top-right"
  }, children, badge);
};