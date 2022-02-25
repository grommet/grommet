import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Page } from '..';
import { Paragraph } from '../../Paragraph';

describe('Page', () => {
  test('default kind', () => {
    const { container } = render(
      <Grommet>
        <Page>
          <Paragraph>content</Paragraph>
        </Page>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
