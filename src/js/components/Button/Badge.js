import React, { useContext, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { useLayoutEffect } from '../../utils/use-isomorphic-layout-effect';

import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';

const StyledBadgeContainer = styled(Box)`
  ${props => props.theme.button.badge.container.extend}
`;

export const Badge = ({ children, content }) => {
  const theme = useContext(ThemeContext);
  const contentRef = useRef();
  const stackRef = useRef();

  const defaultBadgeDimension =
    typeof content === 'boolean' ||
    (content && content.value && typeof content.value === 'boolean')
      ? // empty badge should be smaller. this value was chosen as a default
        // after experimenting with various values
        `${parseMetricToNum(theme.button.badge.size.medium) / 2}px`
      : theme.button.badge.size.medium;

  // size should drive height, match width to height by default
  // allow width to grow when content is wide
  const [height, setHeight] = useState(defaultBadgeDimension);
  const [width, setWidth] = useState(height);

  // scale badge to fit its contents, leaving space horizontally
  // that is proportional to vertical space
  useLayoutEffect(() => {
    // when window resizes and hits a responsive breakpoint, width of the badge
    // can change (because pad is responsive, etc.). we want to recalculate
    // width since badge offset is reliant on its dimensions.
    const onResize = () => {
      if (contentRef && contentRef.current) {
        if (
          typeof content === 'number' ||
          (typeof content === 'object' && content.value)
        ) {
          const {
            height: contentHeight,
            width: contentWidth,
          } = contentRef.current.getBoundingClientRect();

          // only adjust the width if contentHeight > 0
          // jest returns 0 for all getBoundingClientRect values,
          // so this ensures snapshots are closer to correct values
          if (contentHeight) {
            // height of content includes extra space around font from
            // line-height. account for this extra space with 2.5 multiplier
            // to add proportional horizontal space
            const verticalSpace =
              (parseMetricToNum(height) - contentHeight) * 2.5;

            setWidth(
              `${Math.max(
                parseMetricToNum(width),
                Math.ceil(contentWidth + verticalSpace),
              )}px`,
            );
          }
        } else {
          // caller has provided custom JSX
          setWidth(`${contentRef.current.getBoundingClientRect().width}px`);
          setHeight(`${contentRef.current.getBoundingClientRect().height}px`);
        }
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [content, height, width]);

  // offset the badge so it overlaps content
  useLayoutEffect(() => {
    if (stackRef && stackRef.current) {
      // when badge has content, offset should be 50%.
      // when badge is empty, offset by a smaller amount to keep the badge
      // closer to the content. this value was chosen as a reasonable default
      // after testing with various grommet icons.
      const divisor =
        typeof content === 'boolean' || (content && content.value === true)
          ? 3.5
          : 2;
      const offset = {
        right: `-${Math.round(parseMetricToNum(width) / divisor)}px`,
        top: `-${Math.round(parseMetricToNum(height) / divisor)}px`,
      };
      // second child of Stack is the div that receives absolute positioning
      // and contains our badge content
      stackRef.current.children[1].style.top = offset.top;
      stackRef.current.children[1].style.right = offset.right;
    }
  }, [content, height, width]);

  let value;
  if (typeof content === 'number') value = content;
  else if (typeof content === 'object') value = content.value;

  let badge;
  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof content === 'boolean'
  ) {
    if (typeof value === 'number') {
      const max = content.max || 9;
      badge = (
        <Text
          color="text-strong"
          size={theme.button.badge.text.size.medium}
          weight="normal"
          ref={contentRef}
        >
          {value > max ? `${max}+` : value}
        </Text>
      );
    }
    badge = (
      <StyledBadgeContainer
        align="center"
        background={
          content.background || theme.button.badge.container.background
        }
        flex={false}
        height={{ min: height }}
        justify="center"
        round
        pad={
          !(typeof value === 'boolean' || typeof content === 'boolean')
            ? theme.button.badge.container.pad
            : undefined
        }
        width={{ min: width }}
      >
        {badge}
      </StyledBadgeContainer>
    );
    // caller has provided their own JSX and we will just render that
  } else badge = <Box ref={contentRef}>{content}</Box>;

  return (
    <Stack ref={stackRef} anchor="top-right">
      {children}
      {badge}
    </Stack>
  );
};
