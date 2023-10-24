"use strict";

exports.__esModule = true;
exports["default"] = exports.Grouped = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Grouped = exports.Grouped = function Grouped() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
      dropProps: {
        align: {
          top: 'bottom',
          left: 'left'
        },
        elevation: 'xlarge'
      },
      label: "Grouped Menu",
      items: [[{
        label: 'View Details'
      }, {
        label: 'Edit Permissions'
      }, {
        label: 'Update Password'
      }], [{
        label: 'Delete'
      }]]
    }))
    // </Grommet>
  );
};

Grouped.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Controls/Menu/Grouped'
};