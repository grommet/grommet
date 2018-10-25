import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { getByText } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '..';

describe('TextInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(<TextInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('suggestions', done => {
    const onInput = jest.fn();
    const onFocus = jest.fn();
    const { getByTestId, container } = render(
      <TextInput data-testid="test-input" id="item" name="item" suggestions={['test', 'test1']} onInput={onInput} onFocus={onFocus} />
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.input(getByTestId('test-input'));

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      expect(onInput).toBeCalled();
      expect(onFocus).toBeCalled();

      fireEvent(document, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('complex suggestions', done => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput data-testid="test-input" id="item" name="item" suggestions={[{ label: 'test', value: 'test' }, { value: 'test1' }]} />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.input(getByTestId('test-input'));

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent(document, new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('close suggestion drop', done => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput data-testid="test-input" id="item" name="item" suggestions={['test', 'test1']} />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.input(getByTestId('test-input'));
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.keyDown(getByTestId('test-input'), { key: 'Esc', keyCode: 27, which: 27 });
      setTimeout(() => {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });

  test('select suggestion', done => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput data-testid="test-input" plain size="large" id="item" name="item" suggestions={['test', 'test1']} onSelect={onSelect} />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.input(getByTestId('test-input'));
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.click(getByText(document, 'test1'));
      expect(container.firstChild).toMatchSnapshot();
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      expect(onSelect).toBeCalledWith(expect.objectContaining({ suggestion: 'test1' }));
      done();
    }, 50);
  });

  test('select a suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput data-testid="test-input" id="item" name="item" suggestions={['test', { value: 'test1' }]} onSelect={onSelect} />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    // pressing enter here nothing will happen
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 38 }); // up
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).toBeCalledWith(
      expect.objectContaining({
        suggestion: 'test',
      })
    );
  });

  test('handles next and previous without suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput data-testid="test-input" id="item" name="item" onSelect={onSelect} />
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 38 });
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onSelect).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
