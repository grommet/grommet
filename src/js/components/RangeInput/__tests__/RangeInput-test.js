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
