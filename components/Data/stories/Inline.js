"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _excluded = ["search"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
  return /*#__PURE__*/_react["default"].createElement(_grommet.DataFilters, rest, search && /*#__PURE__*/_react["default"].createElement(_grommet.DataSearch, {
    property: "sub.name"
  }), /*#__PURE__*/_react["default"].createElement(_grommet.DataFilter, {
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
      search: true
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
      data: DATA,
      updateOn: sidebar ? 'change' : undefined
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        top: 'medium'
      },
      align: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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