import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DataChart } from '..';

const data = [
  { a: 1, b: 'one' },
  { a: 2, b: 'two' },
];

describe('DataChart', () => {
  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <DataChart data={data} chart={{ key: 'a' }} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
