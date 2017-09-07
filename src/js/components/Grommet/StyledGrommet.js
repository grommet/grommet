import styled from 'styled-components';

import { baseStyle, lapAndUp } from '../utils';

const StyledGrommet = styled.div`
  ${baseStyle}

  ${lapAndUp(`
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 100%;
    width: 100%;
    overflow: visible;
  `)}

  ${props => props.theme.global.font.face}
`;

export default StyledGrommet.extend`
  ${props => props.theme.grommet.extend}
`;
