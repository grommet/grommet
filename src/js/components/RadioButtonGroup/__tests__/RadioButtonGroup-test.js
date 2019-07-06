import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { render, getByTestId } from 'react-testing-library';

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

  test('retains focus on selecting a value when focused', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    render(
      <Grommet>
        <input />
        <RadioButtonGroup
          data-testid="test-radiogroup-node"
          name="test"
          options={[{ id: 'one', value: 'one' }, { id: 'two', value: 'two' }]}
          onChange={onChange}
          value="two"
        />
        <button type="button">Save</button>
      </Grommet>,
    );

    const radioGroupNode = getByTestId(document, 'test-radiogroup-node');
    expect(radioGroupNode).toMatchSnapshot();
    const selectedRadioButton = document.getElementById('two');
    selectedRadioButton.focus();
    jest.runAllTimers();

    expect(document.activeElement).toEqual(selectedRadioButton);
  });
});
