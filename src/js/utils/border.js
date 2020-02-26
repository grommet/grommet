import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle } from './mixins';

export const borderStyle = (data, responsive, theme) => {
  const styles = [];
  const color = normalizeColor(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const style = data.style || 'solid';
  const side = typeof data === 'string' ? data : data.side || 'all';
  const value = `${style} ${theme.global.borderSize[borderSize] ||
    borderSize} ${color}`;
  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  const responsiveValue =
    responsive &&
    breakpoint &&
    (breakpoint.borderSize[borderSize] || borderSize) &&
    `${style} ${breakpoint.borderSize[borderSize] || borderSize} ${color}`;
  if (
    side === 'top' ||
    side === 'bottom' ||
    side === 'left' ||
    side === 'right'
  ) {
    styles.push(`border-${side}: ${value};`);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-${side}: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'end' || side === 'start') {
    styles.push(css`border-inline-${side}: ${value};`);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-inline-${side}: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'vertical') {
    styles.push(css`
      border-left: ${value};
      border-right: ${value};
    `);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-left: ${responsiveValue};
        border-right: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'horizontal') {
    styles.push(css`
      border-top: ${value};
      border-bottom: ${value};
    `);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-top: ${responsiveValue};
        border-bottom: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'between') {
    // no-op
  } else {
    styles.push(
      css`
        border: ${value};
      `,
    );
    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, `border: ${responsiveValue};`));
    }
  }
  return styles;
};
