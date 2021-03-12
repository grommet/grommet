import styled from 'styled-components';

import { Box } from '../Box';
import { Text } from '../Text';

const StyledBreadcrumb = styled(Box)`
  ${({ theme }) => 
    theme.breadcrumb && theme.breadcrumb.extend};
`;

const StyledBreadcrumbItem = styled(Box)`
  ${({ theme }) => 
    theme.breadcrumb.item && theme.breadcrumb.item.extend};
`;

const StyledBreadcrumbText = styled(Text)`
  ${({ theme }) => theme.breadcrumb.content && theme.breadcrumb.content.extend};
`;

export { StyledBreadcrumb, StyledBreadcrumbItem, StyledBreadcrumbText };
