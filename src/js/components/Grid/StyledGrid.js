import styled, { css } from 'styled-components';

const ALIGN_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const ALIGN_CONTENT_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const JUSTIFY_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const JUSTIFY_CONTENT_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const justifyContentStyle = css`
  justify-content: ${props => JUSTIFY_CONTENT_MAP[props.justifyContent]};
`;

const gapStyle = (props) => {
  if (typeof props.gap === 'string') {
    const gapSize = props.theme.global.edgeSize[props.gap];
    return `grid-gap: ${gapSize} ${gapSize};`;
  }
  if (props.gap.horizontal && props.gap.vertical) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.horizontal]};
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.vertical]};
    `;
  }
  if (props.gap.horizontal) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.horizontal]};
    `;
  }
  if (props.gap.vertical) {
    return `
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.vertical]};
    `;
  }
  return '';
};

const SIZE_MAP = {
  'flex': '1fr',
  'full': '100%',
  '1/2': '50%',
  '1/4': '25%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const columnsStyle = css`
  grid-template-columns: ${props => props.columns.map(s => (
    SIZE_MAP[s] || props.theme.global.size[s])
  ).join(' ')};
`;

const rowsStyle = css`
  grid-template-rows: ${props => props.rows.map(s => (
    SIZE_MAP[s] || props.theme.global.size[s])
  ).join(' ')};
`;

const areasStyle = (props) => {
  // translate areas objects into grid-template-areas syntax
  const cells = props.rows.map(() => props.columns.map(() => '.'));
  props.areas.forEach((area) => {
    for (let row = area.start[1]; row <= area.end[1]; row += 1) {
      for (let column = area.start[0]; column <= area.end[0]; column += 1) {
        cells[row][column] = area.name;
      }
    }
  });
  return `grid-template-areas: ${cells.map(r => `"${r.join(' ')}"`).join(' ')};`;
};

const StyledGrid = styled.div`
  display: grid;
  box-sizing: border-box;
  height: 100%;

  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.areas && areasStyle(props)}
  ${props => props.columns && columnsStyle}
  ${props => props.gap && gapStyle(props)}
  ${props => props.justify && justifyStyle}
  ${props => props.justifyContent && justifyContentStyle}
  ${props => props.rows && rowsStyle}
`;

export default StyledGrid.extend`
  ${props => props.theme.grid && props.theme.grid.extend}
`;
