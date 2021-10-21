import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Footer } from '..';

describe('Footer', () => {
  test('default', () => {
    const { container } = render(
      <Grommet>
        <Footer />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
