import styled from 'styled-components';

import { colorForName, focusStyle, normalizeColor } from '../../utils';

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

export const StyledAnchor = styled.a`
  box-sizing: border-box;
  font-size: inherit;
  line-height: inherit;
  color: ${props => normalizeColor(props.theme.anchor.color, props.theme)};
  text-decoration: ${props => (props.hasIcon ? 'none' : props.theme.anchor.textDecoration)};
  cursor: pointer;
  outline: none;

  ${props => !props.disabled && `
    &:hover {
      text-decoration: underline;
    }
  `}

  ${props => !props.primary && props.hasIcon && props.hasLabel && `
    color: ${colorForName('text', props.theme)};
  `}
  ${props => props.hasIcon && !props.hasLabel && `
    padding: ${props.theme.global.edgeSize.small};
  `}

  ${props => props.disabled && disabledStyle}
  ${props => props.focus && focusStyle}
  ${props => props.theme.anchor.extend}
`;
