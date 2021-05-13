import React, { useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';
var StyledBadgeContainer = styled(Box).withConfig({
  displayName: "Badge__StyledBadgeContainer",
  componentId: "sc-1es4ws1-0"
})(["", ""], function (props) {
  return props.theme.button.badge.container.extend;
});
export var Badge = function Badge(_ref) {
  var children = _ref.children,
      content = _ref.content;
  var theme = useContext(ThemeContext);
  var contentRef = useRef();
  var stackRef = useRef();
  var defaultBadgeDimension = typeof content === 'boolean' || content && content.value && typeof content.value === 'boolean' ? // empty badge should be smaller. this value was chosen as a default
  // after experimenting with various values
  parseMetricToNum(theme.button.badge.size.medium) / 2 + "px" : theme.button.badge.size.medium; // size should drive height, match width to height by default
  // allow width to grow when content is wide

  var _useState = useState(defaultBadgeDimension),
      height = _useState[0],
      setHeight = _useState[1];

  var _useState2 = useState(height),
      width = _useState2[0],
      setWidth = _useState2[1]; // scale badge to fit its contents, leaving space horizontally
  // that is proportional to vertical space


  useLayoutEffect(function () {
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
            var verticalSpace = (parseMetricToNum(height) - contentHeight) * 2.5;
            setWidth(Math.max(parseMetricToNum(width), Math.ceil(contentWidth + verticalSpace)) + "px");
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

  useLayoutEffect(function () {
    if (stackRef && stackRef.current) {
      // when badge has content, offset should be 50%.
      // when badge is empty, offset by a smaller amount to keep the badge
      // closer to the content. this value was chosen as a reasonable default
      // after testing with various grommet icons.
      var divisor = typeof content === 'boolean' || content && content.value === true ? 3.5 : 2;
      var offset = {
        right: "-" + Math.round(parseMetricToNum(width) / divisor) + "px",
        top: "-" + Math.round(parseMetricToNum(height) / divisor) + "px"
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
      badge = /*#__PURE__*/React.createElement(Text, {
        color: "text-strong",
        size: theme.button.badge.text.size.medium,
        weight: "normal",
        ref: contentRef
      }, value > max ? max + "+" : value);
    }

    badge = /*#__PURE__*/React.createElement(StyledBadgeContainer, {
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
  } else badge = /*#__PURE__*/React.createElement(Box, {
    ref: contentRef
  }, content);

  return /*#__PURE__*/React.createElement(Stack, {
    ref: stackRef,
    anchor: "top-right"
  }, children, badge);
};