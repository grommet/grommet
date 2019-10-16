import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";
import { Box, Grommet, Tab, Tabs } from 'grommet';
import { grommet } from 'grommet/themes';

var UncontrolledTabs = function UncontrolledTabs(_ref) {
  var _ref$plain = _ref.plain,
      plain = _ref$plain === void 0 ? false : _ref$plain;
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Box, {
    fill: true
  }, React.createElement(Tabs, {
    flex: true
  }, React.createElement(Tab, {
    plain: plain,
    title: "Tab 1"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-1"
  }, React.createElement(Attraction, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    plain: plain,
    title: "Tab 2"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-2"
  }, React.createElement(TreeOption, {
    size: "xlarge"
  }))), React.createElement(Tab, {
    plain: plain,
    title: "Tab 3"
  }, React.createElement(Box, {
    fill: true,
    pad: "large",
    align: "center",
    background: "accent-3"
  }, React.createElement(Car, {
    size: "xlarge"
  }))))));
};

UncontrolledTabs.propTypes = {
  plain: PropTypes.bool // eslint-disable-line react/require-default-props

};
storiesOf('Tabs', module).add('Uncontrolled', function () {
  return React.createElement(UncontrolledTabs, null);
}).add('Plain', function () {
  return React.createElement(UncontrolledTabs, {
    plain: true
  });
});