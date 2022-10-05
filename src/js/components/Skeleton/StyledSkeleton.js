
import styled from 'styled-components';

import {
  backgroundStyle,
  edgeStyle,
  genericStyles,
  heightStyle,
  roundStyle,
  widthStyle,
} from '../../utils';

export const StyledSkeleton = styled.div`
  display: flex;
  box-sizing: border-box;

  ${genericStyles}
 
  ${(props) =>
    props.background && backgroundStyle(props.background, props.theme)}
  ${(props) => props.height && heightStyle(props.height, props.theme)}
  ${(props) => props.width && widthStyle(props.width, props.theme)}
 
  ${(props) =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) =>
    props.round && roundStyle(props.round, props.responsive, props.theme)}
`;
