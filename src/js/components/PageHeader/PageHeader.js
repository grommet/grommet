import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Grid } from '../Grid';
import { Paragraph } from '../Paragraph';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

// QUESTIONS:
// 1. do we want the heading / paragraph to fill or let them wrap?
// 2. should the rest go on the header or the grid?

const defaultAreas = ['actions', 'context', 'subtitle', 'title', 'empty'];

const getCustomAreas = (theme) => {
  const customAreas = [];
  theme.pageHeader.areas.forEach((area) => {
    if (Array.isArray(area)) {
      area.forEach((s) => !defaultAreas.includes(s) && customAreas.push(s));
    } else if (!defaultAreas.includes(area)) customAreas.push(area);
  });

  return customAreas;
};

const PageHeader = forwardRef(
  ({ title, subtitle, actions, context, ...rest }, ref) => {
    const theme = useContext(ThemeContext);
    const size = useContext(ResponsiveContext);

    // Allow caller to add their own blank areas to the Grid
    // See: Custom story
    const customAreas = getCustomAreas(theme);

    return (
      <Header ref={ref} {...rest}>
        <Grid
          columns={theme.pageHeader[size].columns}
          rows={theme.pageHeader[size].rows}
          areas={theme.pageHeader.areas}
          gap={theme.pageHeader.gap}
          fill="horizontal"
        >
          <Box align="start" gridArea="context">
            {context}
          </Box>
          <Box gridArea="title">
            {typeof title === 'string' ? (
              <Heading level={1} {...theme.pageHeader.title}>
                {title}
              </Heading>
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
          <Box align="start" gridArea="actions">
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
