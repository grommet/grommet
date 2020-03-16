function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { allItems } from './Basics';
/* eslint-disable react/prefer-stateless-function */

var MyItem = function MyItem(_ref) {
  var item = _ref.item;
  return React.createElement(Box, {
    pad: "medium",
    border: {
      side: 'bottom'
    },
    align: "center"
  }, React.createElement(Text, null, item));
};

var ClassChildrenInfiniteScroll = function ClassChildrenInfiniteScroll(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, null, React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return React.createElement(MyItem, {
      key: item,
      item: item
    });
  })));
};

storiesOf('InfiniteScroll', module).add('Class Children', function () {
  return React.createElement(ClassChildrenInfiniteScroll, null);
});