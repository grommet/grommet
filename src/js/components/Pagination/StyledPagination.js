import styled from 'styled-components';
import { Box } from '../Box';

export const List = styled(Box)`
  &.disabled {
    display: none;
  }
  &.active {
    cursor: default;
    background: ${props => props.theme.pagination.active.color};
  }
  ${props => props.theme.pagination && props.theme.pagination.extend}
`;
