"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var colors = {
  selected: 'neutral-3'
};
var customRoundedTheme = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    colors: colors,
    control: {
      border: {
        radius: '24px'
      }
    },
    input: {
      weight: 400
    },
    font: {
      size: '12px'
    }
  },
  text: {
    medium: '13px'
  },
  textInput: {
    extend: 'padding: 0 12px;'
  },
  select: {
    control: {
      extend: 'padding: 3px 6px;',
      open: {
        background: '#ece0fa',
        border: '1px solid #7D4CDB'
      }
    }
  }
});

var SimpleSelect = function SimpleSelect(_ref) {
  var theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["theme"]);

  var options = ['one', 'two'];

  var _useState = (0, _react.useState)(''),
      value = _useState[0],
      setValue = _useState[1];

  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: theme || _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, _react["default"].createElement(_grommet.Select, _extends({
    id: "select",
    name: "select",
    placeholder: "Select",
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValue(option);
    }
  }, rest))));
};

SimpleSelect.propTypes = {
  theme: _propTypes["default"].shape({})
};
SimpleSelect.defaultProps = {
  theme: undefined
};
var defaultOptions = [];
var objectOptions = [];

for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
  objectOptions.push({
    lab: "option " + i,
    val: i,
    dis: i % 5 === 0,
    sel: i % 13 === 0
  });
}

(0, _react2.storiesOf)('Select', module).add('Simple', function () {
  return _react["default"].createElement(SimpleSelect, null);
}).add('Custom Theme', function () {
  return _react["default"].createElement(SimpleSelect, {
    open: true,
    theme: customRoundedTheme
  });
});