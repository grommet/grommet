import React from 'react';
import { create } from 'react-test-renderer';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';

import { Grommet } from '../../Grommet';
import { Keyboard } from '..';

describe('Keyboard', () => {
  test('onDown', () => {
    const onDown = jest.fn();
    const component = create(
      <Grommet>
        <Keyboard onDown={onDown}>
          <span>hi</span>
        </Keyboard>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.children[0].props.onKeyDown({
      keyCode: 40,
    });
    tree.children[0].props.onKeyDown({
      which: 40,
    });
    tree.children[0].props.onKeyDown({
      which: 0,
    });
    expect(onDown).toBeCalled();
  });

  test('onKeyDown', () => {
    const onDown = jest.fn();
    const onKeyDown = jest.fn();
    const component = create(
      <Grommet>
        <Keyboard onDown={onDown} onKeyDown={onKeyDown}>
          <span>hi</span>
        </Keyboard>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.children[0].props.onKeyDown({
      keyCode: 40,
    });
    expect(onDown).toBeCalled();
    expect(onKeyDown).toBeCalled();
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
