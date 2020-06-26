import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { DateInput } from '..';

const DATE = '2020-07-02T00:00:00-08:00';
const DATES = ['2020-07-02T00:00:00-08:00', '2020-07-07T00:00:00-08:00'];

describe('DateInput', () => {
  test('basic', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" value={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" format="mm/dd/yyyy" value={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" inline value={DATE} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          inline
          value={DATE}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('format disabled', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy"
          disabled
          value={DATE}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('range', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" value={DATES} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('range inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput id="item" name="item" value={DATES} inline />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('range format', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          value={DATES}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('range format inline', () => {
    const component = renderer.create(
      <Grommet>
        <DateInput
          id="item"
          name="item"
          format="mm/dd/yyyy-mm/dd/yyyy"
          value={DATES}
          inline
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
