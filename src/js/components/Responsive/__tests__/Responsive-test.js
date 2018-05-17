import React from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, renderIntoDocument } from 'react-testing-library';

import { Responsive } from '../';

test('Responsive basic', () => {
  const onChange = jest.fn();
  const { container } = renderIntoDocument(
    <Responsive onChange={onChange}>
      <span>hi</span>
    </Responsive>
  );
  expect(container.firstChild).toMatchSnapshot();

  global.window.innerWidth = 40;
  global.window.innerHeight = 40;
  fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));

  expect(onChange).toBeCalledWith('narrow');

  global.window.innerWidth = 2000;
  global.window.innerHeight = 2000;
  fireEvent(window, new Event('resize', { bubbles: true, cancelable: true }));

  expect(onChange).toBeCalledWith('wide');

  cleanup();
});
