import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

// Add visually hidden input styles
const VisuallyHiddenInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
`;

const DIRECTION_PROPS = {
  horizontal: {
    cursor: 'col-resize',
    fill: 'vertical',
  },
  vertical: {
    cursor: 'row-resize',
    fill: 'horizontal',
  },
};

const StyledBox = styled(Box)`
  ${(props) => props.focus && focusStyle()}
`;

const EdgeControl = forwardRef(
  (
    {
      color,
      direction,
      edge,
      onDecrease,
      onIncrease,
      thickness,
      max,
      min,
      value,
      step,

      ...rest
    },
    ref,
  ) => {
    const { theme } = useThemeValue();
    const [focus, setFocus] = useState(false);
    const { cursor, fill } = DIRECTION_PROPS[direction];
    const themeEdgeSize = theme.rangeSelector?.edge?.size;
    let size;
    if (themeEdgeSize) {
      // Try to look up the value in theme.global.edgeSize
      // If not found, assume it's a raw CSS value like '10px'.
      const themeEdge = theme.global.edgeSize?.[themeEdgeSize] || themeEdgeSize;
      const parsedSize = parseMetricToNum(themeEdge);
      const isValid =
        typeof parsedSize === 'number' && !Number.isNaN(parsedSize);

      // If parsedSize is a valid number, use it.
      // Otherwise, fallback to half of the theme's global spacing.
      size = isValid ? parsedSize : parseMetricToNum(theme.global.spacing) / 2;
    } else {
      // If no edge size was specified use default.
      size = parseMetricToNum(theme.global.spacing) / 2;
    }
    const keyboardProps =
      direction === 'vertical'
        ? { onUp: onDecrease, onDown: onIncrease }
        : { onLeft: onDecrease, onRight: onIncrease };
    const boxDirection = direction === 'vertical' ? 'row' : 'column';
    const type =
      (theme.rangeSelector &&
        theme.rangeSelector.edge &&
        theme.rangeSelector.edge.type) ||
      'disc';

    let node;
    const backgroundColor = normalizeColor(color || 'control', theme);
    if (type === 'bar') {
      node = (
        <StyledBox
          flex={!thickness}
          justifySelf="stretch"
          width={direction === 'vertical' ? thickness : `${size}px`}
          height={direction === 'vertical' ? `${size}px` : thickness}
          background={backgroundColor}
          focus={focus}
        />
      );
    } else if (type === 'disc') {
      node = (
        <StyledBox
          width={`${size}px`}
          height={`${size}px`}
          round="full"
          background={backgroundColor}
          focus={focus}
        />
      );
    } else {
      node = type;
    }
    return (
      <Keyboard {...keyboardProps}>
        <Box
          direction={boxDirection}
          style={{ flex: '0 0 1px' }}
          overflow="visible"
          align="center"
          justify="center"
          alignSelf="stretch"
        >
          {/* Add visually hidden range input for Safari VoiceOver */}
          <VisuallyHiddenInput
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            aria-label="slider control"
            readOnly
          />

          <Box
            ref={ref}
            direction={boxDirection}
            justify="center"
            align="center"
            basis="full"
            fill={fill}
            style={{
              cursor,
              outline: 'none',
              minWidth: size,
              minHeight: size,
              zIndex: 1,
            }}
            tabIndex={-1} // Remove from tab order
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            {...rest}
          >
            {node}
          </Box>
        </Box>
      </Keyboard>
    );
  },
);

EdgeControl.displayName = 'EdgeControl';

export { EdgeControl };
