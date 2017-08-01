import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { TextInput } from '../';

test('TextInput renders', () => {
  const component = renderer.create(
    <Grommet>
      <TextInput id='item' name='item' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
