import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { cleanup, render } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { RangeInput } from '..';

describe('RangeInput', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <RangeInput value="50" a11yTitle="test" />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <RangeInput value="50" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('track themed', () => {
    const component = renderer.create(
      <Grommet theme={{ rangeInput: { track: { color: 'brand' } } }}>
        <RangeInput value="10" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('track themed with color and opacity', () => {
    const component = renderer.create(
      <Grommet
        theme={{ rangeInput: { track: { color: 'brand', opacity: 0.3 } } }}
      >
        <RangeInput value="10" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('with min and max offset', () => {
    const component = renderer.create(
      <Grommet>
        <RangeInput min={10} max={20} step={1} value={15} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
