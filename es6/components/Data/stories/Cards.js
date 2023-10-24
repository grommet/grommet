import React from 'react';
import { Card, CardBody, CardFooter, Cards, DataFilters, DataFilter, DataSearch, DataSummary, Grid, Heading, Notification, Toolbar } from 'grommet';
import { Data } from '../Data';
import { DATA } from '../../DataTable/stories/data';
export var Example = function Example() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'xlarge']],
      justifyContent: "center",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    }, /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }))), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(Cards, null, function (item) {
      return /*#__PURE__*/React.createElement(Card, {
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
        level: 2,
        size: "small",
        margin: "none"
      }, item.name)), /*#__PURE__*/React.createElement(CardFooter, null, item.location));
    })))
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