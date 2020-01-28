import React from 'react';
import { storiesOf } from '@storybook/react';
import { Gremlin } from "grommet-icons/es6/icons/Gremlin";
import { Box, Grommet, grommet, List, Text } from 'grommet';
export var data = ['Boise', 'Fort Collins', 'Bay Area', 'North Carolina'];
export var ChildrenExample = function ChildrenExample() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "large",
    height: "100%",
    background: "light-2"
  }, React.createElement(List, {
    data: data,
    pad: "medium"
  }, function (datum, index) {
    return React.createElement(Box, {
      key: index,
      direction: "row-responsive",
      gap: "large",
      size: "xsmall",
      align: "center"
    }, React.createElement(Gremlin, {
      size: "large"
    }), React.createElement(Text, {
      weight: "bold"
    }, datum));
  })));
};
storiesOf('List', module).add('children', function () {
  return React.createElement(ChildrenExample, null);
});