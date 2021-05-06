import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { Text } from '../Text';

const getBadgeDimension = (dimension, content, badgeContentRef, theme) => {
  if (
    typeof content === 'number' ||
    (typeof content === 'object' && content.value)
  ) {
    const borderWidth = content.border
      ? parseMetricToNum(theme.global.borderSize[content.border.size]) * 2
      : 0;
    // leave a small amount of horizontal space to pad content
    const horizontalPad =
      dimension === 'width'
        ? parseMetricToNum(
            theme.global.edgeSize[theme.button.badge.container.pad],
          )
        : 0;
    // if content is tall/wide, let badge grow to fit. otherwise,
    // make sure it's at least badge.size.medium dimensions
    return `${Math.max(
      Math.ceil(badgeContentRef.current.getBoundingClientRect()[dimension]) +
        horizontalPad +
        borderWidth,
      parseMetricToNum(theme.button.badge.size.medium) + borderWidth,
    )}px`;
  }
  return `${badgeContentRef.current.getBoundingClientRect()[dimension]}px`;
};

export const Badge = ({ children, content }) => {
  const theme = useContext(ThemeContext);
  const badgeContentRef = useRef();

  const defaultBadgeDimension =
    typeof content === 'boolean' ||
    (content && content.value && typeof content.value === 'boolean')
      ? // empty badge should be smaller. this value was chosen as a default
        // after experimenting with various values
        `${parseMetricToNum(theme.button.badge.size.medium) / 2}px`
      : theme.button.badge.size.medium;

  const [[width, height], setBadgeDimension] = useState([
    defaultBadgeDimension,
    defaultBadgeDimension,
  ]);

  // scale badge to fit its contents
  // width informs how far to horizontally offset the badge
  // height informs how far to vertically offset the badge
  useEffect(() => {
    if (
      badgeContentRef &&
      badgeContentRef.current &&
      typeof content !== 'boolean'
    ) {
      setBadgeDimension([
        getBadgeDimension('width', content, badgeContentRef, theme),
        getBadgeDimension('height', content, badgeContentRef, theme),
      ]);
    }
  }, [content, theme]);

  // offset the badge so it overlaps content. when badge has content,
  // offset should be 50%. when badge is empty, offset by a smaller amount to
  // keep the badge closer to the content. this value was chosen as a
  // reasonable default after testing with various grommet icons.
  const divisor =
    typeof content === 'boolean' || (content && content.value === true)
      ? 3.5
      : 2;
  const offset = {
    horizontal: `-${parseMetricToNum(width) / divisor}px`,
    vertical: `-${parseMetricToNum(height) / divisor}px`,
  };

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
          ref={badgeContentRef}
        >
          {value > max ? `${max}+` : value}
        </Text>
      );
    }
    badge = (
      <Box
        align="center"
        background={
          content.background || theme.button.badge.container.background
        }
        border={content.border || theme.button.badge.container.border}
        flex={false}
        height={height}
        justify="center"
        round
        width={width}
      >
        {badge}
      </Box>
    );
    // caller has provided their own JSX and we will just render that
  } else badge = <Box ref={badgeContentRef}>{content}</Box>;

  return (
    <Stack
      anchor="top-right"
      offset={{
        top: offset.vertical,
        bottom: offset.vertical,
        left: offset.horizontal,
        right: offset.horizontal,
      }}
    >
      {children}
      {badge}
    </Stack>
  );
};
