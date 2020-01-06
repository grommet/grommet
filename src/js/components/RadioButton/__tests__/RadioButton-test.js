import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Box } from '../../Box';
import { RadioButton } from '..';

describe('RadioButton', () => {
  test('basic', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButton name="test" value="1" />
        <RadioButton id="test id" name="test" value="2" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('label', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButton label="test label" name="test" value="1" />
        <RadioButton label={<div>test label</div>} name="test" value="2" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('checked', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButton checked name="test" value="1" />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled', () => {
    const component = renderer.create(
      <MnetUIBase>
        <RadioButton disabled name="test" value="1" />
        <RadioButton disabled checked name="test" value="2" />
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
        <RadioButton name="test" value="1">
          {child}
        </RadioButton>
        <RadioButton checked name="test" value="2">
          {child}
        </RadioButton>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
