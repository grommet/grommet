"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SimpleRadioButton = function SimpleRadioButton(_ref) {
  var selectedProp = _ref.selected,
      rest = _objectWithoutPropertiesLoose(_ref, ["selected"]);

  var _React$useState = _react["default"].useState(selectedProp),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  var onChange = function onChange(event) {
    return setSelected(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, _react["default"].createElement(_grommet.RadioButton, _extends({
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1',
    onChange: onChange
  }, rest)), _react["default"].createElement(_grommet.RadioButton, _extends({
    label: "Choice 2",
    name: "radio",
    value: "c2",
    checked: selected === 'c2',
    onChange: onChange
  }, rest))));
};

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  radioButton: {
    gap: 'xsmall',
    size: '18px',
    hover: {
      border: {
        color: 'dark-3'
      }
    },
    check: {
      color: {
        light: 'neutral-1'
      }
    },
    icon: {
      size: '10px'
    }
  }
});

var CustomRadioButton = function CustomRadioButton() {
  var _React$useState2 = _react["default"].useState(),
      selected = _React$useState2[0],
      setSelected = _React$useState2[1];

  var onChange = function onChange(event) {
    return setSelected(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, _react["default"].createElement(_grommet.RadioButton, {
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1',
    onChange: onChange
  }), _react["default"].createElement(_grommet.RadioButton, {
    label: "Choice 2",
    name: "radio",
    value: "c2",
    checked: selected === 'c2',
    onChange: onChange
  })));
};

var CheckBoxInsideButton = function CheckBoxInsideButton() {
  var _React$useState3 = _react["default"].useState(),
      selected = _React$useState3[0],
      setSelected = _React$useState3[1];

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.Button, {
    hoverIndicator: "background",
    onClick: function onClick() {
      if (selected) {
        setSelected(undefined);
      } else {
        setSelected('c1');
      }
    }
  }, _react["default"].createElement(_grommet.RadioButton, {
    label: "Choice 1",
    name: "radio",
    value: "c1",
    checked: selected === 'c1'
  }))));
};

(0, _react2.storiesOf)('RadioButton', module).add('Simple', function () {
  return _react["default"].createElement(SimpleRadioButton, null);
}).add('Disabled', function () {
  return _react["default"].createElement(SimpleRadioButton, {
    disabled: true,
    selected: "c2"
  });
}).add('Custom Theme', function () {
  return _react["default"].createElement(CustomRadioButton, null);
}).add('Inside a Button Theme', function () {
  return _react["default"].createElement(CheckBoxInsideButton, null);
});