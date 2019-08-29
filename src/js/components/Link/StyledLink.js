import styled, { css } from 'styled-components';

import { focusStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

const sizeStyle = props => {
  if (props.size) {
    const size = props.size || 'medium';
    const data = props.theme.text[size];
    return css`
      font-size: ${data.size};
      line-height: ${data.height};
    `;
  }
  return css`
    font-size: inherit;
    line-height: inherit;
  `;
};

const StyledLink = styled.a`
  box-sizing: border-box;
  ${props => sizeStyle(props)}
  color: ${props =>
    normalizeColor(props.colorProp || props.theme.link.color, props.theme)};
  ${props =>
    props.theme.link.fontWeight &&
    `font-weight: ${props.theme.link.fontWeight};`}
  text-decoration: ${props =>
    props.hasIcon ? 'none' : props.theme.link.textDecoration};
  cursor: pointer;
  outline: none;
  ${genericStyles}

  ${props =>
    !props.disabled &&
    props.theme.link.hover &&
    css`
    &:hover {
      ${props.theme.link.hover.textDecoration &&
        `text-decoration: ${props.theme.link.hover.textDecoration};`}
      ${props.theme.link.hover.fontWeight &&
        `font-weight: ${props.theme.link.hover.fontWeight};`}
      ${props.theme.link.hover.extend}
    }
  `}
  ${props =>
    props.hasIcon &&
    !props.hasLabel &&
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${props => props.disabled && disabledStyle}
  ${props => props.focus && focusStyle}
  ${props => props.theme.link.extend}
`;

StyledLink.defaultProps = {};
Object.setPrototypeOf(StyledLink.defaultProps, defaultProps);

export { StyledLink };
