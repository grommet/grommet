import { css } from 'styled-components';
import React, { useState } from 'react';

import { Box } from '../../..';

import { ThemeContext } from '../../../../contexts';
import { normalizeColor } from '../../../../utils';

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
    background: ${props => normalizeColor('light-2', props.theme)};
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    will-change: left, right;
    background: ${props => normalizeColor('brand', props.theme)};
    animation: progress 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    transform: translateX(-50%) scaleX(0);
  }

  @keyframes progress {
    0% {
      transform: translateX(-50%) scaleX(0);
    }
    50% {
      transform: translateX(12.5%) scaleX(0.75);
    }
    100% {
      transform: translateX(50%) scaleX(0);
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
    transition: width 0.2s ease, background 0.2s ease, left 0.2s ease;
  }

  ${props =>
    props.focus &&
    `
    box-shadow: none;
    &:after {
      left: 0;
      width: 100%;
      background: ${normalizeColor('brand', props.theme)};
    }
  `};
`;

export const SearchBorderBox = ({ children, searching, ...rest }) => {
  const [focus, setFocus] = useState(false);

  const boxBorderTheme = {
    box: {
      extend: searching ? searchingStyle : defaultStyle,
    },
  };

  return (
    <ThemeContext.Extend value={boxBorderTheme}>
      <Box
        focus={focus}
        searching={searching}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...rest}
      >
        {children}
      </Box>
    </ThemeContext.Extend>
  );
};
