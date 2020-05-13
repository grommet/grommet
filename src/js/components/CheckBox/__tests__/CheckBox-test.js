import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { CheckBox } from '..';

describe('CheckBox', () => {
  afterEach(cleanup);

  test('renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox />
        <CheckBox id="test id" name="test name" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('label renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox label="test label" />
        <CheckBox label={<div>test label</div>} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('checked renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox checked />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox disabled />
        <CheckBox disabled checked />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('reverse renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox reverse label="test label" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('toggle renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox toggle />
        <CheckBox toggle checked />
        <CheckBox toggle label="test label" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('indeterminate renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBox indeterminate />
        <CheckBox indeterminate label="test label" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('indeterminate checked warns', () => {
    const spy = jest.spyOn(global.console, 'warn');
    renderer.create(
      <Grommet>
        <CheckBox indeterminate checked />
      </Grommet>,
    );
    expect(spy).toBeCalledWith(
      'Checkbox cannot be "checked" and "indeterminate" at the same time.',
    );
  });

  test('indeterminate toggle warns', () => {
    const spy = jest.spyOn(global.console, 'warn');
    renderer.create(
      <Grommet>
        <CheckBox indeterminate toggle />
      </Grommet>,
    );
    expect(spy).toBeCalledWith(
      'Checkbox of type toggle does not have "indeterminate" state.',
    );
  });

  test('controlled', () => {
    const { container, getByText } = render(
      <Grommet>
        <CheckBox label="test-label" checked />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('test-label'));
    expect(container.firstChild).toMatchSnapshot();
  });
});
