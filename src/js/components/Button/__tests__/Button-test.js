import React from 'react';

import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { Add, Next } from 'grommet-icons';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Grommet, Button, Text } from '../..';

describe('Button', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container, getByText } = render(
      <Grommet>
        <Button a11yTitle="Test button" label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('passes through the aria-label prop', async () => {
    const TEST_LABEL = 'Test Label';
    const { container, getByText } = render(
      <Grommet>
        <Button aria-label={TEST_LABEL} label="Test" onClick={() => {}} />
      </Grommet>,
    );

    const button = container.querySelector('button');
    expect(button.getAttribute('aria-label')).toEqual(TEST_LABEL);

    fireEvent.click(getByText('Test'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('basic', () => {
    const { container } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('children function', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}}>{() => <Text>Test</Text>}</Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('children function with disabled prop', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} disabled>
          {({ disabled }) => <Text>{disabled ? 'Disabled' : 'Test'}</Text>}
        </Button>
        <Button onClick={() => {}}>
          {({ disabled }) => <Text>{disabled ? 'Disabled' : 'Test'}</Text>}
        </Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('warns about invalid label', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('warns about invalid icon', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Button icon={<svg />} onClick={() => {}}>
          invalid
        </Button>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Button should not have children if icon or label is provided',
    );
    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('primary', () => {
    const { container } = render(
      <Grommet>
        <Button primary label="Test" onClick={() => {}} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('color', () => {
    const { container } = render(
      <Grommet>
        <Button color="accent-1" label="Test" onClick={() => {}} />
        <Button color="accent-1" primary label="Test" onClick={() => {}} />
        <Button color="#111111" primary label="Test" onClick={() => {}} />
        <Button color="#123" primary label="Test" onClick={() => {}} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('fill', () => {
    const { container } = render(
      <Grommet>
        <Button fill />
        <Button fill={false} />
        <Button fill="horizontal" />
        <Button fill="vertical" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('focus', () => {
    const { container, getByText } = render(
      <Grommet>
        <Button label="Test" onClick={() => {}} />
      </Grommet>,
    );

    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('tip', () => {
    const { container, getByText } = render(
      <Grommet>
        <Button label="Default Tip" onClick={() => {}} tip="tooltip" />
      </Grommet>,
    );

    fireEvent.mouseOver(getByText('Default Tip'));
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <Grommet>
        <Button disabled />
        <Button disabled primary label="Button" />
        <Button disabled label="Button" />
        <Button disabled plain label="Button" />
        <Button disabled plain={false} label="Button" />
        <Button disabled icon={<svg />} />
        <Button disabled icon={<svg />} plain />
        <Button disabled icon={<svg />} plain={false} />
        <Button disabled icon={<svg />} label="Button" />
        <Button disabled icon={<svg />} label="Button" plain />
        <Button disabled icon={<svg />} label="Button" primary />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('active', () => {
    const { container } = render(
      <Grommet>
        <Button active label="Button" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('active + primary', () => {
    const { container } = render(
      <Grommet>
        <Button active primary label="Button" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('icon label', () => {
    const { container } = render(
      <Grommet>
        <Button icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('reverse icon label', () => {
    const { container } = render(
      <Grommet>
        <Button reverse icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('href', () => {
    const { container } = render(
      <Grommet>
        <Button href="test" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('hoverIndicator background', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="background">
          hoverIndicator
        </Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('hoverIndicator as object with color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'brand' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('hoverIndicator as object with invalid color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator={{ color: 'invalid' }}>
          hoverIndicator
        </Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('hoverIndicator color', () => {
    const { container } = render(
      <Grommet>
        <Button onClick={() => {}} hoverIndicator="dark-3">
          hoverIndicator
        </Button>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <Grommet>
        <Button label="Test" onClick={onClick} />
      </Grommet>,
    );

    fireEvent.click(getByRole('button'));
    expect(onClick).toBeCalled();
  });

  test('size', () => {
    const { container } = render(
      <Grommet>
        <Button size="small" label="Small" />
        <Button size="medium" label="Medium" />
        <Button label="Default" />
        <Button size="large" label="Large" />
        <Button primary size="small" label="Small" />
        <Button primary size="medium" label="Medium" />
        <Button primary label="Default" />
        <Button primary size="large" label="Large" />
        <Button size="small" icon={<Add />} primary />
        <Button size="medium" icon={<Add />} primary />
        <Button icon={<Add />} primary />
        <Button size="large" icon={<Add />} primary />
        <Button size="small" label="Small" icon={<Next />} reverse />
        <Button size="medium" label="Medium" icon={<Next />} reverse />
        <Button label="Default" icon={<Next />} reverse />
        <Button size="large" label="Large" icon={<Next />} reverse />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('as', () => {
    const { container } = render(
      <Grommet>
        <Button as="span" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('a11yTitle', () => {
    const { container } = render(
      <Grommet>
        <Button a11yTitle="Title" />
        <Button aria-label="Title" />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`disabled state cursor should indicate the button cannot be
  clicked`, () => {
    const { getByText } = render(
      <Grommet>
        <Button disabled label="Button" />
      </Grommet>,
    );

    const button = getByText('Button');
    // eslint-disable-next-line no-underscore-dangle
    const cursorStyle = window.getComputedStyle(button)._values.cursor;
    expect(cursorStyle).not.toBe('pointer');
    expect(cursorStyle).toBe('default');
  });

  test(`badge should be offset from top-right corner`, () => {
    const { container } = render(
      <Grommet>
        <Button a11yTitle="Button, alert" label="Button" badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display number content`, () => {
    const { container } = render(
      <Grommet>
        <Button a11yTitle="Button, 2 unread alerts" label="Button" badge={2} />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should display "+" when number is greater than max`, () => {
    const { container } = render(
      <Grommet>
        <Button
          a11yTitle="Button, 100 unread alerts"
          label="Button"
          badge={{ value: 100, max: 9 }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should apply background`, () => {
    const { container } = render(
      <Grommet>
        <Button
          a11yTitle="Button, 100 unread alerts"
          label="Button"
          badge={{
            background: 'status-ok',
            value: 100,
          }}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should render custom element`, () => {
    const { container } = render(
      <Grommet>
        <Button
          a11yTitle="Button, Add user alert"
          label="Button"
          badge={<Add />}
        />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`badge should render relative to contents when button has no
  border or background`, () => {
    const { container } = render(
      <Grommet>
        <Button a11yTitle="Button, Add user alert" icon={<Add />} badge />
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
