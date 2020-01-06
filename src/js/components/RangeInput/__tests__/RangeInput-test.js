import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { RangeInput } from '..';

test('RangeInput renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <RangeInput value="50" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
