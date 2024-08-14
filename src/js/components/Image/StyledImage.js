import styled, { css } from 'styled-components';

import { fillStyle, genericStyles, styledComponentsConfig } from '../../utils';
import { withTheme } from '../../default-props';

const FIT_MAP = {
  cover: 'cover',
  contain: 'contain',
};

const fitStyle = css`
  flex: 1 1;
  overflow: hidden;
  object-fit: ${(props) => FIT_MAP[props.fit]};
`;

const StyledImage = styled.img
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  ${genericStyles}
  ${(props) => props.fit && fitStyle}
  ${(props) => props.fillProp && fillStyle(props.fillProp)}
  ${(props) => props.theme.image && props.theme.image.extend}
  ${(props) =>
    props.opacityProp &&
    `opacity: ${
      props.opacityProp === true
        ? props.theme.global.opacity.medium
        : props.theme.global.opacity[props.opacityProp] || props.opacityProp
    };
  `}
`;

export { StyledImage };
