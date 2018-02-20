import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Calendar } from '../';

test('Calendar renders', () => {
  // need to set the date to avoid snapshot drift over time
  const component = renderer.create(
    <Grommet>
      <Calendar date='2018-01-15T00:00:00 GMT-08:00' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar date renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar date='2018-01-15T00:00:00 GMT-08:00' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar dates renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar
        dates={[
          '2018-01-12T00:00:00 GMT-08:00',
          ['2018-01-8T00:00:00 GMT-08:00', '2018-01-10T00:00:00 GMT-08:00'],
        ]}
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
        dates={[
          '2018-01-12T00:00:00 GMT-08:00',
          ['2018-01-8T00:00:00 GMT-08:00', '2018-01-10T00:00:00 GMT-08:00'],
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar size='small' date='2018-01-15T00:00:00 GMT-08:00' />
      <Calendar size='medium' date='2018-01-15T00:00:00 GMT-08:00' />
      <Calendar size='large' date='2018-01-15T00:00:00 GMT-08:00' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar firstDayOfWeek renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar firstDayOfWeek={0} date='2018-01-15T00:00:00 GMT-08:00' />
      <Calendar firstDayOfWeek={1} date='2018-01-15T00:00:00 GMT-08:00' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
