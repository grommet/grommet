import { Box } from '../Box';
import { styledWithTheme } from '../styledWithTheme';

const StyledCheckBoxGroup = styledWithTheme(Box)`
  ${props =>
    props.theme.checkBoxGroup &&
    props.theme.checkBoxGroup.container &&
    props.theme.checkBoxGroup.container.extend}
`;

export { StyledCheckBoxGroup };
