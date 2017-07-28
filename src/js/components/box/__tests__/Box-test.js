import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Box } from '../';

test('Box renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box direction renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box direction='row' />
      <Box direction='column' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box justify renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box justify='start' />
      <Box justify='center' />
      <Box justify='between' />
      <Box justify='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box align renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box align='start' />
      <Box align='center' />
      <Box align='baseline' />
      <Box align='stretch' />
      <Box align='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box tag renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box tag='header' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
