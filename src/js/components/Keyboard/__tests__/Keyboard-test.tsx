import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Keyboard } from '..';

describe('Keyboard', () => {
  test('onDown', () => {
    const onDown = jest.fn();
    const { container } = render(
      <Grommet>
        <Keyboard onDown={onDown}>
          <span>hi</span>
        </Keyboard>
      </Grommet>,
    );

    const element = screen.getByText('hi');

    fireEvent.keyDown(element, { keyCode: 40 });
    fireEvent.keyDown(element, { which: 40 });
    fireEvent.keyDown(element, { which: 0 });

    expect(onDown).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onKeyDown', () => {
    const onDown = jest.fn();
    const onKeyDown = jest.fn();
    const { container } = render(
      <Grommet>
        <Keyboard onDown={onDown} onKeyDown={onKeyDown}>
          <span>hi</span>
        </Keyboard>
      </Grommet>,
    );

    const element = screen.getByText('hi');

    fireEvent.keyDown(element, { keyCode: 40 });

    expect(onDown).toBeCalled();
    expect(onKeyDown).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('change onKeyDown', () => {
    const firstOnKeyDown = jest.fn();
    const secondOnKeyDown = jest.fn();

    const { container, getByText, rerender } = render(
      <Keyboard target="document" onKeyDown={firstOnKeyDown}>
        <span>hi</span>
      </Keyboard>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent(
      getByText('hi'),
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true }),
    );
    expect(firstOnKeyDown).toBeCalled();

    rerender(
      <Keyboard target="document" onKeyDown={secondOnKeyDown}>
        <span>hi</span>
      </Keyboard>,
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent(
      getByText('hi'),
      new KeyboardEvent('keydown', { bubbles: true, cancelable: true }),
    );
    expect(secondOnKeyDown).toBeCalled();
  });
});
