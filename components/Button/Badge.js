"use strict";

exports.__esModule = true;
exports.Badge = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _utils = require("../../utils");

var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");

var _Box = require("../Box");

var _Stack = require("../Stack");

var _Text = require("../Text");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var StyledBadgeContainer = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Badge__StyledBadgeContainer",
  componentId: "sc-1es4ws1-0"
})(["", ""], function (props) {
  return props.theme.button.badge.container.extend;
});

var Badge = function Badge(_ref) {
  var children = _ref.children,
      content = _ref.content;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);
  var contentRef = (0, _react.useRef)();
  var stackRef = (0, _react.useRef)();
  var defaultBadgeDimension = typeof content === 'boolean' || content && content.value && typeof content.value === 'boolean' ? // empty badge should be smaller. this value was chosen as a default
  // after experimenting with various values
  (0, _utils.parseMetricToNum)(theme.button.badge.size.medium) / 2 + "px" : theme.button.badge.size.medium; // size should drive height, match width to height by default
  // allow width to grow when content is wide

  var _useState = (0, _react.useState)(defaultBadgeDimension),
      height = _useState[0],
      setHeight = _useState[1];

  var _useState2 = (0, _react.useState)(height),
      width = _useState2[0],
      setWidth = _useState2[1]; // scale badge to fit its contents, leaving space horizontally
  // that is proportional to vertical space


  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    // when window resizes and hits a responsive breakpoint, width of the badge
    // can change (because pad is responsive, etc.). we want to recalculate
    // width since badge offset is reliant on its dimensions.
    var onResize = function onResize() {
      if (contentRef && contentRef.current) {
        if (typeof content === 'number' || typeof content === 'object' && content.value) {
          var _contentRef$current$g = contentRef.current.getBoundingClientRect(),
              contentHeight = _contentRef$current$g.height,
              contentWidth = _contentRef$current$g.width; // only adjust the width if contentHeight > 0
          // jest returns 0 for all getBoundingClientRect values,
          // so this ensures snapshots are closer to correct values


          if (contentHeight) {
            // height of content includes extra space around font from
            // line-height. account for this extra space with 2.5 multiplier
            // to add proportional horizontal space
            var verticalSpace = ((0, _utils.parseMetricToNum)(height) - contentHeight) * 2.5;
            setWidth(Math.max((0, _utils.parseMetricToNum)(width), Math.ceil(contentWidth + verticalSpace)) + "px");
          }
        } else {
          // caller has provided custom JSX
          setWidth(contentRef.current.getBoundingClientRect().width + "px");
          setHeight(contentRef.current.getBoundingClientRect().height + "px");
        }
      }
    };

    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, [content, height, width]); // offset the badge so it overlaps content

  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (stackRef && stackRef.current) {
      // when badge has content, offset should be 50%.
      // when badge is empty, offset by a smaller amount to keep the badge
      // closer to the content. this value was chosen as a reasonable default
      // after testing with various grommet icons.
      var divisor = typeof content === 'boolean' || content && content.value === true ? 3.5 : 2;
      var offset = {
        right: "-" + Math.round((0, _utils.parseMetricToNum)(width) / divisor) + "px",
        top: "-" + Math.round((0, _utils.parseMetricToNum)(height) / divisor) + "px"
      }; // second child of Stack is the div that receives absolute positioning
      // and contains our badge content

      stackRef.current.children[1].style.top = offset.top;
      stackRef.current.children[1].style.right = offset.right;
    }
  }, [content, height, width]);
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

    badge = /*#__PURE__*/_react["default"].createElement(StyledBadgeContainer, {
      align: "center",
      background: content.background || theme.button.badge.container.background,
      flex: false,
      height: {
        min: height
      },
      justify: "center",
      round: true,
      pad: !(typeof value === 'boolean' || typeof content === 'boolean') ? theme.button.badge.container.pad : undefined,
      width: {
        min: width
      }
    }, badge); // caller has provided their own JSX and we will just render that
  } else badge = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    ref: contentRef
  }, content);

  return /*#__PURE__*/_react["default"].createElement(_Stack.Stack, {
    ref: stackRef,
    anchor: "top-right"
  }, children, badge);
};

exports.Badge = Badge;