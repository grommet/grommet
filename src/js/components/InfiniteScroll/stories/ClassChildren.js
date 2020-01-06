import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { MnetUIBase, Box, InfiniteScroll, Text } from 'mnet-ui-base';
import { mnet } from 'mnet-ui-base/themes';

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
  <MnetUIBase theme={mnet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => <MyItem key={item} item={item} />}
      </InfiniteScroll>
    </Box>
  </MnetUIBase>
);

storiesOf('InfiniteScroll', module).add('Class Children', () => (
  <ClassChildrenInfiniteScroll />
));
