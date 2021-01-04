import styled from 'styled-components';
import { Box } from '../Box';
import { defaultProps } from '../../default-props';

const StyledCheckBoxGroup = styled(Box)`
  ${props =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

StyledCheckBoxGroup.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxGroup.defaultProps, defaultProps);

export { StyledCheckBoxGroup };
