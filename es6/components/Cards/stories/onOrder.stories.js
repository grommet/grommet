import React from 'react';
import { Box, Card, CardBody, Heading, Text } from 'grommet';
import { Cards } from '../Cards';
var data = [{
  id: 'bo',
  city: 'Boise',
  state: 'Idaho'
}, {
  id: 'fc',
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  id: 'ba',
  city: 'Bay Area',
  state: 'California'
}, {
  id: 'sd',
  city: 'San Diego',
  state: 'California'
}, {
  id: 'sf',
  city: 'San Francisco',
  state: 'California'
}, {
  id: 'la',
  city: 'Los Angeles',
  state: 'California'
}, {
  id: 'pt',
  city: 'Portland',
  state: 'Oregon'
}, {
  id: 'se',
  city: 'Seattle',
  state: 'Washington'
}];
export var OnOrder = function OnOrder() {
  var _React$useState = React.useState(data),
    orderedData = _React$useState[0],
    setOrderedData = _React$useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    fill: true
  }, /*#__PURE__*/React.createElement(Cards, {
    id: "myGrid",
    data: orderedData,
    pad: "medium",
    columns: ['flex', 'flex', 'flex'],
    onOrder: setOrderedData
  }, function (datum) {
    return /*#__PURE__*/React.createElement(Card, {
      key: datum.city,
      pad: "medium",
      elevation: "medium"
    }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city), /*#__PURE__*/React.createElement(Text, null, datum.state)));
  }));
};
OnOrder.storyName = 'onOrder';
export default {
  title: 'Visualizations/Cards/onOrder'
};