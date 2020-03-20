import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import { allItems } from './Basics';

/* eslint-disable react/prefer-stateless-function */
const MyItem = ({ item }) => {
  return (
    <Box pad="medium" border={{ side: 'bottom' }} align="center">
      <Text>{item}</Text>
    </Box>
  );
};

const ClassChildrenInfiniteScroll = props => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => <MyItem key={item} item={item} />}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

storiesOf('InfiniteScroll', module).add('Class Children', () => (
  <ClassChildrenInfiniteScroll />
));
