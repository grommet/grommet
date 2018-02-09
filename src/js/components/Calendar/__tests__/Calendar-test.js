import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Calendar } from '../';

test('Calendar renders', () => {
  // need to set the date to avoid snapshot drift over time
  const component = renderer.create(
    <Grommet>
      <Calendar date='2018-01-15' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar date renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar date='2018-01-15' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar dates renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar dates={['2018-01-12', ['2018-01-8', '2018-01-10']]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar dates={['2018-01-12', ['2018-01-8', '2018-01-10']]} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar size='small' date='2018-01-15' />
      <Calendar size='medium' date='2018-01-15' />
      <Calendar size='large' date='2018-01-15' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Calendar firstDayOfWeek renders', () => {
  const component = renderer.create(
    <Grommet>
      <Calendar firstDayOfWeek={1} date='2018-01-15' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
