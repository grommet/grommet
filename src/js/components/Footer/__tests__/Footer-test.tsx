import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';

import { Grommet } from '../../Grommet';
import { Footer } from '..';

describe('Footer', () => {
  test('default', () => {
    const { container } = render(
      <Grommet theme={hpe}>
        <Footer />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('default outside grommet wrapper', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
