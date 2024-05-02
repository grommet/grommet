import { genericStyles } from '../../utils';
import { styledWithTheme } from '../styledWithTheme';

const fillStyle = fillProp => {
  if (fillProp === 'horizontal') {
    return `
      width: 100%;
      height: unset;
    `;
  }
  if (fillProp === 'vertical') {
    return `
      width: unset;
      height: 100%;
    `;
  }
  if (fillProp) {
    return `
      width: 100%;
      height: 100%;
    `;
  }
  return '';
};

// undefined fillProp has width for backwards compatibility
const StyledWorldMap = styledWithTheme.svg`
  ${genericStyles}
  ${props =>
    props.fillProp !== undefined ? fillStyle(props.fillProp) : 'width: 100%;'}
  ${props => props.theme.worldMap && props.theme.worldMap.extend};
`;

export { StyledWorldMap };
