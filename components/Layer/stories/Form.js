"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormLayer = function FormLayer() {
  var _React$useState = _react["default"].useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(''),
      select = _React$useState2[0],
      setSelect = _React$useState2[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: onOpen
  }), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "right",
    full: "vertical",
    modal: true,
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    as: "form",
    fill: "vertical",
    overflow: "auto",
    width: "medium",
    pad: "medium",
    onSubmit: onClose
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false,
    direction: "row",
    justify: "between"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2,
    margin: "none"
  }, "Add"), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Close, null),
    onClick: onClose
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: "grow",
    overflow: "auto",
    pad: {
      vertical: 'medium'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "First"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, null)), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Second"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    options: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
    value: select,
    onSearch: function onSearch() {},
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setSelect(option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    label: "Third"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, null))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    flex: false,
    as: "footer",
    align: "start"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    type: "submit",
    label: "Submit",
    onClick: onClose,
    primary: true
  }))))));
};

(0, _react2.storiesOf)('Layer', module).add('Form', function () {
  return /*#__PURE__*/_react["default"].createElement(FormLayer, null);
}, {
  chromatic: {
    disable: true
  }
});