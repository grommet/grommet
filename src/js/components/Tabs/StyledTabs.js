import { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { styledWithTheme } from '../styledWithTheme';

const StyledTabsHeader = styledWithTheme.div`
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

const StyledTabPanel = styledWithTheme.div`
  min-height: 0;
  ${props => props.flex && flexStyle} ${props => props.theme.tabs.panel.extend};
`;

const StyledTabs = styledWithTheme.div`
  ${genericStyles} ${props => props.theme.tabs.extend};
`;

export { StyledTabsHeader, StyledTabPanel, StyledTabs };
