import React from 'react';
import 'jest-styled-components';
import { act, cleanup, render, fireEvent } from '@testing-library/react';

import { Grommet, SkipLinks, SkipLink, SkipLinkTarget } from '../..';

describe('SkipLink', () => {
  afterEach(cleanup);

  test('basic', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Grommet>
        <SkipLinks id="skip-links">
          <SkipLink id="main" label="Main Content" />
          <SkipLink id="footer" label="Footer" />
        </SkipLinks>
        <div>
          <SkipLinkTarget id="main" />
          Main Content
          <input type="text" value="main content" onChange={() => {}} />
        </div>
        <footer>
          <SkipLinkTarget id="footer" />
          <input type="text" value="footer" onChange={() => {}} />
        </footer>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();

    document
      .getElementById('skip-links')
      .querySelector('a')
      .focus();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(document.activeElement);
    document
      .getElementById('skip-links')
      .querySelector('a')
      .blur();

    act(() => {
      jest.runAllTimers();
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
