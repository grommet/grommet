import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Calendar } from '../';

const DATE = '2018-01-15T00:00:00 GMT-08:00';
const DATES = [
  '2018-01-12T00:00:00 GMT-08:00',
  ['2018-01-8T00:00:00 GMT-08:00', '2018-01-10T00:00:00 GMT-08:00'],
];

test('Calendar renders', () => {
  // need to set the date to avoid snapshot drift over time
  const component = renderer.create(
    <Grommet>
      <Calendar date={DATE} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar date renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar date={DATE} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar dates renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar
        dates={DATES}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar
        dates={DATES}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar size='small' date={DATE} />
      <Calendar size='medium' date={DATE} />
      <Calendar size='large' date={DATE} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar firstDayOfWeek renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar firstDayOfWeek={0} date={DATE} />
      <Calendar firstDayOfWeek={1} date={DATE} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
