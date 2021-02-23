import React from 'react';

import { cleanup, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import 'regenerator-runtime/runtime';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';

import { Node } from 'grommet-icons';
import { Grommet } from '../../Grommet';
import { Spinner } from '..';

describe('Spinner', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Spinner />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <Spinner />
        <Spinner id="test id" name="test name" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size renders', () => {
    const component = renderer.create(
      <Grommet>
        <Spinner size="xsmall" />
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="xlarge" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size renders', () => {
    const component = renderer.create(
      <Grommet>
        <Spinner color="graph-0" />
        <Spinner color="graph-1" />
        <Spinner color="graph-2" />
        <Spinner color="graph-3" />
        <Spinner color="graph-4" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('round renders', () => {
    const component = renderer.create(
      <Grommet>
        <Spinner round={false} />
        <Spinner round="small" />
        <Spinner round="medium" />
        <Spinner round="large" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('border renders', () => {
    const component = renderer.create(
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
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('spinner changes according to theme', () => {
    const theme = {
      spinner: {
        size: {
          small: '30px',
        },
        container: {
          animation: { type: 'rotateLeft', duration: 900 },
          border: false,
          background: 'red',
          pad: 'large',
          round: 'medium',
        },
      },
    };

    const component = renderer.create(
      <Grommet theme={theme}>
        <Spinner />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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

    const component = renderer.create(
      <Grommet theme={theme}>
        <Spinner />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
