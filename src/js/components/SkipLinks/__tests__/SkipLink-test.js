import React from 'react';
import 'jest-styled-components';
import { cleanup, renderIntoDocument, Simulate } from 'react-testing-library';

import { Grommet, SkipLinks, SkipLink, SkipLinkTarget } from '../../';

describe('SkipLink', () => {
  afterEach(cleanup);

  test('basic', () => {
    jest.useFakeTimers();
    const { container } = renderIntoDocument(
      <Grommet>
        <SkipLinks id='skip-links'>
          <SkipLink id='main' label='Main Content' />
          <SkipLink id='footer' label='Footer' />
        </SkipLinks>
        <div>
          <SkipLinkTarget id='main' />
          Main Content
          <input type='text' value='main content' onChange={() => {}} />
        </div>
        <footer>
          <SkipLinkTarget id='footer' />
          <input type='text' value='footer' onChange={() => {}} />
        </footer>
      </Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    document.getElementById('skip-links').querySelector('a').focus();
    expect(container.firstChild).toMatchSnapshot();

    Simulate.click(document.activeElement);
    document.getElementById('skip-links').querySelector('a').blur();

    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
  });
});
