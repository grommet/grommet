import styled, { css } from 'styled-components';

import {
  focusStyle,
  genericStyles,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { edgeStyle, roundStyle } from '../../utils/styles';
import { backgroundStyle } from '../../utils/background';

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

const StyledAnchor = styled.a.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  display: inline-flex;
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
    !props.popoverTarget
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${(props) => props.disabled && disabledStyle}
  ${(props) => props.focus && focusStyle()}
  ${(props) => props.theme.anchor.extend}
  ${(props) => props.popoverTarget && `
    text-decoration: underline dotted;
    text-underline-offset: 4px;
    border: none;
    background: none;
    font-family: inherit;
    padding: 0;
  `}
`;

const StyledPopover = styled.div`
    border: none;
    ${(props) => props.theme.anchor.popover?.round &&
      roundStyle(props.theme.anchor.popover.round,
        props.responsive,
        props.theme)}
    ${(props) => props.theme.anchor.popover?.background &&
      backgroundStyle(props.theme.anchor.popover.background, props.theme)}
    ${(props) => props.theme.anchor.popover?.pad &&
      edgeStyle(
        'padding',
        props.theme.anchor.popover.pad,
        props.responsive,
        props.theme.box.responsiveBreakpoint,
        props.theme,
      )}
  `; 
export { StyledAnchor, StyledPopover };