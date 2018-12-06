import styled from 'styled-components';

import { sizeStyle } from 'grommet-styles';

import { defaultProps } from '../../default-props';
import {
  backgroundStyle,
  edgeStyle,
  genericStyles,
  overflowStyle,
} from '../../utils';

import { withDocs } from '../hocs';

import { BoxInner } from './BoxInner';
import {
  alignStyle,
  alignContentStyle,
  animationStyle,
  basisStyle,
  borderStyle,
  directionStyle,
  elevationStyle,
  flexStyle,
  fillStyle,
  justifyStyle,
  roundStyle,
  wrapStyle,
} from './BoxStyles';

// NOTE: basis must be after flex! Otherwise, flex overrides basis
const StyledBox = styled(BoxInner)`
  display: flex;
  box-sizing: border-box;
  outline: none;
  ${props => !props.basis && 'max-width: 100%;'};

  ${genericStyles}
  ${props => props.height && sizeStyle('height', props.height, props.theme)}
  ${props => props.width && sizeStyle('width', props.width, props.theme)}
  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props =>
    props.border && borderStyle(props.border, props.responsive, props.theme)}
  ${props => props.direction && directionStyle(props.direction, props.theme)}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.basis && basisStyle}
  ${props => props.fill && fillStyle(props.fill)}
  ${props => props.justify && justifyStyle}
  ${props =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${props =>
    props.round && roundStyle(props.round, props.responsive, props.theme)}
  ${props => props.wrap && wrapStyle}
  ${props => props.overflow && overflowStyle(props.overflow)}
  ${props => props.elevation && elevationStyle}
  ${props => props.animation && animationStyle}
  ${props => props.theme.box && props.theme.box.extend}
`;

StyledBox.defaultProps = {
  direction: 'column',
  margin: 'none',
  pad: 'none',
  responsive: true,
};
StyledBox.displayName = 'Box';
Object.setPrototypeOf(StyledBox.defaultProps, defaultProps);

export const Box = withDocs('Box')(StyledBox);
