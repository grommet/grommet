import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Box } from '../../Box';
import { RadioButtonGroup } from '..';

describe('RadioButtonGroup', () => {
  test('default', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup name="test" options={[]} />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('string options', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup name="test" options={['one', 'two']} value="one" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options just value', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup
          name="test"
          options={[{ value: 'one' }, { value: 'two' }]}
          value="two"
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup
          name="test"
          options={[
            { id: 'onE', label: 'One', value: 'one' },
            { id: 'twO', label: 'Two', value: 'two' },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('object options disabled', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup
          name="test"
          options={[{ value: 'one', disabled: true }, { value: 'two' }]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('children', () => {
    const child = ({ checked }) => (
      <Box pad="small" background={checked ? 'accent-1' : 'control'} />
    );
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup name="test" options={['one', 'two']} value="one">
          {child}
        </RadioButtonGroup>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('adding additional props', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButtonGroup
          name="test"
          options={[
            {
              id: 'ONE',
              value: '1',
              'data-testid': 'testid-1',
            },
            {
              id: 'TWO',
              value: '2',
              'data-testid': 'testid-2',
            },
          ]}
        />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
