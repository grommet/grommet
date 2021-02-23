import React from 'react';
import { grommet, Box, Grommet, Spinner, Text } from 'grommet';
export var Border = function Border() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'all',
      color: 'transparent',
      size: 'medium'
    }, {
      side: 'horizontal',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'all',
      color: 'brand',
      size: 'medium',
      style: 'dotted'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'horizontal',
      color: 'brand',
      size: 'large',
      style: 'inset'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'all',
      color: 'brand',
      size: 'large',
      style: 'groove'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'all',
      color: 'background-contrast',
      size: 'medium'
    }, {
      side: 'right',
      color: 'brand',
      size: 'medium'
    }, {
      side: 'top',
      color: 'brand',
      size: 'medium'
    }, {
      side: 'left',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading...")), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spinner, {
    border: [{
      side: 'horizontal',
      color: 'brand',
      size: 'medium'
    }]
  }), /*#__PURE__*/React.createElement(Text, null, "Loading..."))));
};
export default {
  title: 'Visualizations/Spinner/Border'
};