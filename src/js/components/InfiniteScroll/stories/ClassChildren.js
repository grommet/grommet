import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, InfiniteScroll, Text } from 'mnet-ui-base';

import { allItems } from './Basics';

/* eslint-disable react/prefer-stateless-function */
class MyItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <Box pad="medium" border={{ side: 'bottom' }} align="center">
        <Text>{item}</Text>
      </Box>
    );
  }
}

const ClassChildrenInfiniteScroll = props => (
  <>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => <MyItem key={item} item={item} />}
      </InfiniteScroll>
    </Box>
  </>
);

storiesOf('InfiniteScroll', module).add('Class Children', () => (
  <ClassChildrenInfiniteScroll />
));
