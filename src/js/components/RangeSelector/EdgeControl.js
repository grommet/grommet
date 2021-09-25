import React, { forwardRef, useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { focusStyle, normalizeColor, parseMetricToNum } from '../../utils';

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
    { color, direction, edge, onDecrease, onIncrease, thickness, ...rest },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const [focus, setFocus] = useState(false);
    const { cursor, fill } = DIRECTION_PROPS[direction];
    const size = parseMetricToNum(theme.global.spacing) / 2;
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
            tabIndex={0}
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

EdgeControl.defaultProps = {};
Object.setPrototypeOf(EdgeControl.defaultProps, defaultProps);

export { EdgeControl };
