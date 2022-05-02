"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Children = function Children() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Page, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageContent, null, /*#__PURE__*/_react["default"].createElement(_grommet.PageHeader, {
      title: "Grommet",
      subtitle: "Grommet helps you build responsive and accessible \n          mobile-first projects for the web with an easy to use component \n          library.",
      actions: /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        label: "Get Started",
        primary: true
      }),
      parent: /*#__PURE__*/_react["default"].createElement(_grommet.Anchor, {
        label: "Open Source"
      })
    }, /*#__PURE__*/_react["default"].createElement(ContextualInfo, null)))) // </Grommet>

  );
};

exports.Children = Children;

var ContextualInfo = function ContextualInfo() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, {
    layout: "grid",
    pairProps: {
      direction: 'column'
    },
    valueProps: {
      width: 'small'
    },
    pad: {
      vertical: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
    name: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "Latest Version")
  }, "2.22.0"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
    name: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      size: "small"
    }, "Published")
  }, "25 days ago"));
};

var _default = {
  title: 'Layout/PageHeader/Children'
};
exports["default"] = _default;