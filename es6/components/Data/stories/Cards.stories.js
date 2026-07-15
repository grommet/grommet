import React from 'react';
import { Box, Card, CardBody, CardFooter, Cards, Data, Heading, Main } from 'grommet';
import { DATA } from '../../DataTable/stories/data';
export var Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Main, null, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      toolbar: true
    }, /*#__PURE__*/React.createElement(Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/React.createElement(Card, {
        as: "li",
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
        level: 2,
        margin: "none"
      }, item.name)), /*#__PURE__*/React.createElement(CardFooter, null, item.location || '--'));
    }))))
    // </Grommet>
  );
};
Example.storyName = 'Cards';
Example.args = {
  full: true
};
export default {
  title: 'Data/Data/Cards'
};