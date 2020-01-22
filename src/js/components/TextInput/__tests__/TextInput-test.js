import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { getByText } from '@testing-library/dom';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { TextInput } from '..';
import { Keyboard } from '../../Keyboard';

describe('TextInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(<TextInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(<TextInput disabled name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('suggestions', done => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { getByTestId, container } = render(
      <TextInput
        data-testid="test-input"
        id="item"
        name="item"
        suggestions={['test', 'test1']}
        onChange={onChange}
        onFocus={onFocus}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();
      expect(onChange).toBeCalled();
      expect(onFocus).toBeCalled();

      fireEvent(
        document,
        new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
      );
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('complex suggestions', done => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={[{ label: 'test', value: 'test' }, { value: 'test1' }]}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });

    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent(
        document,
        new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
      );
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      done();
    }, 50);
  });

  test('close suggestion drop', done => {
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      setTimeout(() => {
        expect(document.getElementById('text-input-drop__item')).toBeNull();
        expect(container.firstChild).toMatchSnapshot();
        done();
      }, 50);
    }, 50);
  });

  test('let escape events propagage if there are no suggestions', done => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <Keyboard onEsc={callback}>
          <TextInput data-testid="test-input" id="item" name="item" />
        </Keyboard>
      </Grommet>,
    );

    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      fireEvent.keyDown(getByTestId('test-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      expect(callback).toBeCalled();
      done();
    }, 50);
  });

  test('select suggestion', done => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          plain
          size="large"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          onSelect={onSelect}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));
    fireEvent.change(getByTestId('test-input'), { target: { value: ' ' } });
    setTimeout(() => {
      expectPortal('text-input-drop__item').toMatchSnapshot();

      fireEvent.click(getByText(document, 'test1'));
      expect(container.firstChild).toMatchSnapshot();
      expect(document.getElementById('text-input-drop__item')).toBeNull();
      expect(onSelect).toBeCalledWith(
        expect.objectContaining({ suggestion: 'test1' }),
      );
      done();
    }, 50);
  });

  test('select a suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', { value: 'test1' }]}
          onSelect={onSelect}
        />
      </Grommet>,
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
      }),
    );
  });

  test('handles next and previous without suggestion', () => {
    const onSelect = jest.fn();
    const { getByTestId, container } = render(
      <Grommet>
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          onSelect={onSelect}
        />
      </Grommet>,
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

  ['small', 'medium', 'large'].forEach(dropHeight => {
    test(`${dropHeight} drop height`, done => {
      const { getByTestId } = render(
        <TextInput
          data-testid="test-input"
          id="item"
          name="item"
          suggestions={['test', 'test1']}
          dropHeight={dropHeight}
        />,
      );

      fireEvent.focus(getByTestId('test-input'));
      setTimeout(() => {
        expectPortal('text-input-drop__item').toMatchSnapshot();
        done();
      }, 50);
    });
  });
});
