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

const opacityStyle = css`
  ${props => css`
    opacity: ${props.opacity === true
      ? props.theme.global.opacity.medium
      : props.theme.global.opacity[props.opacity] || props.opacity};
  `};
`;

const StyledImage = styled.img`
  ${genericStyles}
  ${props => props.fit && fitStyle}
  ${props => props.theme.image && props.theme.image.extend}
  ${props => props.opacity && opacityStyle}
    `;

StyledImage.defaultProps = {};
Object.setPrototypeOf(StyledImage.defaultProps, defaultProps);

export { StyledImage };
