import React from 'react';
import { Data, DataSummary, DataTable, Grid, Paragraph } from 'grommet';
import { DataSearch } from '../DataSearch';
import { columns, DATA } from '../../DataTable/stories/data';
export var UpdateOnSubmit = function UpdateOnSubmit() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      pad: "large",
      columns: [['medium', 'large']],
      justifyContent: "center"
    }, /*#__PURE__*/React.createElement(Paragraph, {
      color: "text-weak"
    }, "Note: Results are filtered once you hit enter."), /*#__PURE__*/React.createElement(Data, {
      data: DATA
    }, /*#__PURE__*/React.createElement(DataSearch, {
      updateOn: "submit"
    }), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
UpdateOnSubmit.args = {
  full: true
};
UpdateOnSubmit.parameters = {
  chromatic: {
    disable: true
  }
};
UpdateOnSubmit.storyName = 'Update on submit';
export default {
  title: 'Data/DataSearch/Update on submit'
};