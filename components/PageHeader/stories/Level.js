"use strict";

exports.__esModule = true;
exports["default"] = exports.Level = void 0;
var _grommet = require("grommet");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Level = exports.Level = function Level() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
    title: "Welcome to Your App",
    subtitle: "In this example, we showcase different levels of page headers  using the `level` prop. Page headers help provide hierarchy  and structure to your application's content.",
    actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "View Details"
    }),
    level: 1 // Use different levels for different headers
  }), /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
    title: "Main Section",
    subtitle: "This is the main section of your application where  you can display more detailed information about  a specific topic or category.",
    actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "View Details"
    }),
    level: 2
  }), /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
    title: "Subsection",
    subtitle: "Subsections provide further organization within a page.They  can be used to group related content together.",
    actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "View Details"
    }),
    level: 3
  })));
};
var _default = exports["default"] = {
  title: 'Layout/PageHeader/Level'
};