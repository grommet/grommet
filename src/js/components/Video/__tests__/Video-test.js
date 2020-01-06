import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
// import { mount } from 'enzyme';

import { MnetUIBase, Video } from '../..';

const CONTENTS = [<source key="source" />, <track key="track" />];

test('Video renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video>{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video autoPlay renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video autoPlay>{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video loop renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video loop>{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video mute renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video mute>{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video controls renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video controls="over">{CONTENTS}</Video>
      <Video controls="below">{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video fit renders', () => {
  const component = renderer.create(
    <MnetUIBase>
      <Video fit="cover">{CONTENTS}</Video>
      <Video fit="contain">{CONTENTS}</Video>
    </MnetUIBase>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Video plays', () => {
//   const component = mount(
//     <MnetUIBase>
//       <Video controls='below'>{CONTENTS}</Video>
//     </MnetUIBase>
//   );
//   const button = component.find('button').at(0);
//   console.log('!!!', button.debug());
//   button.simulate('click');
//   expect(component).toMatchSnapshot();
// });

// test('Video controls appear on hover', () => {
//   const component = mount(
//     <MnetUIBase>
//       <Video controls='over'>{CONTENTS}</Video>
//     </MnetUIBase>
//   );
//   console.log('!!!', component.debug());
//   const container = component.find('StyledVideo__StyledVideoContainer');
//   console.log('!!!', container.debug());
//   container.simulate('mouseenter');
//   expect(component).toMatchSnapshot();
// });
