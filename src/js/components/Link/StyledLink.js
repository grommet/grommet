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

// Deprecated: This will no longer be necessary on 3.0
const getLinkTheme = theme => {
  if (theme.link && !theme.anchor) {
    return theme.link;
  }
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      'This component will be deprecated in an upcoming release. ' +
        'Please see https://github.com/grommet/grommet/pull/3299',
    );
  }
  return theme.anchor;
};

const StyledLink = styled.a`
  box-sizing: border-box;
  ${props => sizeStyle(props)}
  color: ${props =>
    normalizeColor(
      props.colorProp || getLinkTheme(props.theme).color,
      props.theme,
    )};
  ${props =>
    props.theme.link.fontWeight &&
    `font-weight: ${getLinkTheme(props.theme).fontWeight};`}
  text-decoration: ${props =>
    props.hasIcon ? 'none' : getLinkTheme(props.theme).textDecoration};
  cursor: pointer;
  outline: none;
  ${genericStyles}

  ${props =>
    !props.disabled &&
    getLinkTheme(props.theme).hover &&
    css`
    &:hover {
      ${getLinkTheme(props.theme).hover.textDecoration &&
        `text-decoration: ${props.theme.link.hover.textDecoration};`}
      ${getLinkTheme(props.theme).hover.fontWeight &&
        `font-weight: ${getLinkTheme(props.theme).hover.fontWeight};`}
      ${getLinkTheme(props.theme).hover.extend}
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
  ${props => getLinkTheme(props.theme).extend}
`;

StyledLink.defaultProps = {};
Object.setPrototypeOf(StyledLink.defaultProps, defaultProps);

export { StyledLink };
