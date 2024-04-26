"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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