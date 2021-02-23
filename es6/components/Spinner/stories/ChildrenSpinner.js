import React from 'react';
import styled from 'styled-components';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Nodes } from "grommet-icons/es6/icons/Nodes";
import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
var FavoriteFilled = styled(Favorite).withConfig({
  displayName: "ChildrenSpinner__FavoriteFilled",
  componentId: "o9wy2d-0"
})(["path[fill='none']{fill:red;}"]);
export var Children = function Children() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    margin: "large",
    align: "center"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    align: "center",
    justify: "center",
    size: "large"
  }, /*#__PURE__*/React.createElement(Nodes, {
    size: "large",
    color: "graph-0"
  })), /*#__PURE__*/React.createElement(Text, null, " Spinner with an icon child")), /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "large",
    pad: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    animation: {
      type: 'pulse',
      duration: 650,
      size: 'medium'
    },
    justify: "center"
  }, /*#__PURE__*/React.createElement(FavoriteFilled, {
    color: "red",
    size: "large"
  })), /*#__PURE__*/React.createElement(Text, {
    margin: {
      horizontal: 'small'
    }
  }, " Loading with LOVE..."))));
};
export default {
  title: 'Visualizations/Spinner/Children'
};