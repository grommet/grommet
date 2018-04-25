import styled, { css } from 'styled-components';

const fillStyle = (fill) => {
  if (fill === 'horizontal') {
    return 'width: 100%;';
  }
  if (fill === 'vertical') {
    return 'height: 100%;';
  }
  if (fill) {
    return `
      width: 100%;
      height: 100%;
    `;
  }
  return undefined;
};

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
  justify-items: ${props => JUSTIFY_MAP[props.justify]};
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
  if (props.gap.row && props.gap.column) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.row]};
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.column]};
    `;
  }
  if (props.gap.row) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.row]};
    `;
  }
  if (props.gap.column) {
    return `
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.column]};
    `;
  }
  // horizontal and vertical are deprecated, remove before 2.0.0
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

const sizeFor = (size, props) =>
  SIZE_MAP[size] || props.theme.global.size[size];

const columnsStyle = (props) => {
  if (Array.isArray(props.columns)) {
    return css`
      grid-template-columns: ${props.columns.map((s) => {
        if (Array.isArray(s)) {
          return `minmax(${sizeFor(s[0], props)}, ${sizeFor(s[1], props)})`;
        }
        return sizeFor(s, props);
      }).join(' ')};
    `;
  }
  if (typeof props.columns === 'object') {
    return css`
      grid-template-columns:
        repeat(auto-${props.columns.count},
          minmax(${props.theme.global.size[props.columns.size]}, 1fr));
    `;
  }
  return css`
    grid-template-columns:
      repeat(auto-fill, minmax(${props.theme.global.size[props.columns]}, 1fr));
  `;
};

const rowsStyle = (props) => {
  if (Array.isArray(props.rowsProp)) {
    return css`
      grid-template-rows: ${props.rowsProp.map((s) => {
        if (Array.isArray(s)) {
          return `minmax(${sizeFor(s[0], props)}, ${sizeFor(s[1], props)})`;
        }
        return sizeFor(s, props);
      }).join(' ')};
    `;
  }
  return css`
    grid-auto-rows: ${props.theme.global.size[props.rowsProp]};
  `;
};

const areasStyle = (props) => {
  // translate areas objects into grid-template-areas syntax
  const cells = props.rowsProp.map(() => props.columns.map(() => '.'));
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

  ${props => props.fillContainer && fillStyle(props.fillContainer)}
  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.areas && areasStyle(props)}
  ${props => props.columns && columnsStyle(props)}
  ${props => props.gap && gapStyle(props)}
  ${props => props.justify && justifyStyle}
  ${props => props.justifyContent && justifyContentStyle}
  ${props => props.rowsProp && rowsStyle(props)}
`;

export default StyledGrid.extend`
  ${props => props.theme.grid && props.theme.grid.extend}
`;
