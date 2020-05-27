"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rangeInputTheme = {
  rangeInput: {
    track: {
      height: '10px',
      lower: {
        color: 'brand',
        opacity: 0.7
      },
      upper: {
        color: 'dark-4',
        opacity: 0.3
      }
    }
  }
};

var CustomRangeInput = function CustomRangeInput() {
  var _React$useState = _react["default"].useState(3),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
      isAddDisabled = _React$useState2[0],
      setIsAddDisabled = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(),
      isSubtractDisabled = _React$useState3[0],
      setIsSubtractDisabled = _React$useState3[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: rangeInputTheme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    disabled: isSubtractDisabled,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Subtract, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      if (value > 0) {
        setIsAddDisabled(false);
        setValue(value - 1);
      } else setIsSubtractDisabled(true);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    min: 0,
    max: 10,
    step: 1,
    value: value,
    onChange: onChange
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    plain: false,
    disabled: isAddDisabled,
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, {
      color: "neutral-2"
    }),
    onClick: function onClick() {
      if (value < 10) {
        setIsSubtractDisabled(false);
        setValue(value + 1);
      } else setIsAddDisabled(true);
    }
  })));
};

(0, _react2.storiesOf)('RangeInput', module).add('Bounds', function () {
  return /*#__PURE__*/_react["default"].createElement(CustomRangeInput, null);
});