import styled from 'styled-components';
import { Box } from '../Box';
import { ehnancePropsWithDefault } from '../../default-props';

const StyledCheckBoxGroup = styled(Box).attrs(ehnancePropsWithDefault)`
  ${props =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

export { StyledCheckBoxGroup };
