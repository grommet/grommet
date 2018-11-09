import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Video } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleVideo = function SimpleVideo() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Video, null, React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.ogv",
    type: "video/ogg"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.mp4",
    type: "video/mp4"
  }), React.createElement("source", {
    src: "http://techslides.com/demos/sample-videos/small.3gp",
    type: "video/3gp"
  })));
};

storiesOf('Video', module).add('Simple Video', function () {
  return React.createElement(SimpleVideo, null);
});