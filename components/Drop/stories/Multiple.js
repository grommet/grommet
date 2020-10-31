"use strict";

exports.__esModule = true;
exports.Multiple = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MultipleDrop = function MultipleDrop() {
  var _useState = (0, _react.useState)(false),
      showDrop = _useState[0],
      setShowDrop = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      showLayer = _useState2[0],
      setShowLayer = _useState2[1];

  var targetRef = (0, _react.useRef)();
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DropButton, {
    label: "drop button",
    dropAlign: {
      right: 'left'
    },
    dropContent: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      value: "",
      onChange: function onChange() {},
      suggestions: ['one', 'two']
    }))
  }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    ref: targetRef,
    label: "button",
    onClick: function onClick() {
      return setShowDrop(true);
    }
  }), showDrop && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    align: {
      left: 'right'
    },
    target: targetRef.current,
    onClickOutside: function onClickOutside() {
      return setShowDrop(false);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  }))), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "layer",
    onClick: function onClick() {
      return setShowLayer(!showLayer);
    }
  }), showLayer && /*#__PURE__*/_react["default"].createElement(_grommet.Layer, {
    position: "left",
    modal: false
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large",
    border: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    value: "",
    onChange: function onChange() {},
    suggestions: ['one', 'two']
  })))));
};

var Multiple = function Multiple() {
  return /*#__PURE__*/_react["default"].createElement(MultipleDrop, null);
};

exports.Multiple = Multiple;
Multiple.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};