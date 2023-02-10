import React from 'react';
import { Data, DataSummary, DataTable, Grid, Notification, Paragraph } from 'grommet';
import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';
export var Responsive = function Responsive() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      pad: "large",
      columns: [['medium', 'large']],
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
      responsive: true
    }), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};

Responsive.args = {
  full: true
};
export default {
  title: 'Data/DataSearch/Responsive'
};