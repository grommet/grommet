import React, { useContext, useEffect } from 'react';

import {
  Box,
  Button,
  Heading,
  ResponsiveContext,
  Text,
  ThemeContext,
} from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

// Some content to show the effects of responsive layout.
// The heading will change size at the small breakpoint
// and the child Text items will switch from row to column
// layout at the small breakpoint.
const Content = ({ title, children }) => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const smallBreakpoint = theme.global.breakpoints.small.value;
  return (
    <Box pad="medium">
      <Heading>{title}</Heading>
      <Box direction="row-responsive" gap={{ column: 'medium', row: 'xsmall' }}>
        <Text>I am row-responsive</Text>
        <Text>Small breakpoint: {smallBreakpoint}</Text>
        {children}
        <Text>
          Current size:&nbsp;<Text weight="bold">{size}</Text>{' '}
        </Text>
      </Box>
    </Box>
  );
};

const App = ({ title, responsive = true }) => {
  const widthRef = React.useRef(undefined);
  const containerRef = React.useRef(undefined);

  // track the width of the container just so we can display it as it changes
  useEffect(() => {
    let resizeObserver;
    const element = containerRef.current;
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      resizeObserver = new window.ResizeObserver((entries) => {
        const entry = entries[0].borderBoxSize[0];
        const width = entry?.inlineSize;
        if (widthRef.current) {
          widthRef.current.innerText = `Container width: ${width.toFixed()}px`;
        }
      });
      if (element) {
        resizeObserver.observe(containerRef.current);
      }
    } else {
      // fallback for server side rendering
      const width = containerRef.current.getBoundingClientRect();
      if (widthRef.current) {
        widthRef.current.innerText = `Container width: ${width.toFixed()}px`;
      }
    }
    return () => {
      if (resizeObserver && element) {
        resizeObserver.unobserve(element);
      }
    };
  });

  return (
    <Box ref={containerRef} gap="medium" flex="grow" responsive={responsive}>
      <Content title={title}>
        <Text ref={widthRef} />
      </Content>
    </Box>
  );
};

const SidePanel = () => {
  const [open, setOpen] = React.useState(true);
  const onToggle = () => setOpen((prev) => !prev);
  return (
    <Box direction="row" align="start">
      <Button
        icon={open ? <FormNext /> : <FormPrevious />}
        onClick={onToggle}
      />
      {open && (
        <Box
          width="large"
          border={{ side: 'left' }}
          align="center"
          justify="center"
          fill="vertical"
        >
          <Text>Right hand side</Text>
        </Box>
      )}
    </Box>
  );
};

export const ResponsiveContainer = () => (
  <Box direction="row" height="100vh" width="100vw" overflow="hidden">
    <Box overflow="auto" fill="horizontal">
      <App title="Responsive to container" responsive="container" />
      <App title="Responsive to window" />
    </Box>
    <SidePanel />
  </Box>
);

ResponsiveContainer.storyName = 'Responsive container';
ResponsiveContainer.parameters = {
  chromatic: { disable: true },
};
export default {
  title: `Layout/Box/Responsive container`,
};
