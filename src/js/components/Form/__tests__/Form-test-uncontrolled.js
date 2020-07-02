import React from 'react';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { cleanup, render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { TextInput } from '../../TextInput';
import { Select } from '../../Select';
import { CheckBox } from '../../CheckBox';
import { Box } from '../../Box';

describe('Form accessibility', () => {
  afterEach(cleanup);

  // TextInput in Form should have no accessibility violations
  test('TextInput-Form should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField a11yTitle="test" />
        </Form>
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('Select in Form should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select options={['small', 'medium', 'large']} a11yTitle="test" />
          </FormField>
        </Form>
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  test('CheckBox in Form should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField>
            <CheckBox label="test" />
          </FormField>
        </Form>
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  // FormField with an explicit TextInput child
  // should have no accessibility violations
  test('TextInput-child should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField>
            <TextInput a11yTitle="test" />
          </FormField>
        </Form>
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });

  // Box with TextInput in Form should have no accessibility violations
  test('Box-TextInput should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField>
            <Box>
              <TextInput a11yTitle="test" />
            </Box>
          </FormField>
        </Form>
      </Grommet>,
    );
    const results = await axe(container);
    expect(container.firstChild).toMatchSnapshot();
    expect(results).toHaveNoViolations();
  });
});

describe('Form uncontrolled', () => {
  afterEach(cleanup);

  test('empty', () => {
    const component = renderer.create(
      <Grommet>
        <Form />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('with field', () => {
    const component = renderer.create(
      <Grommet>
        <Form>
          <FormField name="test" />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('errors', () => {
    const component = renderer.create(
      <Grommet>
        <Form errors={{ test: 'missing' }}>
          <FormField name="test" />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('infos', () => {
    const component = renderer.create(
      <Grommet>
        <Form infos={{ test: 'missing' }}>
          <FormField name="test" />
        </Form>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('uncontrolled', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField name="test">
            <TextInput name="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
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

  test('update', () => {
    const validate = jest
      .fn()
      .mockReturnValueOnce('too short')
      .mockReturnValueOnce(undefined);
    const validate2 = jest.fn().mockReturnValue(undefined);

    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
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
      </Grommet>,
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
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField
            name="test"
            required
            validate={{ regexp: /^[a-z]/i }}
            placeholder="test input"
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
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
      <Grommet>
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
      </Grommet>,
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
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField name="test" required placeholder="test input" />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
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
      <Grommet>
        <Form onReset={onReset}>
          <FormField name="test" required placeholder="test input" />
          <Button type="reset" primary label="Reset" />
        </Form>
      </Grommet>,
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
      <Grommet>
        {/* this test continues running forever if the whole event 
                passed to onSubmit */}
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
      </Grommet>,
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

  test('validate on blur', () => {
    const onFocus = jest.fn();
    const {
      getByText,
      getByPlaceholderText,
      queryAllByText,
      queryByText,
    } = render(
      <Grommet>
        <Form validate="blur">
          <FormField
            onFocus={onFocus}
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

          <FormField onFocus={onFocus} label="Email" name="email" required>
            <TextInput
              a11yTitle="test"
              name="email"
              type="email"
              placeholder="email"
            />
          </FormField>
          <Button onFocus={onFocus} label="submit" type="submit" />
        </Form>
      </Grommet>,
    );

    // both fields have required error message
    getByText('submit').focus();
    fireEvent.click(getByText('submit'));
    expect(queryAllByText('required')).toHaveLength(2);

    // one fields has required error message
    getByPlaceholderText('name').focus();
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'Input has changed' },
    });
    getByText('submit').focus();
    fireEvent.click(getByText('submit'));
    expect(queryAllByText('required')).toHaveLength(1);

    // name field has new error and email field still has required error message
    getByPlaceholderText('name').focus();
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'a' },
    });
    getByText('submit').focus();
    fireEvent.click(getByText('submit'));
    expect(queryByText('required')).toBeTruthy();
    expect(queryByText('must be >1 character')).toBeTruthy();

    //  new value in name does not remove the error message in email
    getByPlaceholderText('name').focus();
    fireEvent.change(getByPlaceholderText('name'), {
      target: { value: 'abc' },
    });
    expect(onFocus).toBeCalledTimes(6);
    expect(queryByText('required')).toBeTruthy();
    expect(queryByText('must be >1 character')).toBe(null);
  });

  test('uncontrolled without name', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <Form onSubmit={onSubmit}>
        <FormField>
          <TextInput a11yTitle="test" placeholder="test input" />
        </FormField>
        <Button type="submit" primary label="Submit" />
      </Form>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toBeCalledTimes(1);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('uncontrolled reset without value', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Grommet>
        <Form onChange={onChange}>
          <FormField
            name="test"
            required
            placeholder="test input"
            a11yTitle="test"
          />
          <Button type="reset" primary label="Reset" />
        </Form>
      </Grommet>,
    );
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'Input has changed' },
    });
    expect(onChange).toBeCalledTimes(1);
    fireEvent.click(getByText('Reset'));
    expect(queryByText('Input has changed')).toBeNull();
  });

  test('disabled', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, container } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField disabled>
            <TextInput a11yTitle="test" placeholder="test input" />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: 'v' },
    });
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).not.toBeCalledWith(
      expect.objectContaining({
        value: { test: 'v' },
        touched: { test: true },
      }),
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('regexp validation with status', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField
            name="test"
            required
            error="invalid"
            validate={{
              regexp: /^[a-z]/i,
              status: 'info',
            }}
            placeholder="test input"
            a11yTitle="test"
          />
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );

    fireEvent.change(getByPlaceholderText('test input'), {
      target: { value: '1' },
    });
    fireEvent.click(getByText('Submit'));
    expect(getAllByText('invalid')).toMatchSnapshot();
  });

  test('custom component', () => {
    const TextIn = ({ name, value, onChange }) => {
      return (
        <div>
          <input
            type="text"
            placeholder="Username"
            name={name}
            id="test"
            value={value}
            onChange={onChange}
          />
        </div>
      );
    };
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Grommet>
        <Form onChange={onChange}>
          <FormField required placeholder="test input">
            <TextIn value="Hello World" name="test" onChange={onChange} />
          </FormField>
        </Form>
      </Grommet>,
    );
    fireEvent.change(getByPlaceholderText('Username'), {
      target: { value: 'v' },
    });
    expect(onChange).toBeCalledTimes(1);
  });
});
