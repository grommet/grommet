import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Chart } from '../';

const VALUES = [
  { value: [1, 60], label: 'sixty' },
  { value: [0, 0], label: 'zero' },
];

test('Chart renders', () => {
  const component = renderer.create(
    <Grommet>
      <Chart />
      <Chart values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chart type renders', () => {
  const component = renderer.create(
    <Grommet>
      <Chart type='bar' values={VALUES} />
      <Chart type='line' values={VALUES} />
      <Chart type='area' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chart size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Chart size='xsmall' values={VALUES} />
      <Chart size='small' values={VALUES} />
      <Chart size='medium' values={VALUES} />
      <Chart size='large' values={VALUES} />
      <Chart size='xlarge' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chart thickness renders', () => {
  const component = renderer.create(
    <Grommet>
      <Chart thickness='xsmall' values={VALUES} />
      <Chart thickness='small' values={VALUES} />
      <Chart thickness='medium' values={VALUES} />
      <Chart thickness='large' values={VALUES} />
      <Chart thickness='xlarge' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Chart cap renders', () => {
  const component = renderer.create(
    <Grommet>
      <Chart round={true} values={VALUES} />
      <Chart type='line' round={true} values={VALUES} />
      <Chart type='area' round={true} values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
