import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { TextInput } from '../../TextInput';

describe('Form', () => {
  afterEach(cleanup);

  test('empty', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Form />
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('with field', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Form>
          <FormField name="test" />
        </Form>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('errors', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Form errors={{ test: 'missing' }}>
          <FormField name="test" />
        </Form>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('infos', () => {
    const component = renderer.create(
      <MnetUIBase>
        <Form infos={{ test: 'missing' }}>
          <FormField name="test" />
        </Form>
      </MnetUIBase>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('controlled', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(nextValue => setValue(nextValue), []);
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
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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

  test('controlled lazy', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({});
      React.useEffect(() => setValue({ test: 'test' }), []);
      const onChange = React.useCallback(nextValue => setValue(nextValue), []);
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
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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

  test('uncontrolled', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <MnetUIBase>
        <Form onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
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
        event => setValue(event.target.value),
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
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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
        event => setValue(event.target.value),
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
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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

  test('update', () => {
    const validate = jest
      .fn()
      .mockReturnValueOnce('too short')
      .mockReturnValueOnce(undefined);
    const validate2 = jest.fn().mockReturnValue(undefined);

    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <MnetUIBase>
        <Form onSubmit={onSubmit}>
          <FormField
            name="test"
            required
            validate={validate}
            placeholder="test input"
          />
          <FormField
            name="test2"
            placeholder="test-2 input"
            validate={[validate2]}
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    fireEvent.click(getByText('Submit'));

    expect(validate).toBeCalledWith('v', { test: 'v' });
    expect(validate2).toBeCalledWith(undefined, { test: 'v' });

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'value' },
    });
    fireEvent.change(getByPlaceholderText('test-2 input'), {
      target: { value: 'value-2' },
    });

    fireEvent.click(getByText('Submit'));
    expect(validate).toBeCalledWith('value', {
      test: 'value',
      test2: 'value-2',
    });
    expect(validate2).toBeCalledWith('value-2', {
      test: 'value',
      test2: 'value-2',
    });

    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'value', test2: 'value-2' },
        touched: { test: true, test2: true },
      }),
    );
  });

  test('regexp validation', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MnetUIBase>
        <Form onSubmit={onSubmit}>
          <FormField
            name="test"
            required
            validate={{ regexp: /^[a-z]/i }}
            placeholder="test input"
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
    );

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: '1' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('invalid')).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'a' },
    });
    fireEvent.click(getByText('Submit'));
    expect(queryByText('invalid')).toBeNull();
  });

  test('validate', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <MnetUIBase>
        <Form onSubmit={onSubmit}>
          <FormField
            name="test"
            required
            validate={[
              value => {
                return value.length === 1 ? 'simple string' : undefined;
              },
              value => {
                return value.length === 2 ? (
                  <Text> ReactNode </Text>
                ) : (
                  undefined
                );
              },
              value => {
                return value.length === 3
                  ? { message: 'status error', status: 'error' }
                  : undefined;
              },
              value => {
                return value.length === 4
                  ? { message: 'status info', status: 'info' }
                  : undefined;
              },
            ]}
            placeholder="test input"
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
    );

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'a' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('simple string')).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'ab' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('ReactNode')).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'abc' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('status error')).toMatchSnapshot();

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'abcd' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getByText('status info')).toMatchSnapshot();
  });

  test('required validation', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MnetUIBase>
        <Form onSubmit={onSubmit}>
          <FormField name="test" required placeholder="test input" />
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
    );

    fireEvent.click(getByText('Submit'));
    expect(queryByText('required')).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: '1' },
    });
    expect(queryByText('required')).toBeNull();
  });

  test('reset clears form', () => {
    const onReset = jest.fn();
    const { getByPlaceholderText, getByText, queryByText } = render(
      <MnetUIBase>
        <Form onReset={onReset}>
          <FormField name="test" required placeholder="test input" />
          <Button type="reset" primary label="Reset" />
        </Form>
      </MnetUIBase>,
    );
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'Input has changed' },
    });
    fireEvent.click(getByText('Reset'));
    expect(queryByText('Input has changed')).toBeNull();
  });

  test('initial values', () => {
    const onSubmit = jest.fn();
    const { getByText, queryByText } = render(
      <MnetUIBase>
        {/* this test continues running forever if the whole event passed to
            onSubmit */}
        <Form onSubmit={({ value, touched }) => onSubmit({ value, touched })}>
          <FormField
            name="test"
            required
            placeholder="test input"
            value="Initial value"
          />
          <FormField name="test2" value="Initial value2" />
          <Button type="submit" primary label="Submit" />
        </Form>
      </MnetUIBase>,
    );
    fireEvent.click(getByText('Submit'));
    expect(queryByText('required')).toBeNull();
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({
        value: { test: 'Initial value', test2: 'Initial value2' },
        touched: {},
      }),
    );
  });

  test('lazy value', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [test, setTest] = React.useState();
      return (
        <Form onSubmit={({ value, touched }) => onSubmit({ value, touched })}>
          <TextInput name="test" value={test} />
          <Button label="set" onClick={() => setTest('a')} />
          <Button label="submit" type="submit" />
        </Form>
      );
    };
    const { container, getByText } = render(
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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
  test('validate on blur', () => {
    const Test = () => (
      <Form validate="blur">
        <FormField
          label="Name"
          name="name"
          placeholder="name"
          required
          validate={[
            { regexp: /^[a-z]/i },
            name => {
              if (name && name.length === 1) return 'must be >1 character';
              return undefined;
            },
            name => {
              if (name === 'good')
                return {
                  message: 'good',
                  status: 'info',
                };
              return undefined;
            },
          ]}
        />

        <FormField label="Email" name="email" required>
          <TextInput name="email" type="email" placeholder="email" />
        </FormField>
        <Button label="submit" type="submit" />
      </Form>
    );
    const {
      getByText,
      getByPlaceholderText,
      queryAllByText,
      queryByText,
    } = render(
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
    );

    // both fields have required error message
    fireEvent.click(getByText('submit'));
    expect(queryAllByText('required')).toHaveLength(2);

    // one fields has required error message
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Input has changed' },
    });
    fireEvent.click(getByText('submit'));
    expect(queryAllByText('required')).toHaveLength(1);

    // name field has new error and email field still has required error message
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'a' },
    });
    fireEvent.click(getByText('submit'));
    expect(queryByText('required')).toBeTruthy();
    expect(queryByText('must be >1 character')).toBeTruthy();

    //  new value in name does not remove the error message in email
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'abc' },
    });
    expect(queryByText('required')).toBeTruthy();
    expect(queryByText('must be >1 character')).toBe(null);
  });

  // deprecated FormField+input pattern

  test('controlled FormField deprecated', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
      const onChange = React.useCallback(nextValue => setValue(nextValue), []);
      return (
        <Form value={value} onChange={onChange} onSubmit={onSubmit}>
          <FormField label="test" name="test" id="test" htmlFor="test" />
          <Button type="submit" primary label="Submit" />
        </Form>
      );
    };
    const { getByLabelText, getByText, container } = render(
      <MnetUIBase>
        <Test />
      </MnetUIBase>,
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
});
