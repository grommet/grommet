import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet, Audio } from '../..';

const CONTENTS = [<source key="source" />, <track key="track" />];

test('Audio renders', () => {
  const component = renderer.create(
    <Grommet>
      <Audio>{CONTENTS}</Audio>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Audio autoplay renders', () => {
  const component = renderer.create(
    <Grommet>
      <Audio autoplay>{CONTENTS}</Audio>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Audio loop renders', () => {
  const component = renderer.create(
    <Grommet>
      <Audio loop>{CONTENTS}</Audio>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Audio mute renders', () => {
  const component = renderer.create(
    <Grommet>
      <Audio mute>{CONTENTS}</Audio>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Audio controls renders', () => {
  const component = renderer.create(
    <Grommet>
      <Audio controls>{CONTENTS}</Audio>
      <Audio controls={false}>{CONTENTS}</Audio>
    </Grommet>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
