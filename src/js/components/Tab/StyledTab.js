import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const tabHoverStyle = css`
  &:hover {
    ${props =>
      props.theme.tab.hover.background &&
      css`
        background: ${normalizeColor(
          props.theme.tab.hover.background,
          props.theme,
        )};
      `}
    ${props =>
      props.theme.tab.hover.color &&
      css`
        color: ${normalizeColor(props.theme.tab.hover.color, props.theme)};
      `}
    ${props => props.theme.tab.hover.extend};
  }
`;

const StyledTab = styled.div`
  ${genericStyles}
  ${props =>
    !props.plain && !props.disabled && props.theme.tab.hover && tabHoverStyle}
  ${props => props.disabled && props.theme.tab.disabled}
  ${props => props.theme.tab.extend}
`;

StyledTab.defaultProps = {};
Object.setPrototypeOf(StyledTab.defaultProps, defaultProps);

export { StyledTab };
