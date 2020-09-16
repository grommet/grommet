import React, { forwardRef, useContext, useState, useRef } from 'react';

import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Text } from '../Text';
import { Drop } from '../Drop';

import { ArrowWrap, Arrow } from './StyledTooltip';

const Tooltip = forwardRef(
  ({ children, message, position = 'right', ...rest }, ref) => {
    const [over, setOver] = useState();
    const overRef = useRef();
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const { tooptip } = theme;

    let alignDrop = { left: 'right' };
    if (position === 'up') {
      alignDrop = { bottom: 'top' };
    }
    if (position === 'down') {
      alignDrop = { top: 'bottom' };
    }
    if (position === 'left') {
      alignDrop = { right: 'left' };
    }
    return (
      <Box ref={ref} {...rest}>
        <Box
          ref={overRef}
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {children}
        </Box>

        {overRef.current && over && (
          <Drop
            direction="row"
            align={alignDrop}
            target={overRef.current}
            elevation="none"
            plain
            style={{ boxShadow: 'none', maxWidth: tooptip.maxWidth }}
          >
            <ArrowWrap position={position}>
              <Arrow position={position} />
              <Box
                pad="medium"
                background={tooptip.background || 'dark-1'}
                round={tooptip.round}
              >
                <Text color={tooptip.color}>{message}</Text>
              </Box>
            </ArrowWrap>
          </Drop>
        )}
      </Box>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
