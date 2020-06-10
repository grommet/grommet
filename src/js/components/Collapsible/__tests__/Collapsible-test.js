import React from 'react';
import 'jest-styled-components';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { Collapsible } from '..';
import { Grommet } from '../../Grommet';
import { Text } from '../../Text';

describe('Collapsible', () => {
  let App;
  let open;
  let direction;
  beforeEach(() => {
    App = () => {
      return (
        <Grommet>
          <Collapsible open={open} direction={direction}>
            <Text>Example</Text>
          </Collapsible>
        </Grommet>
      );
    };
  });
  afterEach(cleanup);

  test('no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('open', () => {
    open = true;
    const { container } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick open default', () => {
    open = false;
    const { container, rerender } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    rerender(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('direction vertical', () => {
    open = false;
    direction = 'vertical';
    const { container, rerender } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('direction horizontal', () => {
    open = false;
    direction = 'horizontal';
    const { container, rerender } = render(<App />);
    expect(container.firstChild).toMatchSnapshot();
    open = !open;
    expect(open).toBe(true);
    // Rerendering because props were updated. Want to render with new props
    rerender(<App />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
