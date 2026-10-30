"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var Simple = exports.Simple = function Simple() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Data, {
      data: _data.DATA,
      total: _data.DATA.length,
      properties: {
        location: {
          label: 'Location',
          badge: false
        },
        percent: {
          label: 'Percent'
        },
        date: {
          label: 'date'
        },
        name: {
          label: 'Name'
        }
      },
      views: [{
        name: 'latest',
        sort: {
          property: 'date',
          direction: 'desc'
        }
      }, {
        name: 'Bay Area behind',
        properties: {
          percent: {
            min: 0,
            max: 50
          },
          location: ['San Francisco']
        }
      }]
    }, /*#__PURE__*/_react["default"].createElement(DataToolbar, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns
    })))
    // </Grommet>
  );
};
var DataToolbar = function DataToolbar() {
  var _useContext = (0, _react.useContext)(_grommet.DataContext),
    view = _useContext.view;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, {
    gap: "medium",
    align: "end"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, {
    align: "end"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
    updateOn: "change",
    clearFilters: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
    property: "location"
    // override HPE theme margin to align with search + filter
    ,
    contentProps: {
      margin: {
        bottom: 'none',
        top: 'xsmall'
      }
    }
    // override Grommet theme margin to align with search + filter
    ,
    margin: "none"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.SelectMultiple, {
    placeholder: "Select location",
    options: ['Boise', 'Fort Collins', 'Palo Alto', 'San Francisco'],
    name: "location"
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
    layer: true,
    clearFilters: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
    property: "name"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
    property: "percent"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
    property: "paid"
  })), (view == null ? void 0 : view.properties) !== undefined && Object.keys(view == null ? void 0 : view.properties).length !== 0 ? /*#__PURE__*/_react["default"].createElement(_grommet.DataClearFilters, null) : null), /*#__PURE__*/_react["default"].createElement(_grommet.DataView, null));
};
Simple.storyName = 'Simple';
var _default = exports["default"] = {
  title: 'Data/DataClearFilters/Simple'
};