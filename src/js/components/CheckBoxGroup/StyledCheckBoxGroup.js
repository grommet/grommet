import styled from 'styled-components';
import { Box } from '../Box';
import { ehnancePropsWithTheme } from '../../default-props';

const StyledCheckBoxGroup = styled(Box).attrs(ehnancePropsWithTheme)`
  ${props =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

export { StyledCheckBoxGroup };
