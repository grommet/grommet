function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { grommet } from 'grommet/themes';
import { Grommet, Box, InfiniteScroll, Text } from 'grommet';
var allItems = Array(240).fill().map(function (_, i) {
  return i + 1;
});

var Example = function Example(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(InfiniteScroll, _extends({
    items: allItems
  }, props), function (item) {
    return /*#__PURE__*/React.createElement(Box, {
      key: item,
      height: item <= 25 ? 'xsmall' : 'xxsmall',
      pad: "medium",
      border: {
        side: 'bottom'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Text, null, "item ", item));
  })));
};

export var Height = function Height() {
  return /*#__PURE__*/React.createElement(Example, null);
};
export var HeightReplace = function HeightReplace() {
  return /*#__PURE__*/React.createElement(Example, {
    replace: true
  });
};
Height.story = {
  name: 'Variable item height',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};
HeightReplace.story = {
  name: 'Variable item height w/replace',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};