import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
// import { mount } from 'enzyme';

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

test('Video autoPlay renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video autoPlay={true}>{CONTENTS}</Video>
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

test('Video mute renders', () => {
  const component = renderer.create(
    <Grommet>
      <Video mute={true}>{CONTENTS}</Video>
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

// test('Video plays', () => {
//   const component = mount(
//     <Grommet>
//       <Video controls='below'>{CONTENTS}</Video>
//     </Grommet>
//   );
//   const button = component.find('button').at(0);
//   console.log('!!!', button.debug());
//   button.simulate('click');
//   expect(component).toMatchSnapshot();
// });

// test('Video controls appear on hover', () => {
//   const component = mount(
//     <Grommet>
//       <Video controls='over'>{CONTENTS}</Video>
//     </Grommet>
//   );
//   console.log('!!!', component.debug());
//   const container = component.find('StyledVideo__StyledVideoContainer');
//   console.log('!!!', container.debug());
//   container.simulate('mouseenter');
//   expect(component).toMatchSnapshot();
// });
