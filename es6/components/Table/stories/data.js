import React from 'react';
import { Text } from 'grommet'; // Always should store amount in cents to avoid precision errors

export var data = [{
  id: 1,
  name: 'Eric',
  email: 'eric@local',
  amount: 3775
}, {
  id: 2,
  name: 'Chris',
  email: 'chris@local',
  amount: 5825
}, {
  id: 3,
  name: 'Alan',
  email: 'alan@local',
  amount: 4300
}, {
  id: 4,
  name: 'Shimi',
  email: 'shimisun@local',
  amount: 5752
}];
var TOTAL = 0;
data.forEach(function (datum) {
  TOTAL += datum.amount;
});
var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
export var columns = [{
  property: 'name',
  label: 'Name',
  dataScope: 'row',
  format: function format(_ref) {
    var name = _ref.name;
    return /*#__PURE__*/React.createElement(Text, {
      weight: "bold"
    }, name);
  }
}, {
  property: 'email',
  label: 'Email'
}, {
  property: 'amount',
  label: 'Amount',
  align: 'end',
  footer: amountFormatter.format(TOTAL / 100),
  format: function format(datum) {
    return amountFormatter.format(datum.amount / 100);
  }
}];