import React from 'react';
import { Grid, DataTable, Notification, Text } from 'grommet';
import { Data } from '../Data';
var data = [{
  id: 1,
  name: 'Alpha',
  location: {
    city: 'Athens',
    country: 'Greece'
  },
  economy: {
    GDP: 100
  },
  colors: ['White', 'Blue']
}, {
  id: 2,
  name: 'Beta',
  location: {
    city: 'Bangkok',
    country: 'Thailand'
  },
  economy: {
    GDP: 150
  },
  colors: ['Red', 'White', 'Blue']
}, {
  id: 3,
  name: 'Theta',
  location: {
    city: 'Berlin',
    country: 'Germany'
  },
  economy: {
    GDP: 200
  },
  colors: ['Red', 'Yellow', 'Black']
}];
var properties = {
  name: {
    label: 'Name',
    search: true
  },
  'location.city': {
    label: 'City'
  },
  'economy.GDP': {
    label: 'GDP'
  },
  colors: {
    label: 'Flag Colors',
    options: ['Red', 'White', 'Blue', 'Yellow', 'Black'],
    search: true
  }
};
var columns = [{
  property: 'name',
  header: 'Name',
  primary: true
}, {
  property: 'location.city',
  header: 'City'
}, {
  property: 'economy.GDP',
  header: 'GDP'
}, {
  property: 'colors',
  header: 'Flag Colors',
  // render using map map
  render: function render(datum) {
    return datum.colors.map(function (item) {
      return /*#__PURE__*/React.createElement(Text, {
        key: item
      }, item);
    });
  }
}];
export var Complex = function Complex() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'large']],
      justifyContent: "center",
      gap: "large"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/React.createElement(Data, {
      data: data,
      properties: properties,
      toolbar: true
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns,
      verticalAlign: {
        body: 'top'
      }
    })))
    // </Grommet>
  );
};

Complex.args = {
  full: true
};
export default {
  title: 'Data/Data/Complex'
};