function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var allItems = Array(2000).fill().map(function (_, i) {
  return "item " + (i + 1);
});

var SimpleInfiniteScroll = function SimpleInfiniteScroll(props) {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, null, React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
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

storiesOf('InfiniteScroll', module).add('Simple', function () {
  return React.createElement(SimpleInfiniteScroll, null);
}).add('Show 118th item', function () {
  return React.createElement(SimpleInfiniteScroll, {
    show: 117
  });
}).add('Marker', function () {
  return React.createElement(SimpleInfiniteScroll, {
    renderMarker: function renderMarker(marker) {
      return React.createElement(Box, {
        pad: "medium",
        background: "accent-1"
      }, marker);
    }
  });
});