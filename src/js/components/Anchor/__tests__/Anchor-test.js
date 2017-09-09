import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Anchor } from '../';

import { findAllByType } from '../../utils';

test('Anchor renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' label='Test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor primary renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' primary={true} label='Test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor focus renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor href='#' focus={true} label='Test' />
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Anchor disabled renders', () => {
  const component = renderer.create(
    <Grommet>
      <Anchor disabled={true} />
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
        reverse={true}
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
