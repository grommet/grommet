import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { CheckBox } from '..';

test('label renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox label="test label" />
      <CheckBox label={<div>test label</div>} />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('checked renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox checked />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('disabled renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox disabled />
      <CheckBox disabled checked />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('reverse renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox reverse label="test label" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('toggle renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox toggle />
      <CheckBox toggle checked />
      <CheckBox toggle label="test label" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('indeterminate renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <CheckBox indeterminate />
      <CheckBox indeterminate label="test label" />
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('indeterminate checked warns', () => {
  const spy = jest.spyOn(global.console, 'warn');
  renderer.create(
    <MnetUIBase>
      <CheckBox indeterminate checked />
    </MnetUIBase>,
  );
  expect(spy).toBeCalledWith(
    'Checkbox cannot be "checked" and "indeterminate" at the same time.',
  );
});

test('indeterminate toggle warns', () => {
  const spy = jest.spyOn(global.console, 'warn');
  renderer.create(
    <MnetUIBase>
      <CheckBox indeterminate toggle />
    </MnetUIBase>,
  );
  expect(spy).toBeCalledWith(
    'Checkbox of type toggle does not have "indeterminate" state.',
  );
});

test('controlled', () => {
  const { container, getByText } = render(
    <MnetUIBase>
      <CheckBox label="test-label" checked />
    </MnetUIBase>,
  );
  expect(container.firstChild).toMatchSnapshot();
  fireEvent.click(getByText('test-label'));
  expect(container.firstChild).toMatchSnapshot();
});
