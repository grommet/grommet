import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Grommet } from '../../Grommet';
import { CheckBoxGroup } from '..';

describe('CheckBoxGroup', () => {
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
    const { container } = render(
      <Grommet>
        <CheckBoxGroup options={['First', 'Second']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('value renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBoxGroup value={['First']} options={['First', 'Second']} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('initial value renders', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled renders', () => {
    const { container } = render(
      <Grommet>
        <CheckBoxGroup disabled options={['First', 'Second']} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
        <CheckBoxGroup options={[{ label: 'First', disabled: true }]} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
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

  test('custom theme', () => {
    const customTheme = {
      checkBoxGroup: {
        container: {
          gap: 'large',
          margin: {
            vertical: 'small',
          },
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
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

  test('no duplicated key error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <Grommet>
        <CheckBoxGroup
          value={['yes', 'yes-again']}
          options={[
            { label: 'Yes!', value: 'yes' },
            { label: 'Yes!', value: 'yes-again' },
          ]}
        />
      </Grommet>,
    );

    expect(errorSpy).not.toBeCalledWith(
      expect.stringMatching('same key'),
      expect.stringMatching('Yes!'),
      expect.anything(),
    );

    errorSpy.mockReset();
    errorSpy.mockRestore();
  });

  test('checked warning', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

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
  });

  test('defaultValue renders', () => {
    const { asFragment } = render(
      <Grommet>
        <CheckBoxGroup options={['First', 'Second']} defaultValue={['First']} />
      </Grommet>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
