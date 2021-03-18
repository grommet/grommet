import React, {
  Children,
  cloneElement,
  forwardRef,
  useContext,
} from 'react';
import { ThemeContext } from 'styled-components';

import { defaultProps } from '../../default-props';
import { parseMetricToNum } from '../../utils';
import { Button } from '../Button';
import { Grid } from '../Grid';
import { Layer } from '../Layer';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const ColumnCenter = forwardRef(
  (
    {
      children,
      gutter = 'medium',
      size = 'xlarge',
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext) || defaultProps.theme;
    const edgeSize = `${parseMetricToNum(theme.global.edgeSize[gutter])}px`;

    let content;
    if (Children.count(children) === 1) {
      content = cloneElement(Children.only(children), { gridArea: 'content' });
    } else {
      content = <Box gridArea="content" flex={false}>{children}</Box>;
    }

    return (
      <Grid
        ref={ref}
        {...rest}
        columns={[
          [edgeSize, 'flex'],
          ['auto', size],
          [edgeSize, 'flex'],
        ]}
        rows={['auto']}
        areas={[{ name: 'content', start: [1, 0], end: [1, 0] }]}
      >
        {content}
      </Grid>
    );
  },
);

let ColumnCenterDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  ColumnCenterDoc = require('./doc').doc(ColumnCenter);
}
const ColumnCenterWrapper = ColumnCenterDoc || ColumnCenter;

export { ColumnCenterWrapper as ColumnCenter };
