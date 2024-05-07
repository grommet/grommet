import styled from 'styled-components';
import { Box } from '../Box';
import { getDefaultProps } from '../../default-props';

const StyledCheckBoxGroup = styled(Box).attrs(getDefaultProps)`
  ${props =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

export { StyledCheckBoxGroup };
