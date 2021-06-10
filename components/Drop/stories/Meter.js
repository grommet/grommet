"use strict";

exports.__esModule = true;
exports["default"] = exports.SVGChild = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TestDrop = function TestDrop() {
  var targetRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      setShowDrop = _useState[1];

  (0, _react.useEffect)(function () {
    return setShowDrop(true);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet,
    full: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true,
    align: "center",
    justify: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
    ref: targetRef,
    size: "small",
    background: "light-2",
    values: [{
      value: 20,
      color: 'accent-1'
    }]
  }), targetRef.current && /*#__PURE__*/_react["default"].createElement(_grommet.Drop, {
    id: "test-drop-with-svg",
    plain: true,
    align: {
      top: 'bottom',
      left: 'left'
    },
    target: targetRef.current
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, "target is an svg"))));
};

var SVGChild = function SVGChild() {
  return /*#__PURE__*/_react["default"].createElement(TestDrop, null);
};

exports.SVGChild = SVGChild;
SVGChild.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Controls/Drop/SVG Child'
};
exports["default"] = _default;