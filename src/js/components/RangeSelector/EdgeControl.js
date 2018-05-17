import React, { Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Keyboard } from '../Keyboard';
import { colorForName, parseMetricToNum } from '../../utils';
import { withForwardRef } from '../hocs';

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

class EdgeControl extends Component {
  state = {}

  render() {
    const {
      color, direction, edge, forwardRef, onDecrease, onIncrease, theme, ...rest
    } = this.props;
    const { focused } = this.state;
    const { cursor, fill } = DIRECTION_PROPS[direction];
    const size = parseMetricToNum(theme.global.spacing) / 2;
    const halfSize = size / 2;
    const keyboardProps = (direction === 'vertical' ?
      { onUp: onDecrease, onDown: onIncrease } :
      { onLeft: onDecrease, onRight: onIncrease }
    );
    const boxDirection = (direction === 'vertical' ? 'row' : 'column');
    return (
      <Keyboard {...keyboardProps}>
        <Box
          direction={boxDirection}
          style={{ flex: '0 0 1px' }}
          overflow='visible'
          align='center'
        >
          <Box
            ref={forwardRef}
            direction={boxDirection}
            justify='center'
            align='center'
            fill={fill}
            margin='xsmall'
            style={{ cursor, minWidth: size, minHeight: size, zIndex: 10 }}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            {...rest}
          >
            <Box
              direction={boxDirection}
              round='small'
              focus={focused}
            >
              <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                <circle
                  cx={halfSize}
                  cy={halfSize}
                  r={halfSize}
                  fill={colorForName(color || 'brand', theme)}
                />
              </svg>
            </Box>
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default compose(
  withForwardRef,
)(EdgeControl);
