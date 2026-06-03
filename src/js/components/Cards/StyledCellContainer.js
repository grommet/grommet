import styled from 'styled-components';
import {
  focusStyle,
  roundStyle,
  styledComponentsConfig,
  unfocusStyle,
} from '../../utils';

const sizeStyles = (size) =>
  size && typeof size === 'object'
    ? `
      ${size?.columns ? `grid-column: span ${size.columns};` : ''}
      ${size?.rows ? `grid-row: span ${size.rows};` : ''}
    `
    : '';

// display: grid makes the single child fill the wrapper (stretch in both axes)
export const StyledCellContainer = styled.div.withConfig({
  ...styledComponentsConfig,
  // 'size' passes isPropValid (valid for input/select), filter it to
  // prevent the object value from reaching the DOM as an attribute.
  shouldForwardProp: (prop) =>
    prop !== 'size' && styledComponentsConfig.shouldForwardProp(prop),
})`
  display: grid;
  ${(props) => (props.size ? sizeStyles(props.size) : undefined)}
  ${(props) => (props.draggable ? 'cursor: move;' : undefined)}
  ${(props) =>
    props.round && roundStyle(props.round, props.responsive, props.theme)}
  &:focus {
    ${(props) =>
      (!props.plain || props.focusIndicator) &&
      focusStyle({ inset: props.focusIndicator === 'inset' })}
  }

  &:focus:not(:focus-visible) {
    ${unfocusStyle()}
  }
`;
