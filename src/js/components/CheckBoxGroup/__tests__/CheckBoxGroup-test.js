import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Grommet } from '../../Grommet';
import { CheckBoxGroup } from '..';

describe('CheckBoxGroup', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <CheckBoxGroup options={['First', 'Second']} />
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('options renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup options={['First', 'Second']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('value renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup value={['First']} options={['First', 'Second']} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('initial value renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup
          value={['Wuhan', 'Jerusalem']}
          options={[
            { label: 'Maui', value: 'Maui' },
            { label: 'Jerusalem', value: 'Jerusalem' },
            { label: 'Wuhan', value: 'Wuhan' },
          ]}
        />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const component = renderer.create(
      <Grommet>
        <CheckBoxGroup disabled options={['First', 'Second']} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onChange', () => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <CheckBoxGroup
          options={[
            { label: 'first-label', value: 'First' },
            { label: 'second-label', value: 'Second' },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );
    fireEvent.click(getByText('first-label'));
    expect(onChange).toBeCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick for check and uncheck a CheckBox', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <CheckBoxGroup
          options={[
            { label: 'first-label', value: 'First' },
            { label: 'second-label', value: 'Second' },
          ]}
          onClick={onClick}
        />
      </Grommet>,
    );
    fireEvent.click(getByText('first-label'));
    expect(onClick).toBeCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('first-label'));
    expect(onClick).toBeCalledTimes(2);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('labelKey', () => {
    const { container } = render(
      <Grommet>
        <CheckBoxGroup
          labelKey="labelKeyTest"
          options={[
            { labelKeyTest: 'first-label', value: 'First' },
            { labelKeyTest: 'second-label', value: 'Second' },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('valueKey', () => {
    const { container } = render(
      <Grommet>
        <CheckBoxGroup
          valueKey="valueKeyTest"
          options={[
            { label: 'first-label', valueKeyTest: 'First' },
            { label: 'second-label', valueKeyTest: 'Second' },
          ]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('checked warning', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');

    render(
      <Grommet>
        <CheckBoxGroup
          options={[
            { label: 'first-label', value: 'First', checked: true },
            { label: 'second-label', value: 'Second' },
          ]}
        />
      </Grommet>,
    );

    expect(warnSpy).toBeCalled();
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });
});
