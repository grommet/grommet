import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render, renderIntoDocument, Simulate } from 'react-testing-library';
import { getByText } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '../';

describe('TextInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(
      <TextInput name='item' />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('suggestions', () => {
    const onInput = jest.fn();
    const onFocus = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <TextInput
        data-testid='test-input'
        id='item'
        name='item'
        suggestions={['test', 'test1']}
        onInput={onInput}
        onFocus={onFocus}
      />
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.focus(getByTestId('test-input'));
    Simulate.input(getByTestId('test-input'));
    expectPortal('text-input-drop__item').toMatchSnapshot();
    expect(onInput).toBeCalled();
    expect(onFocus).toBeCalled();

    fireEvent(document, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(document.getElementById('text-input-drop__item')).toBeNull();
  });

  test('complex suggestions', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          id='item'
          name='item'
          suggestions={[
            { label: 'test', value: 'test' },
            { value: 'test1' },
          ]}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.input(getByTestId('test-input'));
    expectPortal('text-input-drop__item').toMatchSnapshot();

    fireEvent(document, new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(document.getElementById('text-input-drop__item')).toBeNull();
  });

  test('close suggestion drop', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          id='item'
          name='item'
          suggestions={['test', 'test1']}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.input(getByTestId('test-input'));
    expectPortal('text-input-drop__item').toMatchSnapshot();

    Simulate.keyDown(getByTestId('test-input'), { key: 'Esc', keyCode: 27, which: 27 });
    expect(document.getElementById('text-input-drop__item')).toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('select suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          plain={true}
          size='large'
          id='item'
          name='item'
          suggestions={['test', 'test1']}
          onSelect={onSelect}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    Simulate.input(getByTestId('test-input'));
    expectPortal('text-input-drop__item').toMatchSnapshot();

    Simulate.click(getByText(document, 'test1'));
    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementById('text-input-drop__item')).toBeNull();
    expect(onSelect).toBeCalled();
  });

  test('next and previous suggestions', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          id='item'
          name='item'
          suggestions={['test', { value: 'test1' }]}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    const preventDefault = jest.fn();
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 38, preventDefault });
    expect(preventDefault).toBeCalled();
  });

  test('select a suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          id='item'
          name='item'
          suggestions={['test', { value: 'test1' }]}
          onSelect={onSelect}
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    const preventDefault = jest.fn();
    // pressing enter here nothing will happen
    Simulate.keyDown(input, { keyCode: 13, preventDefault });
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 13, preventDefault });
    expect(preventDefault).toBeCalled();
    expect(onSelect).toBeCalled();
  });

  test('handles next and previous without suggestion', () => {
    const { getByTestId, container } = renderIntoDocument(
      <Grommet>
        <TextInput
          data-testid='test-input'
          id='item'
          name='item'
        />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    const preventDefault = jest.fn();
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 40, preventDefault });
    Simulate.keyDown(input, { keyCode: 38, preventDefault });
    expect(preventDefault).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
