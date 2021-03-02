import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'jest-styled-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { getByText, screen } from '@testing-library/dom';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import { Search } from 'grommet-icons';

import { createPortal, expectPortal } from '../../../utils/portal';

import { Grommet } from '../../Grommet';
import { Keyboard } from '../../Keyboard';
import { MaskedInput } from '..';

describe('MaskedInput', () => {
  beforeEach(createPortal);
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <MaskedInput name="item" a11yTitle="axe-test" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(<MaskedInput name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon', () => {
    const { container } = render(<MaskedInput icon={<Search />} name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon reverse', () => {
    const { container } = render(
      <MaskedInput icon={<Search />} reverse name="item" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(<MaskedInput disabled name="item" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('mask', async () => {
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
        value="a"
        onChange={onChange}
        onFocus={onFocus}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));

    await waitFor(() => screen.findByText('aa'));

    expectPortal('masked-input-drop__item').toMatchSnapshot();
    expect(onChange).not.toBeCalled();
    expect(onFocus).toBeCalled();
  });

  test('mask with long fixed', async () => {
    const onChange = jest.fn(event => event.target.value);
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
        mask={[
          { fixed: 'https://' },
          {
            regexp: /^[ab]+$/,
          },
        ]}
        value=""
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');

    // Entering part of the fixed portion and then something that
    // matches the next portion should auto-expand the fixed portion
    fireEvent.change(input, {
      target: { value: 'hta' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('https://a');

    // Removing all but a piece of the fixed portion should
    // leave just that part of the fixed portion (like when
    // you backspace over it)
    fireEvent.change(input, {
      target: { value: 'http' },
    });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('http');
  });

  test('option via mouse', async () => {
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
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));

    const option = await waitFor(() => getByText(document, 'aa'));

    expectPortal('masked-input-drop__item').toMatchSnapshot();

    fireEvent.click(option);
    expect(container.firstChild).toMatchSnapshot();
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('aa!');
  });

  test('option via keyboard', async () => {
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
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.focus(input);

    await waitFor(() => screen.getByText('aa'));

    // pressing enter here nothing will happen
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 40 }); // down
    fireEvent.keyDown(input, { keyCode: 38 }); // up
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveReturnedWith('aa!');
  });

  test('Escape events should propagage if there is no drop', () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Grommet>
        <Keyboard onEsc={callback}>
          <MaskedInput data-testid="test-input" id="item" name="item" />
        </Keyboard>
      </Grommet>,
    );

    fireEvent.change(getByTestId('test-input'), {
      target: { value: ' ' },
    });
    fireEvent.keyDown(getByTestId('test-input'), {
      key: 'Esc',
      keyCode: 27,
      which: 27,
    });
    expect(callback).toBeCalled();
  });

  test('next and previous without options', () => {
    const onChange = jest.fn();
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
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

    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 40 });
    fireEvent.keyDown(input, { keyCode: 38 });
    fireEvent.keyDown(input, { keyCode: 13 }); // enter
    expect(onChange).not.toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('event target props are available option via mouse', async () => {
    const onChangeMock = jest.fn(event => {
      const {
        target: { value, id, name },
      } = event;
      return { target: { id, value, name } };
    });
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
        onChange={onChangeMock}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.focus(getByTestId('test-input'));

    await waitFor(() => screen.getByText('aa'));

    expectPortal('masked-input-drop__item').toMatchSnapshot();

    fireEvent.click(getByText(document, 'aa'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveReturnedWith(
      expect.objectContaining({
        target: expect.objectContaining({
          id: 'item',
          name: 'item',
          value: 'aa!',
        }),
      }),
    );
  });

  test('event target props are available option via keyboard', async () => {
    const onChangeMock = jest.fn(event => {
      const {
        target: { value, id, name },
      } = event;
      return { target: { id, value, name } };
    });
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        id="item"
        name="item"
        size="medium"
        mask={[
          {
            length: [1, 2],
            options: ['aa', 'bb'],
            regexp: /^[ab][ab]$|^[ab]$/,
          },
          { fixed: '!' },
        ]}
        onChange={onChangeMock}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();

    const input = getByTestId('test-input');
    fireEvent.focus(input);

    await waitFor(() => screen.getByText('aa'));

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
          id: 'item',
          name: 'item',
          value: 'aa!',
        }),
      }),
    );
  });

  test('applies custom global.hover theme to options', async () => {
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
          data-testid="test-input"
          plain
          size="large"
          id="item"
          name="item"
          mask={[
            {
              length: [1, 2],
              options: ['aa', 'bb', 'cc'],
              regexp: /^[ab][ab]$|^[ab]$/,
            },
            { fixed: '!' },
          ]}
          onChange={onChange}
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.focus(getByTestId('test-input'));

    await waitFor(() => screen.getByText('aa'));

    const optionButton = getByText(document, 'bb').closest('button');
    fireEvent.mouseOver(optionButton);
    expect(optionButton).toMatchSnapshot();
  });

  test('with no mask', async () => {
    const onChange = jest.fn(event => event.target.value);
    const { getByTestId, container } = render(
      <MaskedInput
        data-testid="test-input"
        plain
        size="large"
        id="item"
        name="item"
        onChange={onChange}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(getByTestId('test-input'), { target: { value: 'aa' } });

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toReturnWith('aa');
  });

  test('custom theme', async () => {
    const customTheme = {
      maskedInput: {
        container: {
          extend: 'svg { fill: red; stroke: red; }',
        },
      },
    };

    const { container } = render(
      <Grommet theme={customTheme}>
        <MaskedInput
          data-testid="test-input"
          size="large"
          id="item"
          icon={<Search />}
          name="item"
        />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
