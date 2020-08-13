import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, InfiniteScroll } from 'grommet';
import { grommet } from 'grommet/themes';

// const range = Array(400)
//   .fill()
//   .map((x, i) => i + 1);

const items = [];
while (items.length < 4) items.push(items.length);

const range = Array(400)
  .fill()
  .map((x, i) => `item ${i}`);

export const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const TempInfiniteScroll = ({ ...rest }) => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={range} show={20} {...rest}>
        {i => {
          // console.log('rendering', i);
          return <div key={i}>{i}</div>;
        }}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

storiesOf('InfiniteScroll', module)
  .add('Temp Show 20', () => <TempInfiniteScroll />)
  .add('Temp Show 20 with Replace', () => <TempInfiniteScroll replace />)
  .add('Temp Show 20 with Step', () => <TempInfiniteScroll step={20} />)
  .add('Temp Show 20 with Step & Replace', () => (
    <TempInfiniteScroll replace step={20} />
  ))
  .add('Temp Jest show', () => (
    <Grommet theme={grommet}>
      <InfiniteScroll items={allItems} step={2} show={3}>
        {(item, index) => <div key={index}>{item}</div>}
      </InfiniteScroll>
    </Grommet>
  ))
  .add('Temp Jest show 2', () => (
    <Grommet>
      <InfiniteScroll items={items} step={2} show={3}>
        {(item, index) => <div key={index}>{item}</div>}
      </InfiniteScroll>
    </Grommet>
  ));
