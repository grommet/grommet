import React from 'react';
import { Box, Card, CardBody, Heading, Text } from 'grommet';
import { Cards } from '../Cards';
var data = [{
  city: 'Boise',
  state: 'Idaho',
  size: {
    columns: 2,
    rows: 1
  }
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California',
  size: {
    columns: 2,
    rows: 1
  }
}, {
  city: 'San Francisco',
  state: 'California',
  size: {
    columns: 1,
    rows: 2
  }
}, {
  city: 'Los Angeles',
  state: 'California'
}, {
  city: 'Portland',
  state: 'Oregon'
}, {
  city: 'Seattle',
  state: 'Washington'
}];
export var Sizable = function Sizable() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Cards, {
    id: "myGrid",
    data: data,
    pad: "medium",
    columns: ['flex', 'flex', 'flex'],
    rows: "xsmall",
    sizeKey: "size"
  }, function (datum) {
    return /*#__PURE__*/React.createElement(Card, {
      key: datum.city,
      pad: "small",
      elevation: "medium"
    }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city), /*#__PURE__*/React.createElement(Text, null, datum.state)));
  }));
};
export default {
  title: 'Visualizations/Cards/Sizable'
};