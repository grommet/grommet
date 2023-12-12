import React from 'react';
import { Box, Cards, Card, CardBody, CardFooter, Heading, Data, DataSort, DataSearch, DataFilters, Notification, Text, Toolbar } from 'grommet';
import { DATA } from '../../DataTable/stories/data';
var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
export var Properties = function Properties() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      align: "center",
      fill: "horizontal",
      justify: "start",
      pad: "xlarge",
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Notification, {
      fill: "horizontal",
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      updateOn: "change",
      properties: {
        location: {
          sort: false,
          label: 'Location',
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco']
        },
        name: {
          filter: false
        },
        paid: {
          search: false,
          filter: false
        }
      },
      fill: "horizontal"
    }, /*#__PURE__*/React.createElement(Box, {
      gap: "medium"
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataSort, {
      drop: true
    }), /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    })), /*#__PURE__*/React.createElement(Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/React.createElement(Card, {
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
        level: 2,
        size: "small",
        margin: "none"
      }, item.name), /*#__PURE__*/React.createElement(Text, null, amountFormatter.format(item.paid / 100))), /*#__PURE__*/React.createElement(CardFooter, null, item.location));
    }))))
    // </Grommet>
  );
};
Properties.args = {
  full: true
};
export default {
  title: 'Data/Data/Properties'
};