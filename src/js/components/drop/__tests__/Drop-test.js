import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Drop } from '../';

test('Drop renders', () => {
  const component = renderer.create(
    <Grommet>
      <Drop />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
