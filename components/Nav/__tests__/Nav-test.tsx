import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { render } from '@testing-library/react';

import { Grommet, Nav } from '../..';

describe('Nav', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Nav />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
