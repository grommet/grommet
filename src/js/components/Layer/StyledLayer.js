import styled, { css } from 'styled-components';

import { baseStyle, lapAndUp, palm } from '../../utils';

const StyledLayer = styled.div`
  ${baseStyle}
  
  position: relative;
  z-index: 10;
  height: 100vh;
  overflow: auto;

  background-color: ${props => (props.plain ? 'transparent' : props.theme.layer.overlayBackgroundColor)};

  ${lapAndUp(`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  `)}
`;

const leftAlignStyle = `
  top: 0px;
  bottom: 0px;
  left: 0px;

  animation: slide-left 0.2s ease-in-out forwards;
  
  @keyframes slide-left {
    0% {
      left: -100%;
    }

    100% {
      left: 0px;
    }
  }
`;

const rightAlignStyle = `
  top: 0px;
  bottom: 0px;
  right: 0px;

  animation: slide-right 0.2s ease-in-out forwards;
  
  @keyframes slide-right {
    0% {
      right: -200px;
    }

    100% {
      right: 0px;
    }
  }
`;

const topAlignStyle = `
  left: 50%;
  transform: translateX(-50%);

  animation: slide-down 0.2s ease-in-out forwards;
  
  @keyframes slide-down {
    0% {
      top: -100vh;
    }
  
    100% {
      top: 0px;
    }
  }
`;

const bottomAlignStyle = `
  bottom: 0px;
  right: 50%;
  transform: translateX(50%);

  animation: slide-up 0.2s ease-in-out forwards;
  
  @keyframes slide-up {
    0% {
      margin-bottom: -200px;
    }
  
    100% {
      margin-bottom: 0px;
    }
  }
`;

const centerAlignStyle = css`
  bottom: 50%;
  right: 50%;
  animation: grow-box 0.1s forwards;

  @keyframes grow-box {
    0% {
      transform: translate(50%, 50%) scale(0.8);
    }

    100% {
      transform: translate(50%, 50%) scale(1);
    }
  }
`;

function getAlignStyle(props) {
  const ALIGN_MAP = {
    'center': centerAlignStyle,
    'left': leftAlignStyle,
    'right': rightAlignStyle,
    'top': topAlignStyle,
    'bottom': bottomAlignStyle,
  };
  return ALIGN_MAP[props.align] || '';
}

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${props => props.theme.global.size.xxsmall};
  outline: none;

  background-color: ${props => (props.plain ? 'transparent' : props.theme.layer.backgroundColor)};

  ${palm(`
    min-height: 100%;
    min-width: 100%;
  `)}

  ${props => lapAndUp(`
    position: absolute;
    max-height: 100%;
    max-width: 100%;
    overflow: auto;
    border-radius: ${props.plain ? 'none' : props.theme.layer.border.radius};

    ${getAlignStyle(props)}
  `)}
`;

export default StyledLayer.extend`
  ${props => props.theme.layer && props.theme.layer.extend}
`;
