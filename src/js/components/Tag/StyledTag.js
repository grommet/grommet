import { styledWithTheme } from '../styledWithTheme';

import { borderStyle, roundStyle } from '../../utils';

import { Button } from '../Button';

export const StyledTagButton = styledWithTheme(Button)`
  ${(props) => props.border && borderStyle(props.border, true, props.theme)}
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;

export const StyledRemoveButton = styledWithTheme(Button)`
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;
