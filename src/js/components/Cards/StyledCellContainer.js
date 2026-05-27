import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils';

const sizeStyles = (size) =>
  size && typeof size === 'object'
    ? `
      ${size?.columns ? `grid-column: span ${size.columns};` : ''}
      ${size?.rows ? `grid-row: span ${size.rows};` : ''}
    `
    : '';

// display: grid makes the single child fill the wrapper (stretch in both axes)
export const StyledCellContainer = styled.div.withConfig(
  styledComponentsConfig,
)`
  display: grid;
  ${(props) => (props.size ? sizeStyles(props.size) : undefined)}
  ${(props) => (props.draggable ? 'cursor: move;' : undefined)}
`;
