import styled from 'styled-components';
import { Box } from '../Box';

const StyledCheckBoxGroup = styled(Box)`
  ${(props) =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

export { StyledCheckBoxGroup };
