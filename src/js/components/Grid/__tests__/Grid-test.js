import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Grid } from '..';

test('Grid renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('a11yTitle renders', () => {
  const { container, debug, getByLabelText } = render(
    <Grommet>
      <Grid a11yTitle="My Grid" />
    </Grommet>,
  );
  debug();
  const gridWithLabel = getByLabelText('My Grid');
  expect(gridWithLabel).toBeTruthy();
  expect(container).toMatchSnapshot();
});

test('Grid rows renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid rows={['small', 'large', 'medium']} />
      <Grid rows="small" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid columns renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid columns={['1/2', '2/4']} />
      <Grid columns={['1/3', '2/3']} />
      <Grid columns={['1/4', '3/4']} />
      <Grid columns="small" />
      <Grid columns={{ count: 'fit', size: 'small' }} />
      <Grid columns={{ count: 'fill', size: ['small', 'medium'] }} />
    </Grommet>,
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
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid areas renders when given an array of string arrays', () => {
  const component = renderer.create(
    <Grommet>
      <Grid
        rows={['xxsmall', 'medium', 'xsmall']}
        columns={['3/4', '1/4']}
        areas={[
          ['header', 'header'],
          ['sidebar', 'main'],
          ['footer', 'footer'],
        ]}
      />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid justify renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid justify="start" />
      <Grid justify="center" />
      <Grid justify="end" />
      <Grid justify="stretch" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid align renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid align="start" />
      <Grid align="center" />
      <Grid align="end" />
      <Grid align="stretch" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid justifyContent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid justifyContent="start" />
      <Grid justifyContent="center" />
      <Grid justifyContent="between" />
      <Grid justifyContent="around" />
      <Grid justifyContent="end" />
      <Grid justifyContent="stretch" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid alignContent renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid alignContent="start" />
      <Grid alignContent="center" />
      <Grid alignContent="between" />
      <Grid alignContent="around" />
      <Grid alignContent="end" />
      <Grid alignContent="stretch" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid gap renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid gap="small" />
      <Grid gap="medium" />
      <Grid gap="large" />
      <Grid gap={{ row: 'small' }} />
      <Grid gap={{ row: 'medium' }} />
      <Grid gap={{ row: 'large' }} />
      <Grid gap={{ column: 'small' }} />
      <Grid gap={{ column: 'medium' }} />
      <Grid gap={{ column: 'large' }} />
      <Grid gap={{ row: 'small', column: 'medium' }} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid fill renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid fill />
      <Grid fill={false} />
      <Grid fill="horizontal" />
      <Grid fill="vertical" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid as renders', () => {
  const component = renderer.create(
    <Grommet>
      <Grid as="article" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grid proxies tag', () => {
  const tagComponent = renderer.create(
    <Grommet>
      <Grid tag="article" />
    </Grommet>,
  );
  const asComponent = renderer.create(
    <Grommet>
      <Grid as="article" />
    </Grommet>,
  );
  expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
});
