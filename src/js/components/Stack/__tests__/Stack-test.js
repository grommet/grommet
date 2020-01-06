import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { MnetUIBase } from '../../MnetUIBase';
import { Stack } from '..';

const CONTENTS = [<div key={1}>first</div>, <div key={2}>second</div>];

test('renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Stack>{CONTENTS}</Stack>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('guidingChild renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Stack guidingChild="first">{CONTENTS}</Stack>
      <Stack guidingChild="last">{CONTENTS}</Stack>
      <Stack guidingChild={0}>{CONTENTS}</Stack>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('anchor renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Stack anchor="center">{CONTENTS}</Stack>
      <Stack anchor="top">{CONTENTS}</Stack>
      <Stack anchor="left">{CONTENTS}</Stack>
      <Stack anchor="bottom">{CONTENTS}</Stack>
      <Stack anchor="right">{CONTENTS}</Stack>
      <Stack anchor="top-left">{CONTENTS}</Stack>
      <Stack anchor="bottom-left">{CONTENTS}</Stack>
      <Stack anchor="top-right">{CONTENTS}</Stack>
      <Stack anchor="bottom-right">{CONTENTS}</Stack>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('fill renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Stack fill>{CONTENTS}</Stack>
      <Stack fill={false}>{CONTENTS}</Stack>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('interactiveChild renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Stack interactiveChild="first">{CONTENTS}</Stack>
      <Stack interactiveChild="last">{CONTENTS}</Stack>
      <Stack interactiveChild={0}>{CONTENTS}</Stack>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
