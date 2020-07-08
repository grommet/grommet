import React from 'react';

import 'jest-styled-components';

import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { TextInput } from '../../TextInput';

describe('Form controlled', () => {
  afterEach(cleanup);

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

  test('controlled lazy', () => {
    const onSubmit = jest.fn();
    const Test = () => {
      const [value, setValue] = React.useState({ test: '' });
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
      const onChange = React.useCallback(nextValue => setValue(nextValue), []);
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
      const onChange = React.useCallback(nextValue => setValue(nextValue), []);
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
});
