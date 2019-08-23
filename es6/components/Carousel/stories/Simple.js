function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Grommet, Box, Carousel } from 'grommet';

var SimpleCarousel = function SimpleCarousel(_ref) {
  var initialChild = _ref.initialChild,
      props = _objectWithoutPropertiesLoose(_ref, ["initialChild"]);

  return React.createElement(Grommet, null, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Carousel, _extends({
    initialChild: initialChild
  }, props), React.createElement(Box, {
    pad: "xlarge",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  })), React.createElement(Box, {
    pad: "xlarge",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  })), React.createElement(Box, {
    pad: "xlarge",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  })))));
};

storiesOf('Carousel', module).add('Simple', function () {
  return React.createElement(SimpleCarousel, null);
}).add('Initial Child', function () {
  return React.createElement(SimpleCarousel, {
    initialChild: 1
  });
}).add('Without Controls', function () {
  return React.createElement(SimpleCarousel, {
    controls: false,
    play: 1500
  });
});