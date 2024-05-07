import styled from 'styled-components';

import { borderStyle, roundStyle } from '../../utils';

import { Button } from '../Button';
import { getDefaultProps } from '../../default-props';

export const StyledTagButton = styled(Button).attrs(getDefaultProps)`
  ${(props) => props.border && borderStyle(props.border, true, props.theme)}
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;

export const StyledRemoveButton = styled(Button).attrs(getDefaultProps)`
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;
