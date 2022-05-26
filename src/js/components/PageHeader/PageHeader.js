import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Grid } from '../Grid';
import { Paragraph } from '../Paragraph';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const PageHeader = forwardRef(
  ({ actions, children, gridProps, parent, subtitle, title, ...rest }, ref) => {
    const theme = useContext(ThemeContext);
    const breakpoint = useContext(ResponsiveContext);

    const { areas, columns, gap, rows } =
      theme.pageHeader[breakpoint] || theme.pageHeader.medium;

    return (
      <Header
        ref={ref}
        direction="column"
        gap="none"
        pad={theme.pageHeader.pad}
        {...rest}
      >
        <Grid
          columns={columns}
          rows={rows}
          areas={areas}
          gap={gap}
          fill="horizontal"
          {...gridProps}
        >
          <Box gridArea="parent" {...theme.pageHeader.parent}>
            {parent}
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
          <Box gridArea="actions" {...theme.pageHeader.actions}>
            {actions}
          </Box>
        </Grid>
        {children}
      </Header>
    );
  },
);

PageHeader.displayName = 'PageHeader';

export { PageHeader };
