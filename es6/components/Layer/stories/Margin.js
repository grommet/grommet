function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Layer } from 'grommet';
import { grommet } from 'grommet/themes';

var MarginLayer = function MarginLayer(_ref) {
  var margin = _ref.margin,
      rest = _objectWithoutPropertiesLoose(_ref, ["margin"]);

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Layer, _extends({
    margin: margin || {
      left: '40px',
      top: '50px',
      right: '30px',
      bottom: '10px'
    }
  }, rest), React.createElement(Box, {
    height: "small",
    overflow: "auto"
  }, React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"), React.createElement(Box, {
    pad: "xlarge"
  }, "text"))));
};

storiesOf('Layer', module).add('Margin', function () {
  return React.createElement(MarginLayer, {
    full: true
  });
}).add('Margin (Center)', function () {
  return React.createElement(MarginLayer, {
    margin: "large"
  });
}).add('Margin Top (Center)', function () {
  return React.createElement(MarginLayer, {
    margin: {
      top: 'large'
    },
    position: "top"
  });
});