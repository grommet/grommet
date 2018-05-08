import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { SkipLinks, SkipLink, SkipLinkTarget } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('SkipLink', () => {
  beforeEach(createPortal);

  test('mounts', () => {
    jest.useFakeTimers();
    mount(
      <div>
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
      </div>
    );

    expectPortal('skip-links').toMatchSnapshot();

    document.getElementById('skip-links').querySelector('a').focus();
    expectPortal('skip-links').toMatchSnapshot();

    Simulate.click(document.activeElement);
    document.getElementById('skip-links').querySelector('a').blur();

    setTimeout(() => {
      jest.runAllTimers();
      expect(document.activeElement).toMatchSnapshot();
    }, 50);
  });
});
