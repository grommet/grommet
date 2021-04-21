import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../../components/Grommet';
import { ResponsiveContext } from '..';

describe('ResponsiveContext', () => {
  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <ResponsiveContext.Consumer>{size => size}</ResponsiveContext.Consumer>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
