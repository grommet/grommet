import React from 'react';
import { Data, DataSummary, DataTable, Grid, Notification, Paragraph } from 'grommet';
import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';
export var Drop = function Drop() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      pad: "large",
      columns: ['large'],
      justifyContent: "center"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered as you type, checking all fields."), /*#__PURE__*/React.createElement(Data, {
      data: DATA,
      updateOn: "change"
    }, /*#__PURE__*/React.createElement(DataSearch, {
      drop: true
    }), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};

Drop.args = {
  full: true
};
export default {
  title: 'Data/DataSearch/Drop'
};