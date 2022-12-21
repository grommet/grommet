import React from 'react';
import { Box, Data, DataFilter } from 'grommet';
import { DataFilters } from '../DataFilters';
import { DATA } from '../../DataTable/stories/data';
export var Drop = function Drop() {
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
    }, /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    }, /*#__PURE__*/React.createElement(DataFilter, {
      property: "location"
    }))))
    // </Grommet>
  );
};

Drop.args = {
  full: true
};
export default {
  title: 'Layout/Data/DataFilters/Drop'
};