import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from 'grommet';
import { Attraction } from "grommet-icons/es6/icons/Attraction";
import { Car } from "grommet-icons/es6/icons/Car";
import { TreeOption } from "grommet-icons/es6/icons/TreeOption";

var UncontrolledTabs = function UncontrolledTabs(_ref) {
  var _ref$plain = _ref.plain,
      plain = _ref$plain === void 0 ? false : _ref$plain;
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true
    }, /*#__PURE__*/React.createElement(Tabs, {
      flex: true
    }, /*#__PURE__*/React.createElement(Tab, {
      plain: plain,
      title: "Tab 1"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      pad: "large",
      align: "center",
      background: "accent-1"
    }, /*#__PURE__*/React.createElement(Attraction, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      plain: plain,
      title: "Tab 2"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      pad: "large",
      align: "center",
      background: "accent-2"
    }, /*#__PURE__*/React.createElement(TreeOption, {
      size: "xlarge"
    }))), /*#__PURE__*/React.createElement(Tab, {
      plain: plain,
      title: "Tab 3"
    }, /*#__PURE__*/React.createElement(Box, {
      fill: true,
      pad: "large",
      align: "center",
      background: "accent-3"
    }, /*#__PURE__*/React.createElement(Car, {
      size: "xlarge"
    }))))) // </Grommet>

  );
};

UncontrolledTabs.propTypes = {
  plain: PropTypes.bool // eslint-disable-line react/require-default-props

};
UncontrolledTabs.args = {
  full: true
};
export var Uncontrolled = function Uncontrolled() {
  return /*#__PURE__*/React.createElement(UncontrolledTabs, null);
};
export default {
  title: 'Controls/Tabs/Uncontrolled'
};