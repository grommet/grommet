import styled, { css } from 'styled-components';

import { focusStyle, fontSize } from '../../utils';

const primaryIconLabelStyle = css`
  ${props => fontSize(props.theme.global.control.font.size, props.theme.global.spacing)}
  font-weight: ${props => props.theme.global.control.font.weight};
`;

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

const StyledAnchor = styled.a`
  color: ${props =>
    (props.grommet.dark ? props.theme.global.colors.darkBackgroundTextColor
      : props.theme.anchor.color)};
  text-decoration: ${props => props.theme.anchor.textDecoration};
  cursor: pointer;
  outline: none;

  ${props => !props.disabled && `
    &:hover {
      text-decoration: underline;
    }
  `}

  ${props => (props.primary || (props.icon && props.label)) && primaryIconLabelStyle}
  ${props => !props.primary && props.icon && props.label && `
    color: ${props.theme.global.colors.text};
  `}
  ${props => props.icon && !props.label && `
    padding: ${props.theme.global.edgeSize.small};
  `}

  ${props => props.disabled && disabledStyle}
  ${props => props.focus && focusStyle}
`;

export const StyledIcon = styled.span`
  display: inline-block;
  ${props => props.label && `
    ${props.reverse ? `
      margin-left: ${props.theme.global.edgeSize.small};
    ` : `
      margin-right: ${props.theme.global.edgeSize.small};
    `}
  `}

  > * {
    vertical-align: bottom;
  }
`;

export default StyledAnchor.extend`
  ${props => props.theme.anchor.extend}
`;
