import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { hpe as hpeTheme } from '../../../themes';

import { Grommet } from '../';

test('Grommet renders', () => {
  const component = renderer.create(
    <Grommet />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grommet hpe theme renders', () => {
  const component = renderer.create(
    <Grommet theme={hpeTheme}>Grommet App</Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
