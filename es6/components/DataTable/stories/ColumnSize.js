import React from 'react';
import { Grommet, Box, DataTable, Heading } from 'grommet';
import { grommet } from 'grommet/themes';
export var DATA = [{
  name: 'Alan Josiah Werner Shirleen Foy',
  location: 'Winston Salem',
  date: '2018-01-09',
  percent: 24,
  paid: 3425
}, {
  name: 'Bryan Lane Smallwood Dion Gunderson',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 30,
  paid: 1234
}, {
  name: 'Chris Willa Koehler Rocco Bales',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 2345
}, {
  name: 'Eric Maegan Regalado Kiana Lawton',
  location: 'Palo Alto',
  date: '2018-06-11',
  percent: 80,
  paid: 3456
}, {
  name: 'Doug Yong Cleveland Jule Gantt',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 60,
  paid: 1234
}, {
  name: 'Jet Isabella Mcnutt Deedee Bernstein',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 3456
}, {
  name: 'Michael Corazon Ragan September Hynes',
  location: 'Boise',
  date: '2018-06-11',
  percent: 50,
  paid: 1234
}, {
  name: 'Tracy Kimbery Mccrary Jona Kinsey',
  location: 'San Francisco',
  date: '2018-06-10',
  percent: 10,
  paid: 2345
}];
var columnsThemeSize = [{
  property: 'name',
  header: 'Name',
  size: 'xlarge'
}, {
  property: 'location',
  header: 'Location',
  size: 'small'
}, {
  property: 'date',
  header: 'Date',
  size: 'small',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  size: 'xsmall',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  size: 'xsmall',
  align: 'end'
}];
var columnsRelativeSize = [{
  property: 'name',
  header: 'Name',
  size: '1/2'
}, {
  property: 'location',
  header: 'Location',
  size: '1/4'
}, {
  property: 'date',
  header: 'Date',
  size: '1/4'
}];
var columnsAbsoluteSize = [{
  property: 'name',
  header: 'Name',
  size: '600px'
}, {
  property: 'location',
  header: 'Location',
  size: '200px'
}, {
  property: 'date',
  header: 'Date',
  size: '200px',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  size: '100px',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  size: '100px',
  align: 'end'
}];
var columnsDefault = [{
  property: 'name',
  header: 'Name'
}, {
  property: 'location',
  header: 'Location'
}, {
  property: 'date',
  header: 'Date',
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent',
  align: 'end'
}, {
  property: 'paid',
  header: 'Paid',
  align: 'end'
}];
export var ColumnSize = function ColumnSize() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, " Default DataTable"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columnsDefault,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Theme Column Sizes"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columnsThemeSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Absolute Column Sizes"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columnsAbsoluteSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })), /*#__PURE__*/React.createElement(Box, {
    fill: "horizontal",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }, "Relative Column Sizes"), /*#__PURE__*/React.createElement(DataTable, {
    columns: columnsRelativeSize,
    data: DATA,
    primaryKey: false,
    border: {
      color: 'border',
      side: 'vertical',
      size: '1px'
    }
  })));
};
ColumnSize.story = {
  name: 'Column sizes'
};