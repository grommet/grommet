
import styled from 'styled-components';

import { 
  backgroundStyle,
  edgeStyle,
  genericStyles,
  heightStyle,
  widthStyle,
} from '../../utils';

const kindStyle = ({
  size = 'medium',
  kind,
  skeleton,
  theme,
  width,
}) => {
  const { colors } = theme.skeleton;
  const depth = skeleton?.depth || 0;
  const kindPart = theme.skeleton[kind];
  const skeletonPart = skeleton?.[kind];
  const themeColors = kindPart.colors
    ? kindPart.colors[theme.dark ? 'dark' : 'light']
    : colors[theme.dark ? 'dark' : 'light'];
  const color = themeColors[depth % themeColors.length];
  const styles = [];
  styles.push(
    backgroundStyle(color || kindPart.color, theme),
  );
  console.log('size', size, theme.text[size].height);
  styles.push(heightStyle(kindPart.height || theme.text[size].height, theme));
  styles.push(
    widthStyle(width || skeletonPart?.width || kindPart.width, theme),
  );
  if (kindPart.margin)
    styles.push(edgeStyle('margin', kindPart.margin, false, undefined, theme));
  return styles;
};

export const StyledSkeleton = styled.div`
  display: flex;
  box-sizing: border-box;
  ${genericStyles}
  ${props => kindStyle(props)}
`;


