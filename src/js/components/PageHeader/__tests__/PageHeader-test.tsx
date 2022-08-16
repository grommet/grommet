import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Anchor } from '../../Anchor';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { PageHeader } from '..';

const sizes = ['small', 'medium', 'large'];

describe('PageHeader', () => {
  test('basic', () => {
    const { asFragment } = render(
      <Grommet>
        <PageHeader
          title="Grommet"
          subtitle={`Grommet helps you build responsive and accessible 
          mobile-first projects for the web with an easy to use component 
          library.`}
          actions={<Button label="Get Started" primary />}
          parent={<Anchor label="Parent Page" />}
        />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  sizes.forEach((size?: any) => {
    test(`size - ${size}`, () => {
      const { asFragment } = render(
        <Grommet>
          <PageHeader
            title="Grommet"
            subtitle={`Grommet helps you build responsive and accessible 
            mobile-first projects for the web with an easy to use component 
            library.`}
            actions={<Button label="Get Started" primary />}
            parent={<Anchor label="Parent Page" />}
            size={size}
          />
        </Grommet>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  test('custom theme', () => {
    const customTheme = {
      pageHeader: {
        medium: {
          areas: [
            ['parent', 'parent'],
            ['title', 'null'],
            ['subtitle', 'null'],
            ['actions', 'actions'],
          ],
        },
      },
    };

    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <PageHeader
          title="Permissions"
          subtitle="View and assign permissions."
          actions={
            <Box alignSelf="start">
              <Button label="Edit" primary />
            </Box>
          }
          parent={<Anchor label="Settings" />}
        />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
