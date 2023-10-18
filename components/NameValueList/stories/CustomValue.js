"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomValue = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var CustomValue = exports.CustomValue = function CustomValue() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "3xl"
    }, "Custom Value"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, null, Object.entries(_data.statusData).map(function (_ref) {
      var name = _ref[0],
        value = _ref[1];
      var icon;
      if (value === 'Ok') icon = /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusGoodSmall, {
        color: "green",
        size: "small"
      });else if (value === 'Critical') icon = /*#__PURE__*/_react["default"].createElement(_grommetIcons.StatusCriticalSmall, {
        color: "red",
        size: "small"
      });
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        align: "center",
        direction: "row",
        gap: "xsmall"
      }, icon, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        color: "text-strong"
      }, value)));
    }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "small",
      gap: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      weight: "bold",
      size: "3xl"
    }, "Custom Multi-Line Value"), /*#__PURE__*/_react["default"].createElement(_grommet.NameValueList, null, Object.entries(_data.languageData).map(function (_ref2) {
      var name = _ref2[0],
        value = _ref2[1];
      var icon;
      if (name === 'Languages') icon = /*#__PURE__*/_react["default"].createElement(_grommetIcons.Language, {
        size: "small"
      });else if (name === 'Operating System') icon = /*#__PURE__*/_react["default"].createElement(_grommetIcons.System, {
        size: "small"
      });
      return /*#__PURE__*/_react["default"].createElement(_grommet.NameValuePair, {
        key: name,
        name: name
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        align: "start",
        direction: "row",
        gap: "xsmall"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        flex: false,
        margin: {
          top: 'xsmall'
        }
      }, icon), /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        color: "text-strong"
      }, value)));
    }))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Visualizations/NameValueList/Custom Value'
};