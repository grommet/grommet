import styled, { css } from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledTabsHeader = styled.div`
  ${props => props.theme.tabs.header.extend};
`;

StyledTabsHeader.defaultProps = {};
Object.setPrototypeOf(StyledTabsHeader.defaultProps, defaultProps);

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

const StyledTabPanel = styled.div`
  min-height: 0;
  ${props => props.flex && flexStyle} ${props => props.theme.tabs.panel.extend};
`;

StyledTabPanel.defaultProps = {};
Object.setPrototypeOf(StyledTabPanel.defaultProps, defaultProps);

const StyledTabs = styled.div`
  ${genericStyles} ${props => props.theme.tabs.extend};
`;

StyledTabs.defaultProps = {};
Object.setPrototypeOf(StyledTabs.defaultProps, defaultProps);

export { StyledTabsHeader, StyledTabPanel, StyledTabs };
