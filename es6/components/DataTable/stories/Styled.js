import React from 'react';
import { Box, DataTable } from 'grommet';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { groupColumns, DATA } from './data';
export var StyledDataTable = function StyledDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    React.createElement(Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: groupColumns,
      data: DATA,
      step: 10,
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      background: {
        header: {
          color: 'dark-1',
          opacity: 'strong'
        },
        body: ['light-1', 'light-3'],
        footer: {
          color: 'dark-1',
          opacity: 'strong'
        }
      },
      border: {
        body: 'bottom'
      },
      groupBy: {
        property: 'location',
        expand: ['Palo Alto']
      },
      rowProps: {
        Eric: {
          background: ['graph-2', 'graph-3'],
          pad: 'small'
        },
        Jet: {
          background: ['graph-2', 'graph-3'],
          pad: 'small'
        }
      }
    }))
    // </Grommet>
  );
};

StyledDataTable.storyName = 'Styled';
export default {
  title: 'Visualizations/DataTable/Styled'
};