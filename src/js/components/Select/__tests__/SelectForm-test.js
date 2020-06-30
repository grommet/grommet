import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent, act } from '@testing-library/react';

import { createPortal, expectPortal } from '../../../utils/portal';

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

  test('opens and closes', () => {
    window.scrollTo = jest.fn();
    jest.useFakeTimers();
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Grommet>
        <Form>
          <FormField>
            <Select
              placeholder="test select"
              options={['one', 'two', 'three']}
              id="test-select"
              onOpen={onOpen}
              onClose={onClose}
            />
          </FormField>
        </Form>
      </Grommet>,
    );
    // open select
    fireEvent.click(getByPlaceholderText('test select'));
    // wait for select to open
    jest.advanceTimersByTime(100);
    expect(container.firstChild).toMatchSnapshot();
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('test-select__drop').toMatchSnapshot();
    expect(onOpen).toHaveBeenCalled();
    // close select
    fireEvent.click(getByPlaceholderText('test select'));
    // wait for select to close
    jest.advanceTimersByTime(100);
    expect(container.firstChild).toMatchSnapshot();
    expect(document.activeElement).toMatchSnapshot();
    expect(document.getElementById('test-select__drop')).toBeNull();
    expect(onClose).toHaveBeenCalled();

    window.scrollTo.mockRestore();
  });

  test('Select an option', () => {
    const onSubmit = jest.fn();
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField>
            <Select
              placeholder="test select"
              options={['one', 'two', 'three']}
              onChange={onChange}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    fireEvent.click(document.activeElement.querySelector('button'));
    expect(getByPlaceholderText('test select').value).toEqual('one');
    expect(onChange).toBeCalledWith(expect.objectContaining({ value: 'one' }));
    // submit form
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
    window.scrollTo.mockRestore();
  });

  test('required', () => {
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
    fireEvent.click(document.activeElement.querySelector('button'));
    expect(getByPlaceholderText('test select').value).toEqual('one');
    // submit form
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
        </Form>
      </Grommet>,
    );
    fireEvent.click(getByPlaceholderText('test select'));
    // wait for select to open so search can have focus
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(document.activeElement).toMatchSnapshot();
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    expect(onSearch).toBeCalledWith('o');
  });

  test('select multiple', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField>
            <Select
              placeholder="test select"
              id="test-select"
              options={['one', 'two', 'three']}
              multiple
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    const select = getByPlaceholderText('test select');
    fireEvent.click(select);

    fireEvent.click(
      document.getElementById('test-select__drop').querySelector('button'),
    );
    expect(select.value).toEqual('one');
    // open select again
    fireEvent.click(select);
    fireEvent.click(
      document
        .getElementById('test-select__drop')
        .querySelectorAll('button')[1],
    );
    expect(select.value).toEqual('multiple');
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });

  test('multiple selected', () => {
    const onSubmit = jest.fn();
    const { container, getByPlaceholderText, getByText } = render(
      <Grommet>
        <Form onSubmit={onSubmit}>
          <FormField>
            <Select
              placeholder="test select"
              id="test-select"
              options={['one', 'two', 'three']}
              multiple
              selected={[0, 1]}
            />
          </FormField>
          <Button type="submit" primary label="Submit" />
        </Form>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getByPlaceholderText('test select').value).toEqual('multiple');
    fireEvent.click(getByText('Submit'));
    expect(onSubmit).toHaveBeenCalled();
  });
});
