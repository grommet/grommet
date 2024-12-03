import React from 'react';
import { Box, Cards, Card, CardBody, CardFooter, Heading, Data, DataSort, DataSearch, DataFilters, Main, Text, Toolbar } from 'grommet';
import { DATA } from '../../DataTable/stories/data';
import { DataSummary } from '../../DataSummary';
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
    React.createElement(Main, null, /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      properties: {
        location: {
          label: 'Location',
          sort: false,
          options: ['Fort Collins', 'Palo Alto', 'Boise', 'San Francisco']
        },
        name: {
          filter: false
        },
        paid: {
          search: false,
          label: 'Paid'
        },
        percent: {
          search: false,
          label: 'Percent'
        },
        date: {
          label: 'Date'
        }
      }
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataSort, {
      drop: true
    }), /*#__PURE__*/React.createElement(DataFilters, {
      layer: true
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(Cards, {
      size: "medium"
    }, function (item) {
      return /*#__PURE__*/React.createElement(Card, {
        as: "li",
        key: item.name,
        pad: "small"
      }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
        level: 2,
        margin: "none"
      }, item.name), /*#__PURE__*/React.createElement(Text, null, amountFormatter.format(item.paid / 100))), /*#__PURE__*/React.createElement(CardFooter, null, item.location || '--'));
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