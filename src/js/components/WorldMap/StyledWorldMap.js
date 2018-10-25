import styled from 'styled-components';

import { genericStyles } from '../../utils';

export const StyledWorldMap = styled.svg`
  width: 100%;

  ${genericStyles} ${props => props.theme.worldMap && props.theme.worldMap.extend};
`;
