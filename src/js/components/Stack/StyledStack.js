import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const fillStyle = css`
  ${props =>
    props.fillContainer === true || props.fillContainer === 'horizontal'
      ? `
        width: 100%;
        max-width: none;
      `
      : ''}
  ${props =>
    props.fillContainer === true || props.fillContainer === 'vertical'
      ? 'height: 100%;'
      : ''}
  flex-grow: 1;
  display: flex;
`;

const StyledStack = styled.div`
  position: relative;
  ${genericStyles}
  ${props => props.fillContainer && fillStyle}
  ${props => props.theme.stack && props.theme.stack.extend}
`;

StyledStack.defaultProps = {};
Object.setPrototypeOf(StyledStack.defaultProps, defaultProps);

const styleMap = {
  fill: `
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
  center: `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  left: `
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  `,
  right: `
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `,
  top: `
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  bottom: `
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  'top-left': `
    top: 0;
    left: 0;
  `,
  'bottom-left': `
    bottom: 0;
    left: 0;
  `,
  'top-right': `
    top: 0;
    right: 0;
  `,
  'bottom-right': `
    bottom: 0;
    right: 0;
  `,
};

const StyledStackLayer = styled.div`
  position: ${props => (props.guiding ? 'relative' : 'absolute')};
  ${props => props.guiding && 'display: block;'}
  ${props => !props.guiding && `${styleMap[props.anchor || 'fill']};`}
  ${props =>
    props.fillContainer &&
    `
    width: 100%;
    height: 100%;
  `}
  ${props => !props.interactive && `pointer-events: none;`}
`;

StyledStackLayer.defaultProps = {};
Object.setPrototypeOf(StyledStackLayer.defaultProps, defaultProps);

export { StyledStack, StyledStackLayer };
