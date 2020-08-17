"use strict";

exports.__esModule = true;
exports.Legend = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = require("../Box");

var _Button = require("../Button");

var _Text = require("../Text");

var _Swatch = require("./Swatch");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Legend = function Legend(_ref) {
  var activeProperty = _ref.activeProperty,
      seriesProp = _ref.series,
      seriesStyles = _ref.seriesStyles,
      setActiveProperty = _ref.setActiveProperty;
  var series = (0, _react.useMemo)(function () {
    return seriesProp.filter(function (s) {
      return seriesStyles[s.property];
    });
  }, [seriesProp, seriesStyles]);
  var interactive = (0, _react.useMemo)( // filter out properties that are used in point chart aspects
  function () {
    return series.filter(function (_ref2) {
      var property = _ref2.property;
      return !seriesStyles[property].aspect;
    }).length > 1;
  }, [series, seriesStyles]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    margin: {
      top: 'small'
    },
    direction: "row",
    wrap: true,
    gap: "small"
  }, series.map(function (_ref3) {
    var property = _ref3.property,
        label = _ref3.label;
    var isActive = property === activeProperty;
    var swatchProps = {};
    var textProps = {};

    if (activeProperty !== undefined) {
      if (!isActive) {
        // swatchProps.color = 'status-disabled';
        textProps.color = 'text-xweak';
      } else {
        textProps.color = 'text-strong';
      }
    }

    var content = /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      key: property,
      direction: "row",
      align: "center",
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      gap: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(_Swatch.Swatch, _extends({}, seriesStyles[property], swatchProps)), /*#__PURE__*/_react["default"].createElement(_Text.Text, textProps, label || property));

    if (interactive) {
      content = /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        key: property,
        active: isActive,
        onClick: function onClick() {
          return setActiveProperty(isActive ? undefined : property);
        },
        hoverIndicator: true
      }, content);
    }

    return content;
  }));
};

exports.Legend = Legend;