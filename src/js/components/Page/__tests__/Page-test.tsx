import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Page } from '..';
import { Paragraph } from '../../Paragraph';
import { PageContent } from '../../PageContent';

describe('Page', () => {
  test('default kind', () => {
    const { asFragment } = render(
      <Grommet>
        <Page>
          <PageContent>
            <Paragraph>content</Paragraph>
          </PageContent>
        </Page>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('narrow', () => {
    const { asFragment } = render(
      <Grommet>
        <Page kind="narrow">
          <PageContent>
            <Paragraph>content</Paragraph>
          </PageContent>
        </Page>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('full', () => {
    const { asFragment } = render(
      <Grommet>
        <Page kind="full">
          <PageContent>
            <Paragraph>content</Paragraph>
          </PageContent>
        </Page>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('background fill', () => {
    const { asFragment } = render(
      <Grommet>
        <Page pad={{ vertical: 'small' }}>
          <PageContent background={{ color: 'light-2', fill: 'horizontal' }}>
            <Paragraph>content</Paragraph>
          </PageContent>
        </Page>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('custom theme', () => {
    const customTheme = {
      page: {
        customKind: {
          alignSelf: 'start',
          width: {
            min: '200px',
            max: '500px',
          },
        },
      },
    };
    const { asFragment } = render(
      <Grommet theme={customTheme}>
        <Page>
          <PageContent>
            <Paragraph>content</Paragraph>
          </PageContent>
        </Page>
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
