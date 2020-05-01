function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';
import { allItems } from './Basics';

var OnMoreInfiniteScroll = function OnMoreInfiniteScroll(_ref) {
  var props = _ref.props;

  var _useState = useState(allItems.slice(0, 50)),
      items = _useState[0],
      setItems = _useState[1];

  var onMore = function onMore() {
    setTimeout(function () {
      setItems(allItems.slice(0, items.length + 50));
    }, 1000);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
    items: items,
    onMore: onMore
  }, props), function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, item));
  })));
};

storiesOf('InfiniteScroll', module).add('onMore', function () {
  return /*#__PURE__*/React.createElement(OnMoreInfiniteScroll, null);
}).add('onMore step', function () {
  return /*#__PURE__*/React.createElement(OnMoreInfiniteScroll, {
    step: 75
  });
});