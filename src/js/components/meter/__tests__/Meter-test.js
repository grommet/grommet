import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Meter } from '../';

const VALUES = [{ value: 20, label: 'twenty' }];

test('Meter renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter />
      <Meter values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Meter type renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter type='bar' values={VALUES} />
      <Meter type='circle' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Meter size renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter size='xsmall' values={VALUES} />
      <Meter size='small' values={VALUES} />
      <Meter size='medium' values={VALUES} />
      <Meter size='large' values={VALUES} />
      <Meter size='xlarge' values={VALUES} />
      <Meter type='circle' size='xsmall' values={VALUES} />
      <Meter type='circle' size='small' values={VALUES} />
      <Meter type='circle' size='medium' values={VALUES} />
      <Meter type='circle' size='large' values={VALUES} />
      <Meter type='circle' size='xlarge' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Meter thickness renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter thickness='xsmall' values={VALUES} />
      <Meter thickness='small' values={VALUES} />
      <Meter thickness='medium' values={VALUES} />
      <Meter thickness='large' values={VALUES} />
      <Meter thickness='xlarge' values={VALUES} />
      <Meter type='circle' thickness='xsmall' values={VALUES} />
      <Meter type='circle' thickness='small' values={VALUES} />
      <Meter type='circle' thickness='medium' values={VALUES} />
      <Meter type='circle' thickness='large' values={VALUES} />
      <Meter type='circle' thickness='xlarge' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Meter round renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter round={true} values={VALUES} />
      <Meter type='circle' round={true} values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Meter background renders', () => {
  const component = renderer.create(
    <Grommet>
      <Meter background='light-3' values={VALUES} />
      <Meter background='light-3' values={VALUES} />
      <Meter type='circle' background='light-3' values={VALUES} />
      <Meter type='circle' background='light-3' values={VALUES} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
