import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../grommet';
import { Stack } from '../';

const CONTENTS = [<div key={1}>first</div>, <div key={2}>second</div>];

test('Stack renders', () => {
  const component = renderer.create(
    <Grommet>
      <Stack>{CONTENTS}</Stack>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Stack anchor renders', () => {
  const component = renderer.create(
    <Grommet>
      <Stack anchor='center'>{CONTENTS}</Stack>
      <Stack anchor='top'>{CONTENTS}</Stack>
      <Stack anchor='left'>{CONTENTS}</Stack>
      <Stack anchor='bottom'>{CONTENTS}</Stack>
      <Stack anchor='right'>{CONTENTS}</Stack>
      <Stack anchor='top-left'>{CONTENTS}</Stack>
      <Stack anchor='bottom-left'>{CONTENTS}</Stack>
      <Stack anchor='top-right'>{CONTENTS}</Stack>
      <Stack anchor='bottom-right'>{CONTENTS}</Stack>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
