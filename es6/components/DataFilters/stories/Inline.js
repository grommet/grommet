import React from 'react';
import { Box, Data, DataFilter, DataSearch, DataSort } from 'grommet';
import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';
export var Inline = function Inline() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(DataFilters, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }), /*#__PURE__*/React.createElement(DataFilter, {
      property: "percent"
    }), /*#__PURE__*/React.createElement(DataSort, null))))
    // </Grommet>
  );
};

Inline.args = {
  full: true
};
export default {
  title: 'Layout/Data/DataFilters/Inline'
};