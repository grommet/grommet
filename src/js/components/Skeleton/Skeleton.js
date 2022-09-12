import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { 
  backgroundStyle,
  edgeStyle,
  genericStyles,
  heightStyle,
  widthStyle,
} from '../../utils';
import { useSkeleton } from './SkeletonContext';

// import { StyledSkeleton } from './StyledSkeleton';

const kindStyle = ({
  size = 'medium',
  kind,
  skeleton,
  theme,
  width,
}) => {
  // size = 'xsmall';
  const { colors } = theme.skeleton;
  const depth = skeleton?.depth || 0;
  const kindPart = theme.skeleton[kind];
  const skeletonPart = skeleton?.[kind];
  const themeColors = kindPart.colors
    ? kindPart.colors[theme.dark ? 'dark' : 'light']
    : colors[theme.dark ? 'dark' : 'light'];
  const color = themeColors[depth % themeColors.length];
  console.log('kindPart', kind, kindPart, skeletonPart, depth, colors, color, theme);
  const styles = [];
  styles.push(
    backgroundStyle(color || kindPart.color, theme),
  );
  console.log('size', size, theme.text[size].height);
  styles.push(heightStyle(kindPart.height || theme.text[size].height, theme));
  styles.push(widthStyle(width || skeletonPart?.width || kindPart.width, theme));
  if (kindPart.margin)
    styles.push(edgeStyle('margin', kindPart.margin, false, undefined, theme));
  return styles;
};

const StyledSkeleton = styled.div`
  display: flex;
  box-sizing: border-box;
  ${genericStyles}
  ${props => kindStyle(props)}
`;
  
const Skeleton = forwardRef(
  (
    {
      kind,
      ...rest
    },
    ref,
  ) => {
    const skeleton = useSkeleton();
    console.log('Skeleton', skeleton);
    return (
      <StyledSkeleton
        ref={ref}
        kind={kind}
        skeleton={skeleton}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
Skeleton.defaultProps = {
  kind: 'text',
};

export { Skeleton };