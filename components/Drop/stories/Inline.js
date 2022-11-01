"use strict";

exports.__esModule = true;
exports["default"] = exports.Inline = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var align = {
  top: 'bottom',
  left: 'left'
};
var InlineDrop = function InlineDrop() {
  var targetRef = (0, _react.useRef)();

  // trigger re-render so we have the targetRef
  var _useState = (0, _react.useState)(false),
    setShowDrop = _useState[1];
  (0, _react.useEffect)(function () {
    setShowDrop(true);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: "dark-2",
      pad: "medium",
      align: "center",
      justify: "start",
      ref: targetRef
    }, "Target", targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
      container: "inline",
      align: align,
      target: targetRef.current
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, "Drop Contents"))))
    // </Grommet>
  );
};

var Inline = function Inline() {
  return /*#__PURE__*/_react["default"].createElement(InlineDrop, null);
};
exports.Inline = Inline;
Inline.parameters = {
  chromatic: {
    disable: true
  }
};
Inline.args = {
  full: true
};
var _default = {
  title: 'Controls/Drop/Inline'
};
exports["default"] = _default;