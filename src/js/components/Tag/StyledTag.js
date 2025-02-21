import styled from 'styled-components';

import { borderStyle, roundStyle } from '../../utils';

import { Button } from '../Button';

export const StyledTagButton = styled(Button)`
  ${(props) => props.border && borderStyle(props.border, true, props.theme)}
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;

export const StyledRemoveButton = styled(Button)`
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;
