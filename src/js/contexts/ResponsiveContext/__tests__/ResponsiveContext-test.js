import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../../components/Grommet';
import { ResponsiveContext } from '..';

describe('ResponsiveContext', () => {
  test('basic', () => {
    const { container } = render(
      <Grommet>
        <ResponsiveContext.Consumer>{size => size}</ResponsiveContext.Consumer>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
