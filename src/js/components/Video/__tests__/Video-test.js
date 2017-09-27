import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Grommet } from '../../Grommet';
import { Video } from '../';

jest.mock('react-dom', () => ({
  findDOMNode: () => ({ textTracks: [{ label: 'test' }] }),
}));

const CONTENTS = [<source key='source' />, <track key='track' />];

test('Video renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video>{CONTENTS}</Video>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video autoplay renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video autoplay={true}>{CONTENTS}</Video>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video loop renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video loop={true}>{CONTENTS}</Video>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video controls renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video controls='over'>{CONTENTS}</Video>
      <Video controls='below'>{CONTENTS}</Video>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video fit renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video fit='cover'>{CONTENTS}</Video>
      <Video fit='contain'>{CONTENTS}</Video>
    </Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
