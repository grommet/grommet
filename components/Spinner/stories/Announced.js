"use strict";

exports.__esModule = true;
exports["default"] = exports.Announced = void 0;

var _react = _interopRequireWildcard(require("react"));

var _themes = require("grommet/themes");

var _grommet = require("grommet");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PageContent = function PageContent() {
  // 'show=true' will trigger the announcement
  var _useState = (0, _react.useState)(false),
      show = _useState[0],
      setShow = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, {
    textAlign: "center"
  }, "Spinner has a built in Screen Reader functionality to assist screen readers. An announcement of the given message prop will be announced to screen readers after the spinner component renders."), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    label: "Load",
    onClick: function onClick() {
      setShow(true);
      setTimeout(function () {
        setShow(false);
      }, 1500);
    }
  }), show && /*#__PURE__*/_react["default"].createElement(_grommet.Spinner, {
    message: "Start Built-in Spinner Announcement"
  }));
};

var Announced = function Announced() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(PageContent, null)));
};

exports.Announced = Announced;
Announced.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/Spinner/Announced'
};
exports["default"] = _default;