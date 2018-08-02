import styled from 'styled-components';

import { focusStyle, normalizeColor } from '../../utils';

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
  text-decoration: none;
`;

const StyledAnchor = styled.a`
  box-sizing: border-box;
  font-size: inherit;
  line-height: inherit;
  color: ${props =>
    (props.theme.dark ? (
      props.theme.anchor.color.dark || props.theme.global.color.darkBackground.text
    ) : (
      props.theme.anchor.color.light || props.theme.global.color.lightBackground.text
    ))};
  text-decoration: ${props => (props.icon ? 'none' : props.theme.anchor.textDecoration)};
  cursor: pointer;
  outline: none;

  ${props => !props.disabled && `
    &:hover {
      text-decoration: underline;
    }
  `}

  ${props => props.icon && !props.label && `
    padding: ${props.theme.global.edgeSize.small};
  `}

  ${props => props.disabled && disabledStyle}
  ${props => props.focus && focusStyle}
`;

export default StyledAnchor.extend`
  ${props => props.theme.anchor.extend}
`;
