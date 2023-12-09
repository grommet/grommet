"use strict";

exports.__esModule = true;
exports["default"] = exports.Simple = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _data = require("../../DataTable/stories/data");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
          label: 'Location'
        }
      }
    }, /*#__PURE__*/_react["default"].createElement(DataToolbar, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns
    })))
    // </Grommet>
  );
};
var DataToolbar = function DataToolbar() {
  var _useContext = (0, _react.useContext)(_grommet.DataContext),
    filteredTotal = _useContext.filteredTotal,
    total = _useContext.total;
  return /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, {
    align: "end"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, {
    placeholder: "Search"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, {
    updateOn: "change"
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
  }))), filteredTotal !== total ? /*#__PURE__*/_react["default"].createElement(_grommet.DataClearFilters, null) : null);
};
Simple.storyName = 'Simple';
var _default = exports["default"] = {
  title: 'Data/DataClearFilters/Simple'
};