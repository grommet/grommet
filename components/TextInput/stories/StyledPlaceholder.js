"use strict";

exports.__esModule = true;
exports["default"] = exports.StyledPlaceholder = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var StyledPlaceholder = exports.StyledPlaceholder = function StyledPlaceholder() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      name: "name",
      placeholder: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "placeholder"),
      "aria-label": "Input Text"
    })))
    // </Grommet>
  );
};

StyledPlaceholder.storyName = 'Styled placeholder';
var _default = exports["default"] = {
  title: 'Input/TextInput/Styled placeholder'
};