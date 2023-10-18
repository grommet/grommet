"use strict";

exports.__esModule = true;
exports["default"] = exports.Complex = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
      return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        key: item
      }, item);
    });
  }
}];
var Complex = exports.Complex = function Complex() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Grid, {
      flex: false,
      pad: "large",
      columns: [['small', 'large']],
      justifyContent: "center",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    }), /*#__PURE__*/_react["default"].createElement(_Data.Data, {
      data: data,
      properties: properties
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, null, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
      layer: true
    })), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
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
var _default = exports["default"] = {
  title: 'Data/Data/Complex'
};