import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';

export const StyledTabsHeader = styled.div`
  ${props => props.theme.tabs.header.extend};
`;

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0',
  grow: '1 0',
  shrink: '0 1',
};

const flexStyle = css`
  flex: ${props =>
    `${FLEX_MAP[props.flex]}${props.flex !== true ? ' auto' : ''}`};
`;

export const StyledTabPanel = styled.div`
  min-height: 0;
  ${props => props.flex && flexStyle} ${props => props.theme.tabs.panel.extend};
`;

export const StyledTabs = styled.div`
  ${genericStyles} ${props => props.theme.tabs.extend};
`;
