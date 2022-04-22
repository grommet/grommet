import React, { useState } from 'react';

import 'jest-styled-components';

import { act, render, fireEvent, screen } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';
import { CheckBox } from '../../CheckBox';
import { Box } from '../../Box';

describe('Form controlled', () => {
  test('controlled', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled onValidate', () => {
    const onValidate = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onValidate={onValidate}>
          <FormField name="test" required>
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onValidate).toBeCalledWith(
      expect.objectContaining({
        errors: { test: 'required' },
        infos: {},
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled onValidate custom error', () => {
    const onValidate = jest.fn();
    const errorMessage = 'One uppercase letter';
    const testRules = {
      regexp: /(?=.*?[A-Z])/,
      message: errorMessage,
      status: 'error',
    };

    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onValidate={onValidate}>
          <FormField name="test" validate={testRules}>
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onValidate).toBeCalledWith(
      expect.objectContaining({
        errors: { test: errorMessage },
        infos: {},
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled onValidate custom info', () => {
    const onValidate = jest.fn();
    const infoMessage = 'One uppercase letter';
    const testRules = {
      regexp: /(?=.*?[A-Z])/,
      message: infoMessage,
      status: 'info',
    };

    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onValidate={onValidate}>
          <FormField name="test" validate={testRules}>
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onValidate).toBeCalledWith(
      expect.objectContaining({
        errors: {},
        infos: { test: infoMessage },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled lazy', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      React.useEffect(() => setValue({ test: 'test' }), []);
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled input', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState('');
      const onChange = React.useCallback(
        (event) => setValue(event.target.value),
        [],
      );
      return (
        <Form onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput
              name="test"
              placeholder="test input"
              value={value}
              onChange={onChange}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled input lazy', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState('');
      React.useEffect(() => setValue('test'), []);
      const onChange = React.useCallback(
        (event) => setValue(event.target.value),
        [],
      );
      return (
        <Form onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput
              name="test"
              placeholder="test input"
              value={value}
              onChange={onChange}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('lazy value', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [test, setTest] = React.useState('');
      return (
        <Form onSubmit={({ value, touched }) => onSubmit({ value, touched })}>
          <TextInput name="test" value={test} />
          <Button label="set" onClick={() => setTest('a')} />
          <Button label="submit" type="submit" />
        </Form>
      );
    };
    const { container, getByText } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('set'));
    fireEvent.click(getByText('submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'a' },
      }),
    );
  });

  // deprecated FormField+input pattern
  test('controlled FormField deprecated', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          <FormField label="test" name="test" id="test" htmlFor="test" />
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByLabelText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByLabelText('test'), { target: { value: 'v' } });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled reset', () => {
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(
        (nextValue) => setValue(nextValue),
        [],
      );
      return (
        <Grommet>
          <Form
            onReset={onReset}
            onChange={onChange}
            value={value}
            onSubmit={onSubmit}
          >
            <FormField
              a11yTitle="test"
              name="test"
              required
              placeholder="test input"
            />
            <Button type="reset" primary label="Reset" />
          </Form>
        </Grommet>
      );
    };
    const { getByPlaceholderText, getByText, queryByText } = render(<Test />);
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'Input has changed' },
    });
    expect(getByPlaceholderText('test input').value).toBe('Input has changed');
    fireEvent.click(getByText('Reset'));
    expect(onReset).toBeCalledTimes(1);
    expect(queryByText('Input has changed')).toBeNull();
  });

  test('controlled onChange touched', () => {
    const onChange = jest.fn();
    const onSubmit = jest.fn();
    const Test = () => {
      const [value] = React.useState({ test: '' });
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'Input has changed' },
    });

    expect(onChange).toBeCalledWith(
      { test: 'Input has changed' },
      { touched: { test: true } },
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`dynamicly removed fields using blur validation
  don't keep validation errors`, () => {
    jest.useFakeTimers('modern');
    const onValidate = jest.fn();
    const onSubmit = jest.fn();

    const Test = () => {
      const [value, setValue] = React.useState({ name: '', toggle: false });
      return (
        <Form
          validate="blur"
          value={value}
          onChange={(nextValue) => {
            const adjustedValue = { ...nextValue };
            if (!adjustedValue.toggle) delete adjustedValue.mood;
            else if (!adjustedValue.mood) adjustedValue.mood = '';
            setValue(adjustedValue);
          }}
          onValidate={onValidate}
          onSubmit={onSubmit}
        >
          <FormField name="name">
            <TextInput name="name" placeholder="test name" />
          </FormField>
          <FormField name="toggle">
            <CheckBox name="toggle" label="toggle" />
          </FormField>
          {value.toggle && (
            <FormField name="mood" required>
              <TextInput name="mood" placeholder="test mood" />
            </FormField>
          )}
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByLabelText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();

    const nameField = getByPlaceholderText('test name');
    const toggleField = getByLabelText('toggle');

    // add mood
    fireEvent.click(toggleField);

    expect(container.firstChild).toMatchSnapshot();
    const moodField = getByPlaceholderText('test mood');

    // focus in and out of mood, should fail validation
    act(() => {
      moodField.focus();
      toggleField.focus();
    });
    act(() => jest.advanceTimersByTime(200)); // allow validations to run
    expect(onValidate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: { mood: 'required' },
        infos: {},
      }),
    );

    // set mood, should pass validation
    act(() => moodField.focus());
    fireEvent.change(moodField, { target: { value: 'testy' } });
    act(() => toggleField.focus());
    act(() => jest.advanceTimersByTime(200)); // allow validations to run
    expect(onValidate).toHaveBeenLastCalledWith(
      expect.objectContaining({ errors: {}, infos: {} }),
    );

    // clear mood, should fail validation
    act(() => moodField.focus());
    fireEvent.change(moodField, { target: { value: '' } });
    act(() => toggleField.focus());
    act(() => jest.advanceTimersByTime(200)); // allow validations to run
    expect(onValidate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        errors: { mood: 'required' },
        infos: {},
      }),
    );

    // remove mood, should clear validation
    fireEvent.click(toggleField);

    act(() => nameField.focus());
    act(() => toggleField.focus());
    act(() => jest.advanceTimersByTime(200)); // allow validations to run
    expect(onValidate).toHaveBeenLastCalledWith(
      expect.objectContaining({ errors: {}, infos: {} }),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled Array of Form Fields', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({
        phones: [
          { number: '', ext: '' },
          { number: '', ext: '' },
          { number: '', ext: '' },
        ],
      });
      const onChange = (nextValue) => setValue(nextValue);
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          {value.phones.length &&
            value.phones.map((phone, idx) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                direction="row"
                justify="between"
                align="center"
              >
                <FormField name={`phones[${idx}].number`}>
                  <TextInput
                    name={`phones[${idx}].number`}
                    placeholder={`number test input ${idx + 1}`}
                  />
                </FormField>
                <FormField name={`phones[${idx}].ext`}>
                  <TextInput
                    name={`phones[${idx}].ext`}
                    placeholder={`ext test input ${idx + 1}`}
                  />
                </FormField>
              </Box>
            ))}
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('number test input 2'), {
      target: { value: '123456789' },
    });
    fireEvent.change(getByPlaceholderText('ext test input 3'), {
      target: { value: '999' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: {
          phones: [
            { number: '', ext: '' },
            { number: '123456789', ext: '' },
            { number: '', ext: '999' },
          ],
        },
        touched: {
          'phones[1].number': true,
          'phones[2].ext': true,
        },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled Array of Form Fields onValidate', () => {
    const onValidate = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({
        test: '',
        phones: [
          { number: '', ext: '' },
          { number: '', ext: '' },
        ],
      });
      const onChange = (nextValue) => setValue(nextValue);
      return (
        <Form value={value} onChange={onChange} onValidate={onValidate}>
          {value.phones.length &&
            value.phones.map((phone, idx) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                direction="row"
                justify="between"
                align="center"
              >
                <FormField name={`phones[${idx}].number`} required>
                  <TextInput
                    name={`phones[${idx}].number`}
                    placeholder={`number test input ${idx + 1}`}
                  />
                </FormField>
                <FormField name={`phones[${idx}].ext`}>
                  <TextInput
                    name={`phones[${idx}].ext`}
                    placeholder={`ext test input ${idx + 1}`}
                  />
                </FormField>
              </Box>
            ))}
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onValidate).toBeCalledWith(
      expect.objectContaining({
        errors: {
          'phones[0].number': 'required',
          'phones[1].number': 'required',
        },
        infos: {},
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('controlled Array of Form Fields onValidate custom error', () => {
    const onValidate = jest.fn();
    const errorMessage = 'Only Numbers';
    const testRules = {
      regexp: /^[0-9]*$/,
      message: errorMessage,
      status: 'error',
    };

    const Test = () => {
      const [value, setValue] = React.useState({
        test: '',
        phones: [
          { number: '', ext: '' },
          { number: '', ext: '' },
        ],
      });
      const onChange = (nextValue) => setValue(nextValue);
      return (
        <Form value={value} onChange={onChange} onValidate={onValidate}>
          {value.phones.length &&
            value.phones.map((phone, idx) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                direction="row"
                justify="between"
                align="center"
              >
                <FormField name={`phones[${idx}].number`} validate={testRules}>
                  <TextInput
                    name={`phones[${idx}].number`}
                    placeholder={`number test input ${idx + 1}`}
                  />
                </FormField>
                <FormField name={`phones[${idx}].ext`}>
                  <TextInput
                    name={`phones[${idx}].ext`}
                    placeholder={`ext test input ${idx + 1}`}
                  />
                </FormField>
              </Box>
            ))}
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('number test input 2'), {
      target: { value: 'sadasd' },
    });
    fireEvent.click(getByText('Submit'));
    expect(onValidate).toBeCalledWith(
      expect.objectContaining({
        errors: {
          'phones[1].number': errorMessage,
        },
        infos: {},
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('validate on mount - controlled form', () => {
    const Test = () => {
      const [formValue, setFormValue] = useState({
        firstName: 'J',
        middleName: '1',
        lastName: '',
        title: 1,
      });

      return (
        <Form
          value={formValue}
          validate="change"
          onChange={(nextValue) => setFormValue(nextValue)}
        >
          <FormField
            label="First Name"
            htmlFor="first-name"
            name="firstName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              (firstName) => {
                if (firstName && firstName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput id="first-name" name="firstName" />
          </FormField>
          <FormField
            label="Middle Name"
            htmlFor="middle-name"
            name="middleName"
            validate={[
              { regexp: /^[a-z]/i },
              (middleName) => {
                if (middleName && middleName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput id="middle-name" name="middleName" />
          </FormField>
          <FormField
            label="Last Name"
            htmlFor="last-name"
            name="lastName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              (lastName) => {
                if (lastName && lastName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput id="last-name" name="lastName" />
          </FormField>
          <FormField
            label="Title"
            htmlFor="title"
            name="title"
            validate={[
              { regexp: /^[a-z]/i },
              (title) => {
                if (title && title.length === 1) return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput id="title" name="title" />
          </FormField>
        </Form>
      );
    };

    render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    // firstName triggers string length validation, but not regexp
    expect(screen.queryAllByText('must be >1 character')).toHaveLength(1);
    // middleName & title trigger regexp, but not string length validation
    expect(screen.queryAllByText('invalid')).toHaveLength(2);
    // lastName should not trigger required validation onMount
    expect(screen.queryAllByText('required')).toHaveLength(0);
  });

  test('validate on mount - controlled input', () => {
    const Test = () => {
      const [firstName, setFirstName] = useState('J');
      const [middleName, setMiddleName] = useState('1');
      const [lastName, setLastName] = useState('');
      const [title, setTitle] = useState(1);

      return (
        <Form validate="change">
          <FormField
            label="First Name"
            htmlFor="first-name"
            name="firstName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              () => {
                if (firstName && firstName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput
              id="first-name"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </FormField>
          <FormField
            label="Middle Name"
            htmlFor="middle-name"
            name="middleName"
            validate={[
              { regexp: /^[a-z]/i },
              () => {
                if (middleName && middleName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput
              id="middle-name"
              name="middleName"
              value={middleName}
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </FormField>
          <FormField
            label="Last Name"
            htmlFor="last-name"
            name="lastName"
            required
            validate={[
              { regexp: /^[a-z]/i },
              () => {
                if (lastName && lastName.length === 1)
                  return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput
              id="last-name"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormField>
          <FormField
            label="Title"
            htmlFor="title"
            name="title"
            validate={[
              { regexp: /^[a-z]/i },
              () => {
                if (title && title.length === 1) return 'must be >1 character';
                return undefined;
              },
            ]}
          >
            <TextInput
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormField>
        </Form>
      );
    };

    render(
      <Grommet>
        <Test />
      </Grommet>,
    );

    // firstName triggers string length validation, but not regexp
    expect(screen.queryAllByText('must be >1 character')).toHaveLength(1);
    // middleName & title trigger regexp, but not string length validation
    expect(screen.queryAllByText('invalid')).toHaveLength(2);
    // lastName should not trigger required validation onMount
    expect(screen.queryAllByText('required')).toHaveLength(0);
  });
});
