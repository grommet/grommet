import React from 'react';
import { Box, Grid, Grommet } from 'grommet';
import { grommet } from '../../../themes';
export var BorderGrid = function BorderGrid() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "small",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/React.createElement(Grid, {
    pad: "small",
    border: true
  }, "true"), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "small"
  }, ['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(function (border) {
    return /*#__PURE__*/React.createElement(Grid, {
      key: border,
      pad: "small",
      border: border
    }, border);
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, /*#__PURE__*/React.createElement(Grid, {
    pad: "small",
    border: [{
      size: 'medium',
      style: 'dotted',
      side: 'top'
    }, {
      size: 'medium',
      style: 'double',
      side: 'vertical'
    }]
  }, "custom top & vertical borders")), /*#__PURE__*/React.createElement(Grid, {
    pad: "small",
    border: {
      color: 'brand'
    }
  }, "color"), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return /*#__PURE__*/React.createElement(Grid, {
      key: size,
      pad: "small",
      border: {
        size: size
      }
    }, size);
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['small', 'medium', 'large'].map(function (size) {
    return /*#__PURE__*/React.createElement(Grid, {
      key: size,
      pad: "small",
      responsive: false,
      border: {
        size: size
      }
    }, size);
  })), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive",
    gap: "small",
    align: "start"
  }, ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'].map(function (type) {
    return /*#__PURE__*/React.createElement(Grid, {
      key: type,
      pad: "small",
      border: {
        size: 'medium',
        style: type
      }
    }, type);
  }))));
};
BorderGrid.story = {
  name: 'Border'
};