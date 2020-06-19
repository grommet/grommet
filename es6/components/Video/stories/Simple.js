import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleVideo = function SimpleVideo(props) {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Video, props, /*#__PURE__*/React.createElement("source", {
    src: "small.mp4",
    type: "video/mp4"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), /*#__PURE__*/React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  }))));
};

storiesOf('Video', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleVideo, null);
}).add('Controls Below', function () {
  return /*#__PURE__*/React.createElement(SimpleVideo, {
    controls: "below"
  });
});