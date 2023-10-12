import styled, { css } from 'styled-components';

import { focusStyle, genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

const sizeStyle = (props) => {
  if (props.size) {
    const size = props.size || 'medium';
    const data = props.theme.text[size];
    return css`
      font-size: ${data ? data.size : size};
      line-height: ${data ? data.height : 'normal'};
    `;
  }
  return css`
    font-size: inherit;
    line-height: inherit;
  `;
};

const StyledAnchor = styled.a.withConfig({
  // prevent custom props from bleeding into DOM
  // https://styled-components.com/docs/api#shouldforwardprop
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['as', 'colorProp', 'focus', 'hasIcon', 'hasLabel', 'reverse'].includes(
      prop,
    ) && defaultValidatorFn(prop),
})`
  box-sizing: border-box;
  ${(props) => sizeStyle(props)}
  color: ${(props) =>
    normalizeColor(
      props.colorProp ||
        props.theme.anchor?.size?.[props.size]?.color ||
        props.theme.anchor.color,
      props.theme,
    )};
  ${(props) =>
    props.weight
      ? `font-weight: ${props.weight};`
      : (props.theme.anchor?.size?.[props.size]?.fontWeight ||
          props.theme.anchor.fontWeight) &&
        `font-weight: ${
          props.theme.anchor?.size?.[props.size]?.fontWeight ||
          props.theme.anchor.fontWeight
        };`}
  text-decoration: ${(props) =>
    props.hasIcon
      ? 'none'
      : props.theme.anchor?.size?.[props.size]?.textDecoration ||
        props.theme.anchor.textDecoration};
  cursor: pointer;
  ${genericStyles}

  ${(props) =>
    !props.disabled &&
    props.theme.anchor.hover &&
    css`
      &:hover {
        ${props.theme.anchor.hover.textDecoration &&
        `text-decoration: ${props.theme.anchor.hover.textDecoration};`}
        ${props.theme.anchor.hover.fontWeight &&
        `font-weight: ${props.theme.anchor.hover.fontWeight};`}
      ${props.theme.anchor.hover.extend}
      }
    `}
  ${(props) =>
    props.hasIcon &&
    !props.hasLabel &&
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${(props) => props.disabled && disabledStyle}
  ${(props) => props.focus && focusStyle()}
  ${(props) => props.theme.anchor.extend}
`;

StyledAnchor.defaultProps = {};
Object.setPrototypeOf(StyledAnchor.defaultProps, defaultProps);

export { StyledAnchor };
