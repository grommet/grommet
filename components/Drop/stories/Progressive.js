"use strict";

exports.__esModule = true;
exports["default"] = exports.Progressive = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ProgressiveDrop = function ProgressiveDrop() {
  var boxRef = (0, _react.useRef)();
  var innerBoxRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      openDrop = _useState[0],
      setOpenDrop = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      openInnerDrop = _useState2[0],
      setOpenInnerDrop = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      interactedWithInnerButton = _useState3[0],
      setInteractedWithInnerButton = _useState3[1];

  var onCloseDrop = function onCloseDrop() {
    setOpenDrop(false);
    setOpenInnerDrop(false);
  };

  var onOpenDrop = function onOpenDrop() {
    setOpenDrop(true);
    setOpenInnerDrop(false);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    ref: boxRef,
    primary: true,
    label: "Click me",
    onClick: onOpenDrop
  }), openDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    target: boxRef.current,
    onClickOutside: onCloseDrop,
    onEsc: onCloseDrop
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    ref: innerBoxRef
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Click me again",
    onClick: function onClick() {
      return setOpenInnerDrop(true);
    }
  })), openInnerDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    target: innerBoxRef.current,
    onClickOutside: function onClickOutside() {
      return setOpenInnerDrop(false);
    },
    onEsc: function onEsc() {
      return setOpenInnerDrop(false);
    },
    align: {
      top: 'bottom',
      right: 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    primary: true,
    label: interactedWithInnerButton ? 'Good job!' : 'You can interact with me',
    onClick: function onClick() {
      return setInteractedWithInnerButton(true);
    }
  }))))));
};

var Progressive = function Progressive() {
  return /*#__PURE__*/_react["default"].createElement(ProgressiveDrop, null);
};

exports.Progressive = Progressive;
Progressive.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Drop/Progressive'
};
exports["default"] = _default;