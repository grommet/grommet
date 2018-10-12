import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

import { Grommet } from '../../Grommet';
import { Anchor } from '..';

test('Anchor renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor renders with children', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#'>children</Anchor>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor warns about invalid label render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' label='Test'>invalid</Anchor>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Anchor warns about invalid icon render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' icon={<svg />}>invalid</Anchor>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Anchor primary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' primary label='Test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor focus renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' focus label='Test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor disabled />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor icon={<svg />} label='Test' onClick={() => {}} />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor reverse icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor
        reverse
        icon={<svg />}
        label='Test'
        onClick={() => {}}
      />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor is clickable', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' label='Test' onClick={onClick} />
    </Grommet>
  );
  const tree = component.toJSON();

  const anchor = findAllByType(tree, 'a');
  anchor[0].props.onClick();
  expect(onClick).toBeCalled();
});
