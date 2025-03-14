import styled from 'styled-components';

import {
  backgroundStyle,
  edgeStyle,
  genericStyles,
  heightStyle,
  roundStyle,
  widthStyle,
  styledComponentsConfig,
} from '../../utils';
import { breakpointStyle } from '../../utils/mixins';

// Styling a div directly rather than just using
// a Box since Box itself will react to a SkeletonContext
// and we don't want that here.
export const StyledSkeleton = styled.div.withConfig(styledComponentsConfig)`
  display: flex;
  box-sizing: border-box;

  ${genericStyles}

  ${(props) =>
    props.background && backgroundStyle(props.background, props.theme)}
  ${(props) =>
    heightStyle(
      props.heightProp || props.theme.text?.medium?.height,
      props.theme,
    )}
  ${(props) => widthStyle(props.widthProp || '100%', props.theme)}

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
  ${(props) => props.theme?.skeleton?.extend}
  ${(props) =>
    props.responsiveSize &&
    breakpointStyle(
      props.responsiveSize.breakpoint,
      heightStyle(props.responsiveSize.height, props.theme),
      props.responsive,
    )}
`;
