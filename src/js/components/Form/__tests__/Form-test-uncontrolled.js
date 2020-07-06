import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';
import { Text } from '../../Text';
import { TextInput } from '../../TextInput';

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
      <Grommet>
        <Test />
      </Grommet>,
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

    // name field has new error and email field still
    // has required error message
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

  /* The three following tests align with FormField's supported 'validate' types
   * FormField's 'validate' prop accepts the following types:
   * 1) object in the shape of: {
   *  regexp?: object,
   *  message?: string | React.ReactNode,
   *  status?: 'error' | 'info'
   * }
   * 2) function: (...args: any[]) => any )
   * 3) array of 1) and/or 2) above
   */
  test('should validate when supplied an object', () => {
    const regexValidation = {
      regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
      message: 'At least one special character or space',
      status: 'error',
    };
    const expectedMessage = 'At least one special character or space';

    const { getByPlaceholderText, getByText, queryByText } = render(
      <Grommet>
        <Form>
          <FormField
            label="Create a Password"
            name="password"
            // required
            validate={regexValidation}
            // placeholder="Enter Password"
          >
            <TextInput name="password" placeholder="Enter Password" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    const input = getByPlaceholderText('Enter Password');
    const submitButton = getByText('Submit');

    // Absence of a special character in input should display
    // 'special character' error message
    fireEvent.change(input, {
      target: { value: 'abcde' },
    });
    fireEvent.click(submitButton);
    expect(getByText(expectedMessage).innerHTML).toBeTruthy();

    // Including a special character should validate. 'Special character'
    // error message should not be displayed.
    fireEvent.change(input, {
      target: { value: 'abcde%' },
    });
    fireEvent.click(submitButton);
    expect(queryByText(expectedMessage)).toBeNull();
  });

  test('should validate when supplied a function', () => {
    const functionValidation = combination => {
      return combination === '12345'
        ? {
            message:
              "That's amazing. I've got the same combination on my luggage!",
            status: 'info',
          }
        : undefined;
    };
    const infoMessage =
      "That's amazing. I've got the same combination on my luggage!";

    const { getByPlaceholderText, getByText, queryByText } = render(
      <Grommet>
        <Form>
          <FormField
            label="Druidia Shield Combination"
            name="combination"
            validate={functionValidation}
          >
            <TextInput name="combination" placeholder="Enter Combination" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    const input = getByPlaceholderText('Enter Combination');
    const submitButton = getByText('Submit');

    // If combination input matches value in function, should display
    // info message
    fireEvent.change(input, {
      target: { value: '12345' },
    });
    fireEvent.click(submitButton);
    expect(getByText(infoMessage)).toBeTruthy();

    // Combination info message should not be shown if value does not match.
    fireEvent.change(input, {
      target: { value: 'abcde%' },
    });
    fireEvent.click(submitButton);
    expect(queryByText(infoMessage)).toBeNull();
  });

  test(`should validate with array of objects and/or functions`, () => {
    const validationArray = [
      {
        regexp: new RegExp('(?=.*?[0-9])'),
        message: 'At least one number',
        status: 'error',
      },
      {
        regexp: new RegExp('.{5,}'),
        message: 'At least five characters',
        status: 'error',
      },
      combination => {
        return combination === '12345'
          ? {
              message:
                "That's amazing. I've got the same combination on my luggage!",
              status: 'info',
            }
          : undefined;
      },
      {
        regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
        message: 'At least one special character or space',
        status: 'error',
      },
    ];

    const validationMessages = [
      'At least one number',
      'At least five characters',
      "That's amazing. I've got the same combination on my luggage!",
      'At least one special character or space',
    ];

    const { getByPlaceholderText, getByText, queryByText } = render(
      <Grommet>
        <Form>
          <FormField
            label="Druidia Shield Combination"
            name="combination"
            validate={validationArray}
          >
            <TextInput name="combination" placeholder="Enter Combination" />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Grommet>,
    );

    const input = getByPlaceholderText('Enter Combination');
    const submitButton = getByText('Submit');

    // Needs to include a number. Show message.
    fireEvent.change(input, {
      target: { value: 'a' },
    });
    fireEvent.click(submitButton);
    expect(getByText('At least one number')).toBeTruthy();

    // Needs five characters. Show message.
    fireEvent.change(input, {
      target: { value: '1' },
    });
    fireEvent.click(submitButton);
    expect(getByText('At least five characters')).toBeTruthy();

    // Still needs five characters. Show message.
    fireEvent.change(input, {
      target: { value: '12' },
    });
    fireEvent.click(submitButton);
    expect(getByText('At least five characters')).toBeTruthy();

    // Input satifies condition in funciton. Show message.
    fireEvent.change(input, {
      target: { value: '12345' },
    });
    fireEvent.click(submitButton);

    expect(
      getByText("That's amazing. I've got the same combination on my luggage!"),
    ).toBeTruthy();

    // No special character included. Show message.
    fireEvent.change(input, {
      target: { value: '123456' },
    });
    fireEvent.click(submitButton);
    expect(getByText('At least one special character or space')).toBeTruthy();

    // All validation criteria met, so none of the messages should appear.
    fireEvent.change(input, {
      target: { value: '123456%' },
    });
    fireEvent.click(submitButton);
    validationMessages.forEach(message =>
      expect(queryByText(message)).toBeNull(),
    );
  });
});
