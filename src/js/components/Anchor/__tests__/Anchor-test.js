import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';

import { Grommet } from '../../Grommet';
import { Anchor } from '..';

describe('Anchor', () => {
  afterEach(cleanup);

  test('should have no accessibility violations', async () => {
    const { container } = render(
      <Grommet>
        <Anchor>Link</Anchor>
      </Grommet>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  test('renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders with children', () => {
    const { container } = render(
      <Grommet>
        <Anchor href="#">children</Anchor>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('warns about invalid label render', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Anchor href="#" label="Test">
          invalid
        </Anchor>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Anchor should not have children if icon or label is provided',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('warns about invalid icon render', () => {
    console.warn = jest.fn();
    const warnSpy = jest.spyOn(console, 'warn');
    const { container } = render(
      <Grommet>
        <Anchor href="#" icon={<svg />}>
          invalid
        </Anchor>
      </Grommet>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(warnSpy).toHaveBeenCalledWith(
      'Anchor should not have children if icon or label is provided',
    );

    warnSpy.mockReset();
    warnSpy.mockRestore();
    console.warn.mockReset();
  });

  test('primary renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor href="#" primary label="Test" />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('focus renders', () => {
    const onFocus = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Anchor href="#" label="Test" onFocus={onFocus} />
      </Grommet>,
    );
    fireEvent.focus(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test('blur renders', () => {
    const onBlur = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Anchor href="#" label="Test" onBlur={onBlur} />
      </Grommet>,
    );
    fireEvent.blur(getByText('Test'));
    expect(container.firstChild).toMatchSnapshot();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('disabled renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor disabled />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('icon label renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('reverse icon label renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor reverse icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('size renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor size="xsmall" />
        <Anchor size="small" />
        <Anchor size="medium" />
        <Anchor size="large" />
        <Anchor size="xlarge" />
        <Anchor size="xxlarge" />
        <Anchor size="10px" />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('is clickable', () => {
    const onClick = jest.fn();
    const { container, getByText } = render(
      <Grommet>
        <Anchor href="#" label="Test" onClick={onClick} />
      </Grommet>,
    );
    const anchor = getByText('Test');
    fireEvent.click(anchor);
    expect(container.firstChild).toMatchSnapshot();
    expect(onClick).toBeCalled();
  });

  test('renders tag', () => {
    const { container } = render(
      <Grommet>
        <Anchor href="#" label="Test" as="span" />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('weight renders', () => {
    const { container } = render(
      <Grommet>
        <Anchor href="#" label="Normal" weight="normal" />
        <Anchor href="#" label="Bold" weight="bold" />
        <Anchor href="#" label="Bold" weight={500} />
      </Grommet>,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders a11yTitle and aria-label', () => {
    const { container, getByLabelText } = render(
      <Grommet>
        <Anchor href="#" label="Test" a11yTitle="test" />
        <Anchor href="#" label="Test" aria-label="test-2" />
      </Grommet>,
    );
    expect(getByLabelText('test')).toBeTruthy();
    expect(getByLabelText('test-2')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
