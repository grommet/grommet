import React, { forwardRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { Box } from '../Box';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Grid } from '../Grid';
import { Paragraph } from '../Paragraph';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';

const PageHeader = forwardRef(
  (
    {
      actions,
      children,
      gridProps: gridPropsProp,
      parent,
      responsive,
      subtitle,
      title,
      ...rest
    },
    ref,
  ) => {
    const theme = useContext(ThemeContext);
    const breakpoint = useContext(ResponsiveContext);

    let actionsProps = { ...theme.pageHeader.actions };
    let gridProps = theme.pageHeader[breakpoint] || theme.pageHeader.medium;

    if (
      responsive &&
      theme.pageHeader.responsive.breakpoints.includes(breakpoint)
    ) {
      gridProps = { ...gridProps, ...theme.pageHeader.responsive };
      actionsProps = {
        ...actionsProps,
        ...theme.pageHeader.responsive.actions,
      };
    }

    const { areas, columns, gap, rows } = gridProps;

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
          {...gridPropsProp}
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
          <Box gridArea="actions" {...actionsProps}>
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
