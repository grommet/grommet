import { css } from 'styled-components';
import React, { Component } from 'react';

import Box from '../../../Box/Box';

import { ThemeContext } from '../../../../contexts';
import { colorForName } from '../../../../utils';

const searchingStyle = css`
  position: relative;
  outline: none;
  box-shadow: none;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => colorForName('light-2', props.theme)};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70%;
    height: 2px;
    will-change: left, right;
    background: ${props => colorForName('brand', props.theme)};
    animation: progress 1.5s ease-out infinite;
  }

  @keyframes progress {
    0% {
      left: -100%;
      right: 100%;
    }
    100% {
      left: 100%;
      right: -50%;
    }
  }
`;

const defaultStyle = css`
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

  ${props => props.focus &&
    `
    box-shadow: none;
    &:after {
      left: 0;
      width: 100%;
      background: ${colorForName('brand', props.theme)};
    }
  `}
`;

const boxBorderTheme = {
  box: {
    extend: props => (props.searching ? searchingStyle : defaultStyle),
  },
};

export default class SearchBorderBox extends Component {
  state = {
    focus: false,
  };
  render() {
    const { children, searching, ...rest } = this.props;
    const { focus } = this.state;
    return (
      <ThemeContext.Extend value={boxBorderTheme}>
        <Box
          focus={focus}
          searching={searching}
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
