import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const FIT_MAP = {
  cover: 'cover',
  contain: 'contain',
};

const fitStyle = css`
  flex: 1 1;
  overflow: hidden;
  object-fit: ${props => FIT_MAP[props.fit]};
`;

const StyledImage = styled.img`
  ${genericStyles}
  ${props => props.fit && fitStyle}
  ${props => props.theme.image && props.theme.image.extend}
  opacity: ${props =>
    props.opacity === true
      ? props.theme.global.opacity.medium
      : props.theme.global.opacity[props.opacity] || props.opacity}
`;

StyledImage.defaultProps = {};
Object.setPrototypeOf(StyledImage.defaultProps, defaultProps);

export { StyledImage };
