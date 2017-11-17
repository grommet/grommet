import styled from 'styled-components';

import { baseStyle } from '../../utils';

const StyledGrommet = styled.div`
  ${baseStyle}
  ${props => props.theme.global.font.face}
`;

export default StyledGrommet.extend`
  ${props => props.theme.grommet.extend}
`;
