import styled, { css } from 'styled-components';

import { edgeStyle, genericStyles } from '../../utils';
import { defaultProps } from '../../default-props';

const fillStyle = fill => {
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

const gapStyle = props => {
  if (typeof props.gap === 'string') {
    const gapSize = props.theme.global.edgeSize[props.gap] || props.gap;
    return `grid-gap: ${gapSize} ${gapSize};`;
  }
  if (props.gap.row && props.gap.column) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.row] ||
        props.gap.row};
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.column] ||
        props.gap.column};
    `;
  }
  if (props.gap.row) {
    return `
      grid-row-gap: ${props.theme.global.edgeSize[props.gap.row] ||
        props.gap.row};
    `;
  }
  if (props.gap.column) {
    return `
      grid-column-gap: ${props.theme.global.edgeSize[props.gap.column] ||
        props.gap.column};
    `;
  }
  return '';
};

const SIZE_MAP = {
  flex: '1fr',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const getRepeatCount = count =>
  typeof count === 'number' ? count : `auto-${count}`;

const getRepeatSize = (size, theme) => {
  if (Array.isArray(size)) {
    return `minmax(${theme.global.size[size[0]] || size[0]}, ${theme.global
      .size[size[1]] || size[1]})`;
  }
  if (size === 'flex') return '1fr';
  return `minmax(${theme.global.size[size] || size}, 1fr)`;
};

const sizeFor = (size, props, isRow) => {
  const mapped = SIZE_MAP[size];
  if (
    isRow &&
    mapped &&
    (!props.fillContainer || props.fillContainer === 'horizontal')
  ) {
    console.warn('Grid needs `fill` when using fractional row sizes');
  }
  return mapped || props.theme.global.size[size] || size;
};

const columnsStyle = props => {
  if (Array.isArray(props.columns)) {
    return css`
      grid-template-columns: ${props.columns
        .map(s => {
          if (Array.isArray(s)) {
            return `minmax(${sizeFor(s[0], props)}, ${sizeFor(s[1], props)})`;
          }
          return sizeFor(s, props);
        })
        .join(' ')};
    `;
  }
  if (typeof props.columns === 'object') {
    return css`
      grid-template-columns: repeat(
        ${getRepeatCount(props.columns.count)},
        ${getRepeatSize(props.columns.size, props.theme)}
      );
    `;
  }
  return css`
    grid-template-columns: repeat(
      auto-fill,
      ${getRepeatSize(props.columns, props.theme)}
    );
  `;
};

const rowsStyle = props => {
  if (Array.isArray(props.rowsProp)) {
    return css`
      grid-template-rows: ${props.rowsProp
        .map(s => {
          if (Array.isArray(s)) {
            return `minmax(${sizeFor(s[0], props, true)}, ${sizeFor(
              s[1],
              props,
              true,
            )})`;
          }
          return sizeFor(s, props, true);
        })
        .join(' ')};
    `;
  }
  return css`
    grid-auto-rows: ${props.theme.global.size[props.rowsProp]};
  `;
};

const areasStyle = props => {
  // translate areas objects into grid-template-areas syntax
  if (!Array.isArray(props.rowsProp) || !Array.isArray(props.columns)) {
    console.warn('Grid `areas` requires `rows` and `columns` to be arrays.');
  }
  if (
    Array.isArray(props.areas) &&
    props.areas.every(area => Array.isArray(area))
  ) {
    return `grid-template-areas: ${props.areas
      .map(area => `"${area.join(' ')}"`)
      .join(' ')};`;
  }
  const cells = props.rowsProp.map(() => props.columns.map(() => '.'));
  props.areas.forEach(area => {
    for (let row = area.start[1]; row <= area.end[1]; row += 1) {
      for (let column = area.start[0]; column <= area.end[0]; column += 1) {
        cells[row][column] = area.name;
      }
    }
  });
  return `grid-template-areas: ${cells
    .map(r => `"${r.join(' ')}"`)
    .join(' ')};`;
};

const StyledGrid = styled.div.attrs(props => ({
  'aria-label': props.a11yTitleProp,
}))`
  display: grid;
  box-sizing: border-box;

  ${genericStyles}
  ${props => props.fillContainer && fillStyle(props.fillContainer)}
  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.areas && areasStyle(props)}
  ${props => props.columns && columnsStyle(props)}
  ${props => props.gap && gapStyle(props)}
  ${props => props.justify && justifyStyle}
  ${props => props.justifyContent && justifyContentStyle}
  ${props =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.global.edgeSize.responsiveBreakpoint,
      props.theme,
    )}
  ${props => props.rowsProp && rowsStyle(props)}
  ${props => props.theme.grid && props.theme.grid.extend}
`;

StyledGrid.defaultProps = {};
Object.setPrototypeOf(StyledGrid.defaultProps, defaultProps);

export { StyledGrid };
