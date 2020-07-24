import styled, { css, keyframes } from 'styled-components';
import { Box } from '../Box';
import { backgroundStyle } from '../../utils';

const defaultSize = 28;
const getSize = (props, size) => props.theme.global.size[size] || size;

const widthStyle = css`
  width: ${props => getSize(props, props.width || `${defaultSize}px`)};
`;

const heightStyle = css`
  height: ${props => getSize(props, props.height || `${defaultSize}px`)};
`;

const beforeWidthStyle = css`
  width: ${props =>
    (props.width &&
      getSize(props, props.width) &&
      `${getSize(props, props.width).split('px')[0] / 2}px`) ||
    `${defaultSize / 2}px`};
`;

const beforeHeightStyle = css`
  height: ${props =>
    (props.height &&
      getSize(props, props.width) &&
      `${getSize(props, props.height).split('px')[0] / 2}px`) ||
    `${defaultSize / 2}px`};
`;

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderWrap = styled(Box)`
  height: 48px;
  width: 48px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.21);
`;

export const StyledLoader = styled(Box)`
  ${widthStyle}
  ${heightStyle}
  margin: auto;
  position: relative;
  animation: ${loading} 1.4s infinite linear;
  transform: translate3d(0, 0, 0);
  border-radius: 50%;
  &:before {
    ${beforeWidthStyle}
    ${beforeHeightStyle}
    ${props =>
      props.afterBeforeBg && backgroundStyle(props.afterBeforeBg, props.theme)}
    border: 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  &:after {
    ${props =>
      props.afterBeforeBg && backgroundStyle(props.afterBeforeBg, props.theme)}
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 3px;
    left: 3px;
    bottom: 3px;
    right: 3px;
  }
`;
