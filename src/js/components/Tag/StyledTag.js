import styled from 'styled-components';

import { defaultProps } from '../../default-props';

import { borderStyle, roundStyle } from '../../utils';

import { Button } from '../Button';

export const StyledTagButton = styled(Button)`
  ${(props) => props.border && borderStyle(props.border, true, props.theme)}
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;

StyledTagButton.defaultProps = {};
Object.setPrototypeOf(StyledTagButton.defaultProps, defaultProps);

export const StyledRemoveButton = styled(Button)`
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;

StyledRemoveButton.defaultProps = {};
Object.setPrototypeOf(StyledRemoveButton.defaultProps, defaultProps);
