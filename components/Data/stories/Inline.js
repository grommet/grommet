"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Data = require("../Data");
var _excluded = ["search"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var Inline = function Inline() {
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
exports.Inline = Inline;
Inline.args = {
  full: true
};
var _default = {
  title: 'Data/Data/Inline'
};
exports["default"] = _default;