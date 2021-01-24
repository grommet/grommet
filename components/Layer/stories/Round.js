"use strict";

exports.__esModule = true;
exports.RoundLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _grommetIcons = require("grommet-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var customTheme = (0, _utils.deepMerge)(_themes.grommet, {
  layer: {
    border: {
      radius: 'large',
      intelligentRounding: true
    }
  }
});

var RoundLayer = function RoundLayer() {
  var _React$useState = _react["default"].useState(false),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState(),
      position = _React$useState2[0],
      setPosition = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(),
      full = _React$useState3[0],
      setFull = _React$useState3[1];

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Layer position",
    options: ['bottom', 'bottom-left', 'bottom-right', 'center', 'end', 'hidden', 'right', 'start', 'top', 'top-left', 'top-right'],
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setPosition(option);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    placeholder: "Full",
    options: [{
      label: 'true',
      value: true
    }, {
      label: 'false',
      value: false
    }, {
      label: 'vertical',
      value: 'vertical'
    }, {
      label: 'horizontal',
      value: 'horizontal'
    }],
    labelKey: "label",
    valueKey: {
      key: 'value'
    },
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setFull(option.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Open layer",
    onClick: onOpen
  })), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    full: full,
    position: position,
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: {
      min: 'medium'
    },
    height: {
      min: 'small'
    },
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    alignSelf: "end",
    icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.FormClose, null),
    onClick: onClose
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Hi, I am a Layer!"))));
};

exports.RoundLayer = RoundLayer;
RoundLayer.story = {
  name: 'Border Radius',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};