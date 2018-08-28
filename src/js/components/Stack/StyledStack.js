import styled from 'styled-components';

const fillStyle = `
  width: 100%;
  height: 100%;
  max-width: none;
  flex-grow: 1;
  display: flex;
`;

export const StyledStack = styled.div`
  position: relative;
  ${props => props.fillContainer && fillStyle}
`.extend`
  ${props => props.theme.stack && props.theme.stack.extend}
`;

const styleMap = {
  'fill': `
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `,
  'center': `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  'left': `
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  `,
  'right': `
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  `,
  'top': `
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  'bottom': `
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

export const StyledStackLayer = styled.div`
  position: ${props => (props.guiding ? 'relative' : 'absolute')};
  ${props => props.guiding && 'display: block;'}
  ${props => !props.guiding && `${styleMap[props.anchor || 'fill']};`}
  ${props => props.fillContainer && `
    width: 100%;
    height: 100%;
  `}
`;
