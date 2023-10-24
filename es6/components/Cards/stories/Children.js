import React from 'react';
import { Card, CardBody, CardFooter, Grid, Heading } from 'grommet';
import { Cards } from '../Cards';
var data = [{
  city: 'Boise',
  state: 'Idaho'
}, {
  city: 'Fort Collins',
  state: 'Colorado'
}, {
  city: 'Bay Area',
  state: 'California'
}, {
  city: 'San Diego',
  state: 'California'
}, {
  city: 'San Francisco',
  state: 'California'
}];
export var Children = function Children() {
  return /*#__PURE__*/React.createElement(Grid, {
    pad: "large",
    columns: [['medium', 'large']],
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Cards, {
    data: data,
    pad: "medium",
    border: false
  }, function (datum) {
    return /*#__PURE__*/React.createElement(Card, {
      key: datum.city,
      as: "li"
    }, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(Heading, {
      level: 2,
      size: "small",
      margin: "none"
    }, datum.city)), /*#__PURE__*/React.createElement(CardFooter, null, datum.state));
  }));
};
export default {
  title: 'Visualizations/Cards/Children'
};