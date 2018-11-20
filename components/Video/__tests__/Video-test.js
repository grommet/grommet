"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { mount } from 'enzyme';
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
var CONTENTS = [_react.default.createElement("source", {
  key: "source"
}), _react.default.createElement("track", {
  key: "track"
})];
test('Video renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, null, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video autoPlay renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, {
    autoPlay: true
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video loop renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, {
    loop: true
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video mute renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, {
    mute: true
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video controls renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, {
    controls: "over"
  }, CONTENTS), _react.default.createElement(_.Video, {
    controls: "below"
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Video fit renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Video, {
    fit: "cover"
  }, CONTENTS), _react.default.createElement(_.Video, {
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