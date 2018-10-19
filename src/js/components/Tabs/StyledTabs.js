import styled from 'styled-components';

import { genericStyles } from '../../utils';

export const StyledTabsHeader = styled.div`
  ${props => props.theme.tabs.header.extend}
`;

export const StyledTabs = styled.div`
  ${genericStyles}
  ${props => props.theme.tabs.extend}
`;
