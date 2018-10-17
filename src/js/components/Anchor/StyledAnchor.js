import styled, { css } from 'styled-components';

import { focusStyle, genericStyles, normalizeColor } from '../../utils';

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

export const StyledAnchor = styled.a`
  box-sizing: border-box;
  font-size: inherit;
  line-height: inherit;
  color: ${props => normalizeColor(props.color || props.theme.anchor.color, props.theme)};
  ${props => props.theme.anchor.fontWeight
    && `font-weight: ${props.theme.anchor.fontWeight};`}
  text-decoration: ${props => (props.hasIcon ? 'none' : props.theme.anchor.textDecoration)};
  cursor: pointer;
  outline: none;
  ${genericStyles}

  ${props => !props.disabled && props.theme.anchor.hover && css`
    &:hover {
      ${props.theme.anchor.hover.textDecoration
        && `text-decoration: ${props.theme.anchor.hover.textDecoration};`}
      ${props.theme.anchor.hover.fontWeight
        && `font-weight: ${props.theme.anchor.hover.fontWeight};`}
      ${props.theme.anchor.hover.extend}
    }
  `}
  ${props => props.hasIcon && !props.hasLabel && `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${props => props.disabled && disabledStyle}
  ${props => props.focus && focusStyle}
  ${props => props.theme.anchor.extend}
`;
