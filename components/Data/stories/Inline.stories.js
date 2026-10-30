"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _excluded = ["search"]; // SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var sizes = ['small', 'medium', 'large'];
var DATA = [];
for (var i = 0; i < 11; i += 1) {
  DATA.push({
    id: "x-" + i,
    sub: {
      name: "Name " + (i + 1)
    },
    size: sizes[i % sizes.length],
    date: "2022-12-" + (i % 30 + 1)
  });
}
var columns = [{
  property: 'id',
  header: 'ID'
}, {
  property: 'sub.name',
  header: 'Name'
}, {
  property: 'size',
  header: 'Size'
}, {
  property: 'date',
  header: 'Date'
}];
var Filters = function Filters(_ref) {
  var search = _ref.search,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, rest, search && /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, null), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
    property: "size"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataTableGroupBy, {
    options: ['size']
  }));
};
var Inline = exports.Inline = function Inline() {
  var size = (0, _react.useContext)(_grommet.ResponsiveContext);
  var toolbar;
  var sidebar;
  if (size === 'small' || size === 'xsmall') {
    toolbar = /*#__PURE__*/_react["default"].createElement(_grommet.Toolbar, {
      key: "tool"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, {
      property: "sub.name"
    }), /*#__PURE__*/_react["default"].createElement(Filters, {
      drop: true
    }));
  } else {
    sidebar = /*#__PURE__*/_react["default"].createElement(Filters, {
      search: true,
      updateOn: "change"
    });
  }
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_Data.Data, {
      properties: {
        'sub.name': {
          label: 'Name'
        },
        size: {
          label: 'Size'
        },
        date: {
          label: 'Date'
        }
      },
      data: DATA
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: sidebar ? ['auto', ['small', 'large']] : 'auto',
      gap: "large",
      pad: "large",
      justifyContent: "center"
    }, sidebar, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
      size: "small",
      margin: "none"
    }, "People"), toolbar, /*#__PURE__*/_react["default"].createElement(_grommet.DataSummary, null), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      flex: false
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: columns
    })))))
    // </Grommet>
  );
};
Inline.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Data/Data/Inline'
};