import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
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
  test('default outside grommet wrapper', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toMatchSnapshot();
  });
  test('theme gap', () => {
    const customTheme = {
      footer: {
        gap: 'large',
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Footer>
          <Box>Footer Item 1</Box>
          <Box>Footer Item 2</Box>
          <Box>Footer Item 3</Box>
        </Footer>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
