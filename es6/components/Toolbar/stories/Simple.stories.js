import React from 'react';
import { Box, Button, Data, DataFilters, DataSearch } from 'grommet';
import { Toolbar } from '../Toolbar';
import { DATA } from '../../DataTable/stories/data';
export var Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Box, {
      width: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
      layer: true
    }), /*#__PURE__*/React.createElement(Box, {
      flex: true
    }), /*#__PURE__*/React.createElement(Button, {
      label: "Create",
      primary: true
    })))))
    // </Grommet>
  );
};
Simple.args = {
  full: true
};
export default {
  title: 'Data/Toolbar/Simple'
};