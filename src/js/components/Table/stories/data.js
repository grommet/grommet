import React from 'react';

import { Text } from 'grommet';

// Always should store amount in cents to avoid precision errors
export const data = [
  {
    id: 1,
    name: 'Eric',
    email: 'eric@local',
    amount: 3775,
  },
  {
    id: 2,
    name: 'Chris',
    email: 'chris@local',
    amount: 5825,
  },
  {
    id: 3,
    name: 'Alan',
    email: 'alan@local',
    amount: 4300,
  },
  {
    id: 4,
    name: 'Shimi',
    email: 'shimisun@local',
    amount: 5752,
  },
];

let TOTAL = 0;
data.forEach((datum) => {
  TOTAL += datum.amount;
});

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const columns = [
  {
    property: 'name',
    label: 'Name',
    dataScope: 'row',
    format: ({ name }) => <Text weight="bold">{name}</Text>,
  },
  {
    property: 'email',
    label: 'Email',
  },
  {
    property: 'amount',
    label: 'Amount',
    align: 'end',
    footer: amountFormatter.format(TOTAL / 100),
    format: (datum) => amountFormatter.format(datum.amount / 100),
  },
];
