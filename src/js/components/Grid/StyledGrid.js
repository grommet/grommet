import styled, { css } from 'styled-components';
import { defaultProps } from '../../default-props';
import {
  alignContentStyle,
  alignStyle,
  borderStyle,
  edgeStyle,
  genericStyles,
  heightStyle,
  widthStyle,
} from '../../utils';

const fillStyle = (fill) => {
  if (!fill) {
    return fill;
  }
  if (fill === 'horizontal') {
    return 'width: 100%;';
  }
  if (fill === 'vertical') {
    return 'height: 100%;';
  }
  return `
      width: 100%;
      height: 100%;
    `;
};

const JUSTIFY_MAP = {
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const justifyStyle = css`
  justify-items: ${(props) => JUSTIFY_MAP[props.justify]};
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
  justify-content: ${(props) => JUSTIFY_CONTENT_MAP[props.justifyContent]};
`;

const gapSizes = (props) => {
  const result = [];
  if (typeof props.gap === 'string') {
    const size = props.theme.global.edgeSize[props.gap] || props.gap;
    result[0] = size;
    result[1] = size;
  } else if (props.gap) {
    if (props.gap.row)
      result[0] = props.theme.global.edgeSize[props.gap.row] || props.gap.row;
    if (props.gap.column)
      result[1] =
        props.theme.global.edgeSize[props.gap.column] || props.gap.column;
  }
  return result;
};

const gapStyle = (props) => {
  const sizes = gapSizes(props);
  if (sizes[0] !== undefined && sizes[1] !== undefined) {
    return `grid-gap: ${sizes[0]} ${sizes[1]};`;
  }
  if (sizes[0] !== undefined) {
    return `grid-row-gap: ${sizes[0]};`;
  }
  if (sizes[1] !== undefined) {
    return `grid-column-gap: ${sizes[1]};`;
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

const normalizeSize = (size, props) =>
  SIZE_MAP[size] || props.theme.global.size[size] || size;

const getRepeatCount = (count) =>
  typeof count === 'number' ? count : `auto-${count || 'fit'}`;

const getRepeatSize = (size, props) => {
  if (size === 'flex') return '1fr';
  const gaps = gapSizes(props);
  let min;
  let max;
  let minFill;
  if (Array.isArray(size)) {
    const [minSize = 'auto', maxSize = 'auto'] = size;
    min = normalizeSize(minSize, props);
    if (min.search(/px/) !== -1) minFill = true;
    max = normalizeSize(maxSize, props);
    if (gaps[1] !== undefined) {
      // account for the column gap when using fractional sizes, e.g. 1/3
      if (minSize.indexOf('/') !== -1)
        min = `calc(${min} - (${gaps[1]} * (1 - ${minSize})))`;
      if (maxSize.indexOf('/') !== -1)
        max = `calc(${max} - (${gaps[1]} * (1 - ${maxSize})))`;
    }
  } else {
    min = normalizeSize(size, props);
    if (min.search(/px/) !== -1) minFill = true;
    max = '1fr';
    if (gaps[1] !== undefined) {
      // account for column gap with fractional sizes, e.g. 1/3
      if (size.indexOf('/') !== -1)
        min = `calc(${min} - (${gaps[1]} * (1 - ${size})))`;
    }
  }
  if (minFill) {
    // ensure we never go beyond the container width,
    // for mobile/narrow situations
    min = `min(${min}, 100%)`;
  }
  return `minmax(${min}, ${max})`;
};

const columnsStyle = (props) => {
  if (Array.isArray(props.columns)) {
    return css`
      grid-template-columns: ${props.columns
        .map((s) => {
          if (Array.isArray(s)) {
            return `minmax(${normalizeSize(s[0], props)}, ${normalizeSize(
              s[1],
              props,
            )})`;
          }
          return normalizeSize(s, props);
        })
        .join(' ')};
    `;
  }
  if (typeof props.columns === 'object') {
    return css`
      grid-template-columns: repeat(
        ${getRepeatCount(props.columns.count)},
        ${getRepeatSize(props.columns.size, props)}
      );
    `;
  }
  return css`
    grid-template-columns: repeat(
      auto-fill,
      ${getRepeatSize(props.columns, props)}
    );
  `;
};

const rowsStyle = (props) => {
  if (Array.isArray(props.rowsProp)) {
    return css`
      grid-template-rows: ${props.rowsProp
        .map((s) => {
          if (Array.isArray(s)) {
            return `minmax(${normalizeSize(s[0], props)}, ${normalizeSize(
              s[1],
              props,
            )})`;
          }
          return normalizeSize(s, props);
        })
        .join(' ')};
    `;
  }
  return css`
    grid-auto-rows: ${props.theme.global.size[props.rowsProp]};
  `;
};

const areasStyle = (props) => {
  // translate areas objects into grid-template-areas syntax
  if (!Array.isArray(props.rowsProp) || !Array.isArray(props.columns)) {
    console.warn('Grid `areas` requires `rows` and `columns` to be arrays.');
  }
  if (
    Array.isArray(props.areas) &&
    props.areas.every((area) => Array.isArray(area))
  ) {
    return `grid-template-areas: ${props.areas
      .map((area) => `"${area.join(' ')}"`)
      .join(' ')};`;
  }
  const cells = props.rowsProp.map(() => props.columns.map(() => '.'));
  props.areas.forEach((area) => {
    for (let row = area.start[1]; row <= area.end[1]; row += 1) {
      for (let column = area.start[0]; column <= area.end[0]; column += 1) {
        cells[row][column] = area.name;
      }
    }
  });
  return `grid-template-areas: ${cells
    .map((r) => `"${r.join(' ')}"`)
    .join(' ')};`;
};

const StyledGrid = styled.div.attrs((props) => ({
  'aria-label': props.a11yTitleProp,
}))`
  display: grid;
  box-sizing: border-box;

  ${genericStyles}
  ${(props) =>
    props.border && borderStyle(props.border, props.responsive, props.theme)}
  ${(props) => fillStyle(props.fillContainer)}
  ${(props) => props.align && alignStyle}
  ${(props) => props.alignContent && alignContentStyle}
  ${(props) => props.areas && areasStyle(props)}
  ${(props) => props.columns && columnsStyle(props)}
  ${(props) => props.gap && gapStyle(props)}
  ${(props) => props.justify && justifyStyle}
  ${(props) => props.justifyContent && justifyContentStyle}
  ${(props) =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.global.edgeSize.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) => props.rowsProp && rowsStyle(props)}
  ${(props) => props.heightProp && heightStyle(props.heightProp, props.theme)}
  ${(props) => props.widthProp && widthStyle(props.widthProp, props.theme)}
  ${(props) => props.theme.grid && props.theme.grid.extend}
`;

StyledGrid.defaultProps = {};
Object.setPrototypeOf(StyledGrid.defaultProps, defaultProps);

export { StyledGrid };
