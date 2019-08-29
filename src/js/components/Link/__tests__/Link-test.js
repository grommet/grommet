import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { findAllByType } from '../../../utils';

import { Grommet } from '../../Grommet';
import { Link, Anchor } from '..';

test('Link renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link renders with children', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link">children</Link>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link warns about invalid label render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Link href="#link" label="Test">
        invalid
      </Link>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith(
    'Link should not have children if icon or label is provided',
  );

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Link warns about invalid icon render', () => {
  const warnSpy = jest.spyOn(console, 'warn');
  const component = renderer.create(
    <Grommet>
      <Link href="#link" icon={<svg />}>
        invalid
      </Link>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith(
    'Link should not have children if icon or label is provided',
  );

  warnSpy.mockReset();
  warnSpy.mockRestore();
});

test('Link primary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link" primary label="Test" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link focus renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link" focus label="Test" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link" disabled />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link href="#link" icon={<svg />} label="Test" onClick={() => {}} />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link reverse icon label renders', () => {
  const component = renderer.create(
    <Grommet>
      <Link
        href="#link"
        reverse
        icon={<svg />}
        label="Test"
        onClick={() => {}}
      />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link is clickable', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    <Grommet>
      <Link href="#link" label="Test" onClick={onClick} />
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
      <Link href="#link" label="Test" as="span" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Old Anchors still work', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href="#link" label="Test" as="span" />
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
