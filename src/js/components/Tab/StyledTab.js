import styled, { css } from 'styled-components';

import { genericStyles, normalizeColor } from '../../utils';

const tabHoverStyle = css`
  &:hover {
    ${props =>
      props.theme.tab.hover.background &&
      css`
        background: ${normalizeColor(props.theme.tab.hover.background, props.theme)};
      `};
  }
  ${props => props.theme.tab.hover.extend};
`;

export const StyledTab = styled.div`
  ${genericStyles}
  ${props => !props.plain && props.theme.tab.hover && tabHoverStyle}
  ${props => props.theme.tab.extend}
`;
