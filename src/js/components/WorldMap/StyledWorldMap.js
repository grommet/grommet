import styled from 'styled-components';
import { genericStyles, styledComponentsConfig } from '../../utils';
import { withTheme } from '../../default-props';

const fillStyle = (fillProp) => {
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
const StyledWorldMap = styled.svg
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  ${genericStyles}
  ${(props) =>
    props.fillProp !== undefined ? fillStyle(props.fillProp) : 'width: 100%;'}
  ${(props) => props.theme.worldMap && props.theme.worldMap.extend};
`;

export { StyledWorldMap };
