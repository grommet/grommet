import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { getDefaultProps } from '../../default-props';

const StyledTabsHeader = styled.div.attrs(getDefaultProps)`
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

const StyledTabPanel = styled.div.attrs(getDefaultProps)`
  min-height: 0;
  ${props => props.flex && flexStyle} ${props => props.theme.tabs.panel.extend};
`;

const StyledTabs = styled.div.attrs(getDefaultProps)`
  ${genericStyles} ${props => props.theme.tabs.extend};
`;

export { StyledTabsHeader, StyledTabPanel, StyledTabs };
