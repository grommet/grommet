import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Form } from '..';
import { FormField } from '../../FormField';
import { Button } from '../../Button';

describe('Form', () => {
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

  test('update', () => {
    const validate = jest
      .fn()
      .mockReturnValueOnce('too short')
      .mockReturnValueOnce(undefined);
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
          <FormField name="test2" placeholder="test-2 input" />
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
    expect(onSubmit).toBeCalledWith(
      expect.objectContaining({ value: { test: 'value', test2: 'value-2' } }),
    );
  });
});
