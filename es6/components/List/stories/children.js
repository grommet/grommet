import React from 'react';
import { storiesOf } from '@storybook/react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Box, Grommet, grommet, List, Text } from 'grommet';
export var data = ['Boise', 'Fort Collins', 'Bay Area', 'North Carolina'];
export var ChildrenExample = function ChildrenExample() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    height: "100%",
    background: "light-2"
  }, /*#__PURE__*/React.createElement(List, {
    data: data,
    pad: "medium"
  }, function (datum, index) {
    return /*#__PURE__*/React.createElement(Box, {
      key: index,
      direction: "row-responsive",
      gap: "large",
      size: "xsmall",
      align: "center"
    }, /*#__PURE__*/React.createElement(Gremlin, {
      size: "large"
    }), /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, datum));
  })));
};
storiesOf('List', module).add('children', function () {
  return /*#__PURE__*/React.createElement(ChildrenExample, null);
});