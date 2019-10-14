import styled from 'styled-components';

import { genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledWorldMap = styled.svg`
  width: 100%;
  height: unset;

  ${genericStyles} ${props =>
    props.theme.worldMap && props.theme.worldMap.extend};
`;

StyledWorldMap.defaultProps = {};
Object.setPrototypeOf(StyledWorldMap.defaultProps, defaultProps);

export { StyledWorldMap };
