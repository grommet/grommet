import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { allItems } from './Basics';

var LazyInfiniteScroll = function LazyInfiniteScroll() {
  var _useState = useState(allItems.slice(0, 200)),
      items = _useState[0],
      setItems = _useState[1];

  var onMore = function onMore() {
    setTimeout(function () {
      setItems(allItems.slice(0, items.length + 200));
    }, 1000);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, null, React.createElement(InfiniteScroll, {
    items: items,
    onMore: onMore
  }, function (item) {
    return React.createElement(Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, React.createElement(Text, null, item));
  })));
};

storiesOf('InfiniteScroll', module).add('onMore', function () {
  return React.createElement(LazyInfiniteScroll, null);
});