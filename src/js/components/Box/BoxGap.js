import React from 'react';
import styled, { css } from 'styled-components';

import { defaultProps } from '../../default-props';
import { breakpointStyle } from '../../utils';

const BoxGap = ({ direction, gap, responsive, theme, ...rest }) => (
  <div {...rest} />
);

const gapStyle = (direction, gap, responsive, theme) => {
  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  const responsiveSize =
    breakpoint && breakpoint.edgeSize[gap] && breakpoint.edgeSize[gap];
  const styles = [];
  if (direction === 'column') {
    styles.push(
      css`
        height: ${theme.global.edgeSize[gap]};
      `,
    );
    if (responsiveSize) {
      styles.push(breakpointStyle(breakpoint, `height: ${responsiveSize};`));
    }
  } else {
    styles.push(`width: ${theme.global.edgeSize[gap]};`);
    if (responsive && direction === 'row-responsive') {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        width: auto;
        height: ${responsiveSize};
      `,
        ),
      );
    }
  }
  return styles;
};

const StyledBoxGap = styled(BoxGap).attrs(props => ({
  theme: props.theme,
}))`
  flex: 0 0 auto;
  ${props =>
    props.gap &&
    gapStyle(props.direction, props.gap, props.responsive, props.theme)};
`;

StyledBoxGap.defaultProps = {};
Object.setPrototypeOf(StyledBoxGap.defaultProps, defaultProps);

export { StyledBoxGap as BoxGap };
