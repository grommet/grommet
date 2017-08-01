import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Grid } from '../';

test('Grid renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid rows renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid rows={['small', 'large', 'medium']} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid columns renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid columns={['1/2', '1/4', '1/4']} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid areas renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid
        rows={['xxsmall', 'medium', 'xsmall']}
        columns={['3/4', '1/4']}
        areas={[
          { name: 'header', start: [0, 0], end: [0, 1] },
          { name: 'main', start: [1, 0], end: [1, 0] },
          { name: 'sidebar', start: [1, 1], end: [1, 1] },
          { name: 'footer', start: [2, 0], end: [2, 1] },
        ]}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid justify renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid justify='start' />
      <Grid justify='center' />
      <Grid justify='end' />
      <Grid justify='stretch' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid align renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid align='start' />
      <Grid align='center' />
      <Grid align='end' />
      <Grid align='stretch' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid justifyContent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid justifyContent='start' />
      <Grid justifyContent='center' />
      <Grid justifyContent='between' />
      <Grid justifyContent='around' />
      <Grid justifyContent='end' />
      <Grid justifyContent='stretch' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid alignContent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid alignContent='start' />
      <Grid alignContent='center' />
      <Grid alignContent='between' />
      <Grid alignContent='around' />
      <Grid alignContent='end' />
      <Grid alignContent='stretch' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid gap renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid gap='small' />
      <Grid gap='medium' />
      <Grid gap='large' />
      <Grid gap={{ horizontal: 'small' }} />
      <Grid gap={{ horizontal: 'medium' }} />
      <Grid gap={{ horizontal: 'large' }} />
      <Grid gap={{ vertical: 'small' }} />
      <Grid gap={{ vertical: 'medium' }} />
      <Grid gap={{ vertical: 'large' }} />
      <Grid gap={{ horizontal: 'small', vertical: 'medium' }} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid tag renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid tag='article' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
