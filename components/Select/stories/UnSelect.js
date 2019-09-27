"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var optionList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

var UnSelect = function UnSelect() {
  var _useState = (0, _react.useState)(''),
      value = _useState[0],
      setValue = _useState[1];

  var _onChange = function onChange(e) {
    setValue(e.value);
  };

  var onClickClearOptions = function onClickClearOptions() {
    setValue('');
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    pad: "medium",
    direction: "row",
    align: "center",
    justify: "center",
    gap: "small"
  }, _react["default"].createElement(_grommet.Select, {
    options: optionList,
    onChange: function onChange(e) {
      return _onChange(e);
    },
    value: value,
    placeholder: "Select multiple options",
    multiple: true
  }), _react["default"].createElement(_grommet.Button, {
    onClick: onClickClearOptions,
    disabled: !value,
    plain: true,
    label: "Clear All"
  })));
};

(0, _react2.storiesOf)('Select', module).add('UnSelect', function () {
  return _react["default"].createElement(UnSelect, null);
});