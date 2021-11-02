import styled from 'styled-components';

import { defaultProps } from '../../default-props';

import { borderStyle, edgeStyle, roundStyle } from '../../utils';

import { Button } from '../Button';

export const StyledTagButton = styled(Button)`
  ${props => props.border && borderStyle(props.border, true, props.theme)}
  ${props => props.round && roundStyle(props.round, true, props.theme)}
  ${(props) => props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
`;

StyledTagButton.defaultProps = {};
Object.setPrototypeOf(StyledTagButton.defaultProps, defaultProps);

export const StyledRemoveButton = styled(Button)`
  ${props => props.round && roundStyle(props.round, true, props.theme)}
`;

StyledRemoveButton.defaultProps = {};
Object.setPrototypeOf(StyledRemoveButton.defaultProps, defaultProps);