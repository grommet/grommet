import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DateInput } from '..';

describe('DateInput', () => {
  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" inline />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy" inline />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format disabled', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy" disabled />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
