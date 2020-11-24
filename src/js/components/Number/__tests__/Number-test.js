import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { Number } from '..';

describe('Number', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Number a11yTitle="test" value={27} />
      </Grommet>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('value', () => {
    const component = renderer.create(
      <Grommet>
        <Number value={27} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('units string', () => {
    const component = renderer.create(
      <Grommet>
        <Number value={27} units="tests" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('units object', () => {
    const component = renderer.create(
      <Grommet>
        <Number
          value={27}
          units={{
            label: 'tests',
            size: 'small',
            weight: 'normal',
            color: 'brand',
          }}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('color', () => {
    const component = renderer.create(
      <Grommet>
        <Number value={27} units="tests" color="brand" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size', () => {
    const component = renderer.create(
      <Grommet>
        {['small', 'medium', 'large', 'xlarge'].map(size => (
          <Number key={size} value={27} units="tests" size={size} />
        ))}
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
