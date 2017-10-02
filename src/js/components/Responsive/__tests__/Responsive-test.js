import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Responsive } from '../';

test('Responsive renders', () => {
  const onChange = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Responsive onChange={onChange}>
        <span>hi</span>
      </Responsive>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // expect(onNarrow).toBeCalled();
});
