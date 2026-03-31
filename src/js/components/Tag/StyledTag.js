import styled from 'styled-components';

import { backgroundStyle, borderStyle, roundStyle } from '../../utils';

import { Button } from '../Button';

export const StyledTagButton = styled(Button)`
  ${(props) =>
    props.background && backgroundStyle(props.background, props.theme)}
  ${(props) => props.border && borderStyle(props.border, true, props.theme)}
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
  &:hover {
    ${(props) =>
      props.background &&
      props.onClick &&
      props.theme?.tag?.hover?.background &&
      backgroundStyle(props.theme.tag.hover.background, props.theme)}
    ${(props) =>
      props.border &&
      props.onClick &&
      props.theme?.tag?.hover?.border &&
      borderStyle(props.theme.tag.hover.border, true, props.theme)}
  }
`;

export const StyledRemoveButton = styled(Button)`
  ${(props) => props.round && roundStyle(props.round, true, props.theme)}
`;
