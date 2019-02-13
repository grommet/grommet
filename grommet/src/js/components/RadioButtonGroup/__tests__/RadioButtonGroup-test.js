import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { RadioButtonGroup } from '..';

describe('RadioButtonGroup', () => {
  test('default', () => {
    const component = renderer.create(
      <Grommet>
        <RadioButtonGroup name="test" options={[]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('string options', () => {
    const component = renderer.create(
      <Grommet>
        <RadioButtonGroup name="test" options={['one', 'two']} value="one" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options just value', () => {
    const component = renderer.create(
      <Grommet>
        <RadioButtonGroup
          name="test"
          options={[{ value: 'one' }, { value: 'two' }]}
          value="two"
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options', () => {
    const component = renderer.create(
      <Grommet>
        <RadioButtonGroup
          name="test"
          options={[
            { id: 'onE', label: 'One', value: 'one' },
            { id: 'twO', label: 'Two', value: 'two' },
          ]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options disabled', () => {
    const component = renderer.create(
      <Grommet>
        <RadioButtonGroup
          name="test"
          options={[{ value: 'one', disabled: true }, { value: 'two' }]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
