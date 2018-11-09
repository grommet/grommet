import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components'; // import { mount } from 'enzyme';

import { Grommet, Video } from '../..';
jest.mock('react-dom', function () {
  return {
    findDOMNode: function findDOMNode() {
      return {
        textTracks: [{
          label: 'test'
        }]
      };
    }
  };
});
var CONTENTS = [React.createElement("source", {
  key: "source"
}), React.createElement("track", {
  key: "track"
})];
test('Video renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, null, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video autoPlay renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, {
    autoPlay: true
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video loop renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, {
    loop: true
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video mute renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, {
    mute: true
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video controls renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, {
    controls: "over"
  }, CONTENTS), React.createElement(Video, {
    controls: "below"
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video fit renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Video, {
    fit: "cover"
  }, CONTENTS), React.createElement(Video, {
    fit: "contain"
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
}); // test('Video plays', () => {
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