import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { axe } from 'jest-axe';
import { findAllByType } from '../../../utils';

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
    const component = renderer.create(
      <Grommet>
        <Anchor />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with children', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor href="#">children</Anchor>
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const component = renderer.create(
      <Grommet>
        <Anchor href="#" primary label="Test" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const component = renderer.create(
      <Grommet>
        <Anchor disabled />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('icon label renders', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('reverse icon label renders', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor reverse icon={<svg />} label="Test" onClick={() => {}} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('size renders', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor size="xsmall" />
        <Anchor size="small" />
        <Anchor size="medium" />
        <Anchor size="large" />
        <Anchor size="xlarge" />
        <Anchor size="xxlarge" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('is clickable', () => {
    const onClick = jest.fn();
    const component = renderer.create(
      <Grommet>
        <Anchor href="#" label="Test" onClick={onClick} />
      </Grommet>,
    );
    const tree = component.toJSON();

    const anchor = findAllByType(tree, 'a');
    anchor[0].props.onClick();
    expect(onClick).toBeCalled();
  });

  test('renders tag', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor href="#" label="Test" as="span" />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('weight renders', () => {
    const component = renderer.create(
      <Grommet>
        <Anchor href="#" label="Normal" weight="normal" />
        <Anchor href="#" label="Bold" weight="bold" />
        <Anchor href="#" label="Bold" weight={500} />
      </Grommet>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
