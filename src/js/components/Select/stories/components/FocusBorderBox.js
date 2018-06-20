import React, { Component } from 'react';

import Box from '../../../Box/Box';

import { ThemeContext } from '../../../../contexts';
import { colorForName } from '../../../../utils';

const boxBorderTheme = {
  box: {
    extend: props => `
      position: relative;
      outline: none;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: transparent;
        transition: width .2s ease, background-color .2s ease, left .2s ease;
      }

      ${props.focus &&
        `
        box-shadow: none;
        &:after {
          left: 0;
          width: 100%;
          background: ${colorForName('blue', props.theme)};
        }
      `}
    `,
  },
};

export default class FocusBorderBox extends Component {
  state = {
    focus: false,
  };
  render() {
    const { children, ...rest } = this.props;
    const { focus } = this.state;
    return (
      <ThemeContext.Extend value={boxBorderTheme}>
        <Box
          focus={focus}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          {...rest}
        >
          {children}
        </Box>
      </ThemeContext.Extend>
    );
  }
}
