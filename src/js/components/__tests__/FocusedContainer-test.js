import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';

import { FocusedContainer } from '../FocusedContainer';

describe('FocusedContainer', () => {
  afterEach(cleanup);

  test('basic', () => {
    jest.useFakeTimers();
    const { container: trapped } = render(
      <div id="focus-trap-test">
        <input id="test" />
      </div>,
    );
    const { container: focuser } = render(
      <FocusedContainer id="container">
        test focused container
      </FocusedContainer>,
    );
    jest.runAllTimers();
    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    document.getElementById('test').focus();

    expect(trapped.firstChild).toMatchSnapshot();
  });

  test('restrict scroll', () => {
    jest.useFakeTimers();
    const { container } = render(
      <FocusedContainer id="container" restrictScroll>
        test focused container
      </FocusedContainer>,
    );

    jest.runAllTimers();

    expect(container.firstChild).toMatchSnapshot();
    expect(document.body.style.overflow).toMatchSnapshot();

    cleanup();

    expect(document.body.style.overflow).toMatchSnapshot();
  });

  test('blurs', () => {
    jest.useFakeTimers();
    const { container: trapped } = render(
      <div id="focus-trap-test">
        <input id="test" />
      </div>,
    );
    const { container: focuser } = render(
      <FocusedContainer id="container">
        test focused container
      </FocusedContainer>,
    );

    jest.runAllTimers();

    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    fireEvent.blur(focuser);

    expect(trapped.firstChild).toMatchSnapshot();
  });
});
