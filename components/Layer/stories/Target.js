"use strict";

exports.__esModule = true;
exports["default"] = exports.TargetLayer = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var positions = ['left', 'right', 'top', 'bottom', 'center'];

var TargetLayer = function TargetLayer() {
  var _React$useState = _react["default"].useState(),
      open = _React$useState[0],
      setOpen = _React$useState[1];

  var _React$useState2 = _react["default"].useState('small'),
      gutter = _React$useState2[0],
      setGutter = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(true),
      modal = _React$useState3[0],
      setModal = _React$useState3[1];

  var _React$useState4 = _react["default"].useState(positions[0]),
      position = _React$useState4[0],
      setPosition = _React$useState4[1];

  _react["default"].useEffect(function () {
    window.dispatchEvent(new Event('resize'));
    return undefined;
  }, [gutter]);

  var ref = _react["default"].useRef();

  var onOpen = function onOpen() {
    return setOpen(true);
  };

  var onClose = function onClose() {
    return setOpen(undefined);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
    fill: true,
    columns: [gutter, 'flex', gutter],
    rows: [gutter, 'flex', gutter],
    areas: [{
      name: 'main',
      start: [1, 1],
      end: [1, 1]
    }]
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    ref: ref,
    gridArea: "main",
    fill: true,
    height: {
      min: 'small'
    },
    align: "center",
    justify: "center",
    gap: "medium",
    background: "brand"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    options: positions,
    value: position,
    onChange: function onChange(_ref) {
      var option = _ref.option;
      return setPosition(option);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    toggle: true,
    label: "modal",
    checked: modal,
    onChange: function onChange() {
      return setModal(!modal);
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Open",
    onClick: onOpen
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "large"
  }), open && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    modal: modal,
    position: position,
    target: ref.current,
    onClickOutside: onClose,
    onEsc: onClose
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "small",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Toggle gutter size",
    onClick: function onClick() {
      return setGutter(gutter === 'small' ? 'xsmall' : 'small');
    }
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Close",
    onClick: onClose
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    options: positions,
    value: position,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setPosition(option);
    }
  }))));
};

exports.TargetLayer = TargetLayer;
TargetLayer.storyName = 'Target';
var _default = {
  title: 'Layout/Layer/Target'
};
exports["default"] = _default;