import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Stack } from '../';

test('Stack renders', () => {
  const component = renderer.create(
    <Grommet>
      <Stack>
        <div>first</div>
        <div>second</div>
      </Stack>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
