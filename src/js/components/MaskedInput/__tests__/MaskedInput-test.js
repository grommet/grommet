import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { getByText } from 'dom-testing-library';

import { createPortal, expectPortal } from '../../../utils/portal';

import { MaskedInput } from '..';

describe('MaskedInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('basic', () => {
    const { container } = render(<MaskedInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('mask', done => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
          {
            length: 1,
            regexp: /^[ab]$/,
          },
        ]}
        value="bb!ax"
        onChange={onChange}
        onFocus={onFocus}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));

    setTimeout(() => {
      expectPortal('masked-input-drop__item').toMatchSnapshot();
      expect(onChange).not.toBeCalled();
      expect(onFocus).toBeCalled();
      done();
    }, 300);
  });

  test('option via mouse', done => {
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        plain
        size="large"
        id="item"
        name="item"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        value=""
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));

    setTimeout(() => {
      expectPortal('masked-input-drop__item').toMatchSnapshot();

      fireEvent.click(getByText(document, 'aa'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ target: { value: 'aa!' } }),
      );
      done();
    }, 300);
  });

  test('option via keyboard', done => {
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        value=""
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.focus(input);

    setTimeout(() => {
      // pressing enter here nothing will happen
      fireEvent.keyDown(input, { keyCode: 13 }); // enter
      fireEvent.keyDown(input, { keyCode: 40 }); // down
      fireEvent.keyDown(input, { keyCode: 40 }); // down
      fireEvent.keyDown(input, { keyCode: 38 }); // up
      fireEvent.keyDown(input, { keyCode: 13 }); // enter
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ target: { value: 'aa!' } }),
      );
      done();
    }, 300);
  });

  test('next and previous without options', done => {
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
        value=""
        mask={[
          {
            length: [1, 2],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.focus(input);

    setTimeout(() => {
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 40 });
      fireEvent.keyDown(input, { keyCode: 38 });
      fireEvent.keyDown(input, { keyCode: 13 }); // enter
      expect(onChange).not.toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 300);
  });
});
