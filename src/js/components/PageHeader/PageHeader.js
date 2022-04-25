import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Grid } from '../Grid';
import { Paragraph } from '../Paragraph';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const defaultAreas = ['actions', 'context', 'subtitle', 'title', 'empty'];

const getCustomAreas = (theme, size) => {
  const customAreas = [];
  (theme.pageHeader[size] || theme.pageHeader).areas.forEach((area) => {
    if (Array.isArray(area)) {
      area.forEach((s) => !defaultAreas.includes(s) && customAreas.push(s));
    } else if (!defaultAreas.includes(area)) customAreas.push(area);
  });

  return customAreas;
};

const PageHeader = forwardRef(
  ({ actions, context, gridProps, subtitle, title, ...rest }, ref) => {
    const theme = useContext(ThemeContext);
    const size = useContext(ResponsiveContext);

    // Allow caller to add their own blank areas to the Grid
    // See: Custom story
    const customAreas = getCustomAreas(theme, size);

    return (
      <Header ref={ref} {...rest}>
        <Grid
          columns={(theme.pageHeader[size] || theme.pageHeader).columns}
          rows={(theme.pageHeader[size] || theme.pageHeader).rows}
          areas={(theme.pageHeader[size] || theme.pageHeader).areas}
          gap={(theme.pageHeader[size] || theme.pageHeader).gap}
          fill="horizontal"
          {...gridProps}
        >
          <Box align="start" gridArea="context">
            {context}
          </Box>
          <Box gridArea="title">
            {typeof title === 'string' ? (
              <Heading {...theme.pageHeader.title}>{title}</Heading>
            ) : (
              title
            )}
          </Box>
          <Box gridArea="subtitle">
            {typeof subtitle === 'string' ? (
              <Paragraph {...theme.pageHeader.subtitle}>{subtitle}</Paragraph>
            ) : (
              subtitle
            )}
          </Box>
          <Box align="end" gridArea="actions">
            {actions}
          </Box>
          <Box gridArea="empty" />
          {customAreas &&
            customAreas.map((area, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box key={index} gridArea={area} />
            ))}
        </Grid>
      </Header>
    );
  },
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };
