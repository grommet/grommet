import React from 'react';
import { Grid, DataTable, DataFilters, DataSearch, DataSummary, Notification, Text, Toolbar } from 'grommet';
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
  colors: ['white', 'blue']
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
  colors: ['red', 'white', 'blue']
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
  colors: ['red', 'yellow', 'black']
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
    options: [{
      label: 'Red',
      value: 'red'
    }, {
      label: 'White',
      value: 'white'
    }, {
      label: 'Blue',
      value: 'blue'
    }, {
      label: 'Yellow',
      value: 'yellow'
    }, {
      label: 'Black',
      value: 'black'
    }, {
      label: 'Green',
      value: 'green'
    }, {
      label: 'Orange',
      value: 'orange'
    }, {
      label: 'Gray',
      value: 'gray'
    }],
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
      properties: properties
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
      layer: true
    })), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
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