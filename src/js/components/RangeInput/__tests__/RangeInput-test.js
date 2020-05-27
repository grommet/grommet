import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { RangeInput } from '..';

test('RangeInput renders', () => {
  const component = renderer.create(
    <Grommet>
      <RangeInput value="50" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RangeInput track themed', () => {
  const component = renderer.create(
    <Grommet theme={{ rangeInput: { track: { color: 'brand' } } }}>
      <RangeInput value="10" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('RangeInput track themed with color and opacity', () => {
  const component = renderer.create(
    <Grommet
      theme={{ rangeInput: { track: { color: 'brand', opacity: 0.3 } } }}
    >
      <RangeInput value="10" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('with min and max offset', () => {
  const component = renderer.create(
    <Grommet>
      <RangeInput min={10} max={20} step={1} value={15} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
