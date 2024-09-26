import { css } from 'styled-components';
import { normalizeColor } from './colors';
import { breakpointStyle } from './mixins';

export const responsiveBorderStyle = (data, theme) => {
  const color = normalizeColor(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const style = data.style || 'solid';
  const side = typeof data === 'string' ? data : data.side || 'all';

  const styles = [];

  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  if (!breakpoint.borderSize) breakpoint.borderSize = theme.global.borderSize;
  const value =
    breakpoint &&
    (breakpoint.borderSize[borderSize] || borderSize) &&
    `${style} ${breakpoint.borderSize[borderSize] || borderSize} ${color}`;
  if (!value) return undefined;
  if (
    side === 'top' ||
    side === 'bottom' ||
    side === 'left' ||
    side === 'right'
  ) {
    styles.push(`border-${side}: ${value};`);
  } else if (side === 'end' || side === 'start') {
    styles.push(`border-inline-${side}: ${value};`);
  } else if (side === 'vertical') {
    styles.push(`
      border-left: ${value};
      border-right: ${value};
    `);
  } else if (side === 'horizontal') {
    styles.push(`
      border-top: ${value};
      border-bottom: ${value};
    `);
  } else if (side !== 'between') {
    styles.push(`border: ${value};`);
  }

  if (data.image) {
    if (typeof data.image === 'object') {
      const { slice, source } = data.image;
      if (source) {
        styles.push(`border-image-source: ${source};`);
      }
      if (slice) {
        styles.push(`border-image-slice: ${slice};`);
      }
    }
  }
  return styles.join('\n');
};

export const borderStyle = (borderData, responsive, theme) => {
  const borderStyles = [];

  (Array.isArray(borderData) ? borderData : [borderData]).forEach((data) => {
    const styles = [];
    const color = normalizeColor(data.color || 'border', theme);
    const borderSize = data.size || 'xsmall';
    const style = data.style || 'solid';
    const side = typeof data === 'string' ? data : data.side || 'all';
    const value = `${style} ${
      theme.global.borderSize[borderSize] || borderSize
    } ${color}`;
    const responsiveStyle = responsive && responsiveBorderStyle(data, theme);
    const breakpoint =
      responsiveStyle &&
      theme.box.responsiveBreakpoint &&
      theme.global.breakpoints[theme.box.responsiveBreakpoint];
    if (
      side === 'top' ||
      side === 'bottom' ||
      side === 'left' ||
      side === 'right'
    ) {
      styles.push(`border-${side}: ${value};`);
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    } else if (side === 'end' || side === 'start') {
      styles.push(css`border-inline-${side}: ${value};`);
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    } else if (side === 'vertical') {
      styles.push(css`
        border-left: ${value};
        border-right: ${value};
      `);
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    } else if (side === 'horizontal') {
      styles.push(css`
        border-top: ${value};
        border-bottom: ${value};
      `);
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    } else if (side === 'between') {
      // no-op
    } else {
      styles.push(
        css`
          border: ${value};
        `,
      );
      if (responsiveStyle) {
        styles.push(breakpointStyle(breakpoint, responsiveStyle));
      }
    }
    if (data.image) {
      if (typeof data.image === 'object') {
        const { slice, source } = data.image;
        if (source) {
          styles.push(`border-image-source: ${source};`);
        }
        if (slice) {
          styles.push(`border-image-slice: ${slice};`);
        }
      }
    }
    borderStyles.push(styles);
  });

  return borderStyles;
};
