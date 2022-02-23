import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Page } from '..';
import { PageSection } from '../../PageSection';

describe('Page', () => {
  test('default kind with fullBackground', () => {
    const { container } = render(
      <Grommet>
        <Page>
          <PageSection fullBackground="pink">content</PageSection>
        </Page>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
