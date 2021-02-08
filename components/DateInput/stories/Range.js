"use strict";

exports.__esModule = true;
exports["default"] = exports.Range = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric'
});

var Range = function Range() {
  var _React$useState = _react["default"].useState(['2020-07-31T15:27:42.920Z', '2020-08-07T15:27:42.920Z']),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    var nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DateInput, {
    value: value,
    buttonProps: {
      label: dateFormat.format(new Date(value[0])) + " - " + dateFormat.format(new Date(value[1]))
    },
    onChange: onChange
  })));
};

exports.Range = Range;
Range.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/DateInput/Range'
};
exports["default"] = _default;