"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleTextInput = function SimpleTextInput() {
  var _React$useState = _react["default"].useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, _react["default"].createElement(_grommet.TextInput, {
    value: value,
    onChange: onChange
  }))));
};

var PasswordInput = function PasswordInput() {
  var _React$useState2 = _react["default"].useState(''),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(false),
      reveal = _React$useState3[0],
      setReveal = _React$useState3[1];

  return _react["default"].createElement(_grommet.Box, {
    width: "medium",
    direction: "row",
    margin: "large",
    align: "center",
    round: "small",
    border: true
  }, _react["default"].createElement(_grommet.TextInput, {
    plain: true,
    type: reveal ? 'text' : 'password',
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }), _react["default"].createElement(_grommet.Button, {
    icon: reveal ? _react["default"].createElement(_grommetIcons.View, {
      size: "medium"
    }) : _react["default"].createElement(_grommetIcons.Hide, {
      size: "medium"
    }),
    onClick: function onClick() {
      return setReveal(!reveal);
    }
  }));
};

var suggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});

var SuggestionsTextInput = function SuggestionsTextInput() {
  var _React$useState4 = _react["default"].useState(''),
      value = _React$useState4[0],
      setValue = _React$useState4[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, _react["default"].createElement(_grommet.TextInput, {
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions
  }))));
};

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  textInput: {
    extend: function extend() {
      return "\n      font-size: 20px;\n      background: #c9c19f;\n      width: 300px;\n      margin: 0 auto;\n      \n      &:focus {\n        box-shadow: none;\n        border-color: initial;\n      }\n    ";
    },
    container: {
      extend: function extend() {
        return "\n        background: #edf7d2;\n        height: 100px;\n        width: 400px;\n        display: flex;\n        flex-flow: column;\n        justify-content: center;\n        border-radius: 10px;\n      ";
      }
    },
    placeholder: {
      extend: function extend() {
        return "\n        width: 100%;\n        color: #1e1a11;\n      ";
      }
    },
    suggestions: {
      extend: function extend() {
        return "\n        background: #c9c19f;\n        color: #3d3522;\n        li {\n          border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n        }\n      ";
      }
    }
  }
});

var ThemedTextInput = function ThemedTextInput() {
  var _React$useState5 = _react["default"].useState(''),
      value = _React$useState5[0],
      setValue = _React$useState5[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  var onSelect = function onSelect(event) {
    return setValue(event.suggestion);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: customTheme
  }, _react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, _react["default"].createElement(_grommet.Box, {
    width: "medium"
  }, _react["default"].createElement(_grommet.TextInput, {
    type: "password",
    value: value,
    dropProps: {
      height: 'small'
    },
    onChange: onChange,
    onSelect: onSelect,
    suggestions: suggestions,
    placeholder: _react["default"].createElement("span", null, "Enter something...")
  }))));
};

(0, _react2.storiesOf)('TextInput', module).add('Simple', function () {
  return _react["default"].createElement(SimpleTextInput, null);
}).add('Password', function () {
  return _react["default"].createElement(PasswordInput, null);
}).add('Suggestions', function () {
  return _react["default"].createElement(SuggestionsTextInput, null);
}).add('Themed', function () {
  return _react["default"].createElement(ThemedTextInput, null);
});