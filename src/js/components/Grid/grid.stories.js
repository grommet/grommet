import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Button, Grid, Text, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

class AppGrid extends Component {
  state = { sidebar: true };

  render() {
    const { sidebar } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background="dark-2"
          >
            <Button onClick={() => this.setState({ sidebar: !sidebar })}>
              <Text size="large">Title</Text>
            </Button>
            <Text>my@email</Text>
          </Box>
          {sidebar && (
            <Box
              gridArea="sidebar"
              background="dark-3"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              {['First', 'Second', 'Third'].map(name => (
                <Button key={name} href="#" hoverIndicator>
                  <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Text>{name}</Text>
                  </Box>
                </Button>
              ))}
            </Box>
          )}
          <Box gridArea="main" justify="center" align="center">
            <Text>main</Text>
          </Box>
        </Grid>
      </Grommet>
    );
  }
}

const Percentages = () => (
  <Grommet theme={grommet} full>
    <Grid
      fill
      areas={[
        { name: 'nav', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ]}
      columns={['small', 'flex']}
      rows={['flex']}
      gap="small"
    >
      <Box gridArea="nav" background="brand" />
      <Box gridArea="main" background="brand" />
    </Grid>
  </Grommet>
);

const NColumnGrid = () => (
  <Grommet theme={grommet} full>
    <Grid
      columns={{
        count: 6,
        size: 'auto',
      }}
      gap="small"
    >
      <Box background="brand">Item 1</Box>
      <Box background="brand">Item 2</Box>
      <Box background="brand">Item 3</Box>
      <Box background="brand">Item 4</Box>
      <Box background="brand">Item 5</Box>
      <Box background="brand">Item 6</Box>
    </Grid>
  </Grommet>
);

// Two responsive grids
//    - First one with known number of elements
//    - Second one with unkown number of elements

// set custom breakpoints so we can see the changes
const customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      small: {
        value: 600,
      },
      medium: {
        value: 900,
      },
      large: 3000,
    },
  },
});

// columns, rows and areas are for Grid with a known number of contents / boxes.

// if size if small, we only 1 column
// if size if medium, we only 2 column
// if size if large or xlarge, we 3 three columns
const columns = {
  small: ['auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto'],
};

// if size if small, we have 3 rows
// if size if medium, we have 2 rows
// if size if large or xlarge, we have 1 row
const rows = {
  small: ['xsmall', 'xsmall', 'xsmall'],
  medium: ['xsmall', 'xsmall'],
  large: ['xsmall'],
  xlarge: ['xsmall'],
};

// set the different areas you need for every size
const fixedGridAreas = {
  small: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'test', start: [0, 1], end: [0, 1] },
    { name: 'test1', start: [0, 2], end: [0, 2] },
  ],
  medium: [
    { name: 'header', start: [0, 0], end: [1, 0] },
    { name: 'test', start: [0, 1], end: [0, 1] },
    { name: 'test1', start: [1, 1], end: [1, 1] },
  ],
  large: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'test', start: [1, 0], end: [1, 0] },
    { name: 'test1', start: [2, 0], end: [2, 0] },
  ],
  xlarge: [
    { name: 'header', start: [0, 0], end: [0, 0] },
    { name: 'test', start: [1, 0], end: [1, 0] },
    { name: 'test1', start: [2, 0], end: [2, 0] },
  ],
};

// let's say this is returned from an API
const animals = [
  'dog',
  'cat',
  'pig',
  'cow',
  'giraffe',
  'elephant',
  'dinosaur',
  'chicken',
  'duck',
  'tiger',
  'lion',
  'cheetah',
];

// Create box for each animal
const listAnimalsBoxes = animals.map(animalName => (
  <Box
    elevation="large"
    key={animalName}
    background="light-3"
    flex={false}
    justify="center"
    align="center"
  >
    <Heading level={2}>{animalName}</Heading>
  </Box>
));

const ResponsiveContext = ({
  children,
  overrideColumns,
  overrideRows,
  areas,
  ...props
}) => (
  <ResponsiveContext.Consumer>
    {size => {
      // take into consideration if not array is sent but a simple string
      let columnsVal = columns;
      if (columns) {
        if (columns[size]) {
          columnsVal = columns[size];
        }
      }

      let rowsVal = rows;
      if (rows) {
        if (rows[size]) {
          rowsVal = rows[size];
        }
      }

      // also if areas is a simple array not an object of arrays for different sizes
      let areasVal = areas;
      if (areas && !Array.isArray(areas)) areasVal = areas[size];

      return (
        <Grid
          {...props}
          areas={!areasVal ? undefined : areasVal}
          rows={!rowsVal ? size : rowsVal}
          columns={!columnsVal ? size : columnsVal}
        >
          {children}
        </Grid>
      );
    }}
  </ResponsiveContext.Consumer>
);

const ResponsiveGrid = () => (
  <Grommet theme={customBreakpoints}>
    <Box>
      <Heading level={2}>Resize me.</Heading>
      <ResponsiveContext
        rows={rows}
        columns={columns}
        gap="small"
        areas={fixedGridAreas}
        margin="medium"
      >
        <Box
          gridArea="header"
          background="neutral-2"
          justify="center"
          align="center"
        >
          <strong>Box 1</strong>
        </Box>
        <Box
          gridArea="test"
          background="neutral-3"
          justify="center"
          align="center"
        >
          <strong>Box 2</strong>
        </Box>
        <Box
          gridArea="test1"
          background="neutral-4"
          justify="center"
          align="center"
        >
          <strong>Box 3</strong>
        </Box>
      </ResponsiveContext>
      <ResponsiveContext
        gap="small"
        margin="medium"
        columns="medium"
        rows="xsmall"
      >
        {listAnimalsBoxes}
      </ResponsiveContext>
    </Box>
  </Grommet>
);

storiesOf('Grid', module)
  .add('App', () => <AppGrid />)
  .add('Percentages', () => <Percentages />)
  .add('N-column layout', () => <NColumnGrid />)
  .add('Responsive Grid', () => <ResponsiveGrid />);
