import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import 'jest-axe/extend-expect';

import { Node } from 'grommet-icons';
import { Grommet } from '../../Grommet';
import { Spinner } from '..';
import { ThemeType } from '../../..';

describe('Spinner', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Spinner />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('size renders', () => {
    const { container } = render(
      <Grommet>
        <Spinner size="xsmall" />
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="xlarge" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size renders', () => {
    const { container } = render(
      <Grommet>
        <Spinner color="graph-0" />
        <Spinner color="graph-1" />
        <Spinner color="graph-2" />
        <Spinner color="graph-3" />
        <Spinner color="graph-4" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('round renders', () => {
    const { container } = render(
      <Grommet>
        <Spinner round={false} />
        <Spinner round="small" />
        <Spinner round="medium" />
        <Spinner round="large" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('border renders', () => {
    const { container } = render(
      <Grommet>
        <Spinner
          border={[
            {
              side: 'all',
              color: 'brand',
              size: 'medium',
              style: 'dotted',
            },
          ]}
        />
        <Spinner
          border={[
            {
              side: 'horizontal',
              color: 'brand',
              size: 'large',
              style: 'inset',
            },
          ]}
        />
        <Spinner
          border={[
            { side: 'all', color: 'transparent', size: 'medium' },
            { side: 'horizontal', color: 'brand', size: 'medium' },
          ]}
        />
        <Spinner
          border={[
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: 'brand', size: 'medium' },
            { side: 'top', color: 'brand', size: 'medium' },
            { side: 'left', color: 'brand', size: 'medium' },
          ]}
        />
        <Spinner
          border={[{ side: 'horizontal', color: 'brand', size: 'medium' }]}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('spinner changes according to theme', () => {
    const theme: ThemeType = {
      spinner: {
        size: { small: '30px' },
        container: {
          animation: { type: 'rotateLeft', duration: 900 },
          border: false,
          background: 'red',
          pad: 'large',
          round: 'medium',
        },
      },
    };

    const { container } = render(
      <Grommet theme={theme}>
        <Spinner />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('spinner icon changes according to theme', () => {
    const theme = {
      spinner: {
        icon: Node,
        container: {
          color: 'accent-2',
          align: 'center',
          justify: 'center',
          size: 'large',
          animation: { type: 'rotateLeft', duration: 900 },
        },
      },
    };

    const { container } = render(
      <Grommet theme={theme}>
        <Spinner />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('spinner color renders over theme settings', () => {
    const theme: ThemeType = {
      spinner: {
        container: {
          border: [
            { side: 'all', color: 'background-contrast', size: 'medium' },
            { side: 'right', color: 'green', size: 'medium' },
            { side: 'top', color: 'green', size: 'medium' },
            { side: 'left', color: 'green', size: 'medium' },
          ],
        },
      },
    };
    const { container } = render(
      <Grommet theme={theme}>
        <Spinner color="#1479FB" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
