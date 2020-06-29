import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent, act } from '@testing-library/react';

// import { CaretDown, CaretUp, FormDown } from 'grommet-icons';
import { createPortal } from '../../../utils/portal';

import { Grommet } from '../..';
import { Select } from '..';
import { Form } from '../../Form';
import { FormField } from '../../FormField';
import { Button } from '../../Button';

describe('Select in form context', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select
              placeholder="test Select"
              options={['one', 'two', 'three']}
            />
          </FormField>
        </Form>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('opens', () => {
    window.scrollTo = jest.fn();
    jest.useFakeTimers();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select
              placeholder="test select"
              options={['one', 'two', 'three']}
            />
          </FormField>
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    expect(container.firstChild).toMatchSnapshot();
    // wait for select to open
    jest.advanceTimersByTime(100);
    expect(document.activeElement).toMatchSnapshot();
    window.scrollTo.mockRestore();
  });

  test('Select an option', () => {
    jest.useFakeTimers();
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select
              placeholder="test select"
              options={['one', 'two', 'three']}
              onChange={onChange}
            />
          </FormField>
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    jest.advanceTimersByTime(100);
    fireEvent.click(document.activeElement.querySelector('button'));
    expect(getByPlaceholderText('test select').value).toEqual('one');
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: 'one' }));
    window.scrollTo.mockRestore();
  });

  test('required', () => {
    jest.useFakeTimers();
    const onSubmit = jest.fn();
    window.scrollTo = jest.fn();
    const { getByPlaceholderText, container, getByText } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField name="test" label="Test" required>
            <Select
              options={['one', 'two', 'three']}
              name="test"
              placeholder="test select"
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByPlaceholderText('test select'));
    jest.advanceTimersByTime(100);
    fireEvent.click(document.activeElement.querySelector('button'));
    expect(getByPlaceholderText('test select').value).toEqual('one');
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });

  test('search', () => {
    jest.useFakeTimers();
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select
              placeholder="test select"
              options={['one', 'two', 'three']}
              onSearch={onSearch}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(document.activeElement).toMatchSnapshot();
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    expect(onSearch).toBeCalledWith('o');
  });
});
