"use strict";

exports.__esModule = true;
exports["default"] = exports.StyledDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

var StyledDataTable = exports.StyledDataTable = function StyledDataTable() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.groupColumns,
      data: _data.DATA,
      step: 10,
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      background: {
        header: {
          color: 'dark-1',
          opacity: 'strong'
        },
        body: ['light-1', 'light-3'],
        footer: {
          color: 'dark-1',
          opacity: 'strong'
        }
      },
      border: {
        body: 'bottom'
      },
      groupBy: {
        property: 'location',
        expand: ['Palo Alto']
      },
      rowProps: {
        Eric: {
          background: ['graph-2', 'graph-3'],
          pad: 'small'
        },
        Jet: {
          background: ['graph-2', 'graph-3'],
          pad: 'small'
        }
      }
    }))
    // </Grommet>
  );
};

StyledDataTable.storyName = 'Styled';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Styled'
};