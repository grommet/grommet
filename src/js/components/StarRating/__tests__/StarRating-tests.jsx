import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';

import { Grommet } from '../../Grommet';
import { StarRating } from '..';

describe('StarRating', () => {
  test('StarRating should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <StarRating name="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });
});
