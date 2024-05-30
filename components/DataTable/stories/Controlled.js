"use strict";

exports.__esModule = true;
exports["default"] = exports.ControlledDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
var _data = require("./data");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
var controlledColumns = _data.columns.map(function (col) {
  return _extends({}, col);
});
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;
var ControlledDataTable = exports.ControlledDataTable = function ControlledDataTable() {
  var _React$useState = _react["default"].useState([]),
    checked = _React$useState[0],
    setChecked = _React$useState[1];
  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };
  var onCheckAll = function onCheckAll(event) {
    return setChecked(event.target.checked ? _data.DATA.map(function (datum) {
      return datum.name;
    }) : []);
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
      columns: [{
        property: 'checkbox',
        render: function render(_ref) {
          var name = _ref.name;
          return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
            key: name,
            checked: checked.indexOf(name) !== -1,
            onChange: function onChange(e) {
              return onCheck(e, name);
            },
            "aria-label": "row checkbox"
          });
        },
        header: /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
          checked: checked.length === _data.DATA.length,
          indeterminate: checked.length > 0 && checked.length < _data.DATA.length,
          onChange: onCheckAll,
          "aria-label": "header checkbox"
        }),
        sortable: false
      }].concat(controlledColumns).map(function (col) {
        return _extends({}, col);
      }),
      data: _data.DATA,
      sortable: true,
      size: "medium"
    }))
    // </Grommet>
  );
};
ControlledDataTable.storyName = 'Controlled';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Controlled'
};