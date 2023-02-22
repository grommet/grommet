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
  }
}, {
  id: 2,
  name: 'Beta',
  location: {
    city: 'Bangkok',
    country: 'Thailand'
  },
  economy: {
    GDP: 150
  }
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
}];
var Complex = function Complex() {
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
      properties: properties,
      toolbar: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};
exports.Complex = Complex;
Complex.args = {
  full: true
};
var _default = {
  title: 'Data/Data/Complex'
};
exports["default"] = _default;