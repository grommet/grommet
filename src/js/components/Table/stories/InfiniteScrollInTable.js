import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Heading,
  grommet,
  Grommet,
  InfiniteScroll,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  Text,
} from 'grommet';

const InfiniteScrollInTable = () => {
  const step = 25;
  const [results, setResults] = useState(
    Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000000)),
  );
  const load = () => {
    console.log(`InfiniteScroll fires onMore after loading ${step} items`);
    setResults([
      ...results,
      ...Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000000)),
    ]);
  };

  return (
    <Grommet theme={grommet}>
      <Box pad="small" basis="small">
        <Heading level={3}>
          <Box gap="small">
            <strong>InfiniteScroll embedded in a Table</strong>
            <Text>
              Scroll down to load more data, open console to see loading info
            </Text>
          </Box>
        </Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Key
              </TableCell>
              <TableCell scope="col" border="bottom">
                Cartoon
              </TableCell>
              <TableCell scope="col" border="bottom">
                Movie
              </TableCell>
              <TableCell scope="col" border="bottom">
                Year
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <InfiniteScroll
              renderMarker={marker => (
                <TableRow>
                  <TableCell>{marker}</TableCell>
                </TableRow>
              )}
              scrollableAncestor="window"
              items={results}
              onMore={() => load()}
              step={step}
            >
              {result => (
                <TableRow key={result}>
                  <TableCell>{result}</TableCell>
                  <TableCell>cartoon</TableCell>
                  <TableCell>movie name</TableCell>
                  <TableCell>year</TableCell>
                </TableRow>
              )}
            </InfiniteScroll>
          </TableBody>
        </Table>
      </Box>
    </Grommet>
  );
};

storiesOf('Table', module).add(
  'InfiniteScroll',
  () => <InfiniteScrollInTable />,
  {
    chromatic: { disable: true },
  },
);
