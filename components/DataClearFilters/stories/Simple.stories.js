"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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