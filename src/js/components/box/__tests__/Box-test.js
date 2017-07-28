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

test('Box reverse renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box reverse={true} />
      <Box reverse={false} />
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

test('Box alignContent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box alignContent='start' />
      <Box alignContent='center' />
      <Box alignContent='between' />
      <Box alignContent='around' />
      <Box alignContent='stretch' />
      <Box alignContent='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box alignSelf renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box alignSelf='start' />
      <Box alignSelf='center' />
      <Box alignSelf='stretch' />
      <Box alignSelf='end' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box basis renders', () => {
  const component = renderer.create(
    <Grommet>
      <Box>
        <Box basis='xsmall' />
        <Box basis='small' />
        <Box basis='medium' />
        <Box basis='large' />
        <Box basis='xlarge' />
        <Box basis='xxlarge' />
      </Box>
      <Box direction='row'>
        <Box basis='full' />
      </Box>
      <Box direction='row'>
        <Box basis='1/2' />
        <Box basis='1/2' />
      </Box>
      <Box direction='row'>
        <Box basis='1/3' />
        <Box basis='2/3' />
      </Box>
      <Box direction='row'>
        <Box basis='1/4' />
        <Box basis='3/4' />
      </Box>
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
