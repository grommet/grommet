"use strict";

exports.__esModule = true;
exports["default"] = exports.CustomEdgeControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

var _excluded = ["direction"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var customEdge = (0, _utils.deepMerge)(_themes.grommet, {
  rangeSelector: {
    edge: {
      type: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Gremlin, {
        size: "large",
        color: "neutral-2"
      }) // it is also possible to use an actual node
      // type:  <div style={{ padding: '24px', background: 'red' }} />,

    }
  }
});

var CustomEdgeControl = function CustomEdgeControl(_ref) {
  var _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'horizontal' : _ref$direction,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = (0, _react.useState)([2, 7]),
      range = _useState[0],
      setRange = _useState[1];

  var onChange = function onChange(values) {
    setRange(values);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customEdge
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "xlarge",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    style: {
      fontFamily: 'Comic Sans MS'
    },
    color: "brand"
  }, "Feed the gremlins with grommets...", ' '), /*#__PURE__*/_react["default"].createElement(_grommet.Stack, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    justify: "between"
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (value) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      key: value,
      width: "xsmall",
      height: "xsmall",
      justify: "center",
      align: "center",
      pad: "small",
      border: false
    }, /*#__PURE__*/_react["default"].createElement(_grommetIcons.Grommet, {
      color: "brand",
      size: "small"
    }));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.RangeSelector, _extends({
    direction: direction,
    min: 0,
    max: 9,
    size: "full",
    values: range,
    color: "accent-3",
    onChange: onChange
  }, rest)))));
};

exports.CustomEdgeControl = CustomEdgeControl;
CustomEdgeControl.storyName = 'Custom edge controls';
var _default = {
  title: 'Input/RangeSelector/Custom edge controls'
};
exports["default"] = _default;