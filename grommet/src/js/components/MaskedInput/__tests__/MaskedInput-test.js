import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { getByText } from '@testing-library/dom';
import { Grommet } from '../../Grommet';
import { Keyboard } from '../../Keyboard';

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
    const onChange = jest.fn(event => event.target.value);
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
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 500);
  });

  test('option via keyboard', done => {
    const onChange = jest.fn(event => event.target.value);
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
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveReturnedWith('aa!');
      done();
    }, 300);
  });

  test('Escape events should propagage if there is no drop', done => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <Keyboard onEsc={callback}>
          <MaskedInput data-testid="test-masked-input" id="item" name="item" />
        </Keyboard>
      </Grommet>,
    );

    fireEvent.change(getByTestId('test-masked-input'), {
      target: { value: ' ' },
    });
    setTimeout(() => {
      fireEvent.keyDown(getByTestId('test-masked-input'), {
        key: 'Esc',
        keyCode: 27,
        which: 27,
      });
      expect(callback).toBeCalled();
      done();
    }, 50);
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

  test('event target props are available option via mouse', done => {
    const onChangeMock = jest.fn(event => {
      const {
        target: { value, id, name },
      } = event;
      return { target: { id, value, name } };
    });
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-event-target-select-by-mouse"
        plain
        size="large"
        id="input-id"
        name="input-name"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        value=""
        onChange={onChangeMock}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-event-target-select-by-mouse'));

    setTimeout(() => {
      expectPortal('masked-input-drop__input-id').toMatchSnapshot();

      fireEvent.click(getByText(document, 'aa'));
      expect(container.firstChild).toMatchSnapshot();
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveReturnedWith(
        expect.objectContaining({
          target: expect.objectContaining({
            id: 'input-id',
            name: 'input-name',
            value: 'aa!',
          }),
        }),
      );
      done();
    }, 500);
  });

  test('event target props are available option via keyboard', done => {
    const onChangeMock = jest.fn(event => {
      const {
        target: { value, id, name },
      } = event;
      return { target: { id, value, name } };
    });
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-event-target-select-by-keyboard"
        id="input-id"
        name="input-name"
        size="medium"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        value=""
        onChange={onChangeMock}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-event-target-select-by-keyboard');
    fireEvent.focus(input);

    setTimeout(() => {
      // pressing enter here nothing will happen
      fireEvent.keyDown(input, { keyCode: 13 }); // enter
      expect(onChangeMock).not.toBeCalled();
      fireEvent.keyDown(input, { keyCode: 40 }); // down
      fireEvent.keyDown(input, { keyCode: 40 }); // down
      fireEvent.keyDown(input, { keyCode: 38 }); // up
      fireEvent.keyDown(input, { keyCode: 13 }); // enter
      expect(onChangeMock).toBeCalled();
      expect(onChangeMock).toBeCalledTimes(1);
      expect(onChangeMock).toHaveReturnedWith(
        expect.objectContaining({
          target: expect.objectContaining({
            id: 'input-id',
            name: 'input-name',
            value: 'aa!',
          }),
        }),
      );
      done();
    }, 300);
  });

  test('applies custom global.hover theme to options', done => {
    const customTheme = {
      global: {
        hover: {
          background: {
            color: 'lightgreen',
          },
          color: {
            dark: 'lightgrey',
            light: 'brand',
          },
        },
      },
    };

    const onChange = jest.fn(event => event.target.value);
    const { getByTestId, container } = render(
      <Grommet theme={customTheme}>
        <MaskedInput
          data-testid="test-global-hover-theme"
          plain
          size="large"
          id="global-hover-theme"
          name="global-hover-theme"
          mask={[
            {
              length: [1, 2],
              options: ['aa', 'bb', 'cc'],
              regexp: /^[ab][ab]$|^[ab]$/,
            },
            { fixed: '!' },
          ]}
          value=""
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-global-hover-theme'));

    setTimeout(() => {
      const optionButton = getByText(document, 'bb').closest('button');
      fireEvent.mouseOver(optionButton);
      expect(optionButton).toMatchSnapshot();
      done();
    }, 500);
  });
});
