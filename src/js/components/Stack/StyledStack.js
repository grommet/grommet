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

const offsetStyle = (anchor, offset) => {
  let bottom;
  let left;
  let right;
  let top;
  if (offset) {
    bottom = offset.bottom;
    left = offset.left;
    right = offset.right;
    top = offset.top;
  }

  if (anchor === 'center') {
    return `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  }
  if (anchor === 'left') {
    return `
    top: 50%;
    left: ${left || '0'};
    transform: translateY(-50%);
  `;
  }
  if (anchor === 'right') {
    return `
      top: 50%;
      right: ${right || '0'};
      transform: translateY(-50%);
    `;
  }
  if (anchor === 'top') {
    return `
      top: ${top || '0'};
      left: 50%;
      transform: translateX(-50%);
    `;
  }
  if (anchor === 'bottom') {
    return `
      bottom: ${bottom || '0'};
      left: 50%;
      transform: translateX(-50%);
    `;
  }
  if (anchor === 'top-left') {
    return `
      top: ${top || '0'};
      left: ${left || '0'};
    `;
  }
  if (anchor === 'bottom-left') {
    return `
      bottom: ${bottom || '0'};
      left: ${left || '0'};
    `;
  }
  if (anchor === 'top-right') {
    return `
      top: ${top || '0'};
      right: ${right || '0'};
    `;
  }
  if (anchor === 'bottom-right') {
    return `
      bottom: ${bottom || '0'};
      right: ${right || '0'};
    `;
  }
  return `
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;
};

const StyledStackLayer = styled.div`
  position: ${props => (props.guiding ? 'relative' : 'absolute')};
  ${props => props.guiding && 'display: block;'}
  ${props =>
    !props.guiding && `${offsetStyle(props.anchor, props.offsetProp)};`}
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
