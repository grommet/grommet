import React, { useState } from 'react';
import { DataFilters, DataFilter, DataSearch, DataSummary, DataTable, Grid, Notification, Toolbar } from 'grommet';
import { Data } from '../Data';
import { columns, DATA } from '../../DataTable/stories/data';
var defaultView = {
  properties: [],
  search: '',
  sort: {
    property: 'name',
    direction: 'asc'
  }
};

// simulate back end filtering
var filter = function filter(view) {
  var _view$search, _view$search2;
  var searchExp = (_view$search = view.search) != null && _view$search.text || typeof view.search === 'string' && view.search ? new RegExp(view.search.text || view.search, 'i') : undefined;
  var searchProperty = (_view$search2 = view.search) == null ? void 0 : _view$search2.property;
  return DATA.filter(function (datum) {
    var matched = true;
    if (searchExp) {
      matched = Object.keys(datum).some(function (property) {
        if (!searchProperty || searchProperty === property || Array.isArray(searchProperty) && searchProperty.includes(property)) return searchExp.test(datum[property]);
        return false;
      });
    }
    var properties = view.properties;
    if (matched && properties) {
      matched = !Object.keys(properties).some(function (property) {
        var value = properties[property];
        if (Array.isArray(value)) return !value.includes(datum[property]);
        return value !== datum[property];
      });
    }
    return matched;
  });
};
export var Controlled = function Controlled() {
  var _useState = useState(defaultView),
    view = _useState[0],
    setView = _useState[1];
  var _useState2 = useState(DATA),
    data = _useState2[0],
    setData = _useState2[1];
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
      total: DATA.length,
      view: view,
      onView: function onView(nextView) {
        setView(nextView);
        setData(filter(nextView));
      }
    }, /*#__PURE__*/React.createElement(Toolbar, null, /*#__PURE__*/React.createElement(DataSearch, null), /*#__PURE__*/React.createElement(DataFilters, {
      drop: true
    }, /*#__PURE__*/React.createElement(DataFilter, {
      property: "location",
      options: Array.from(new Set(DATA.map(function (d) {
        return d.location;
      }))).filter(function (v) {
        return v;
      }).sort()
    }))), /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))
    // </Grommet>
  );
};

Controlled.args = {
  full: true
};
export default {
  title: 'Data/Data/Controlled'
};