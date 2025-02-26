"use strict";

exports.__esModule = true;
exports["default"] = exports.ServedDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var ServedDataTable = exports.ServedDataTable = function ServedDataTable() {
  var _React$useState = _react["default"].useState(_data.DATA),
    data2 = _React$useState[0],
    setData2 = _React$useState[1];
  var onSearch = function onSearch(search) {
    var nextData;
    if (search) {
      // The function below escapes regular expression special characters:
      // [ \ ^ $ . | ? * + ( )
      var escapedText = function escapedText(text) {
        return text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      };
      var expressions = Object.keys(search).map(function (property) {
        return {
          property: property,
          // Create the regular expression with modified value which handles
          // escaping special characters. Without escaping special characters,
          // errors will appear in the console
          exp: new RegExp(escapedText(search[property]), 'i')
        };
      });
      nextData = _data.DATA.filter(function (d) {
        return !expressions.some(function (e) {
          return !e.exp.test(d[e.property]);
        });
      });
    } else {
      nextData = _data.DATA;
    }
    setData2(nextData);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: _data.columns.map(function (column) {
        return _extends({}, column, {
          search: column.property === 'name' || column.property === 'location'
        });
      }),
      data: data2,
      onSearch: onSearch
    }))
    // </Grommet>
  );
};
ServedDataTable.storyName = 'Served';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Served'
};