"use strict";

exports.__esModule = true;
exports.Detail = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Box = require("../Box");

var _Drop = require("../Drop");

var _Grid = require("../Grid");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _utils = require("../../utils");

var _Swatch = require("./Swatch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailControl = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Detail__DetailControl",
  componentId: "huiwg9-0"
})(["&:focus{", "}"], (0, _utils.focusStyle)());

var Detail = function Detail(_ref) {
  var activeProperty = _ref.activeProperty,
      axis = _ref.axis,
      data = _ref.data,
      series = _ref.series,
      seriesStyles = _ref.seriesStyles,
      renderValue = _ref.renderValue;

  var _useState = (0, _react.useState)(),
      detailIndex = _useState[0],
      setDetailIndex = _useState[1];

  var detailContainer = (0, _react.useRef)();
  var detailRefs = (0, _react.useMemo)(function () {
    return [];
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onLeft: function onLeft() {
      if (detailIndex === undefined) setDetailIndex(data.length - 1);else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
    },
    onRight: function onRight() {
      if (detailIndex === undefined) setDetailIndex(0);else if (detailIndex < data.length - 1) setDetailIndex(detailIndex + 1);
    }
  }, /*#__PURE__*/_react["default"].createElement(DetailControl, {
    key: "band",
    ref: detailContainer,
    tabIndex: 0,
    direction: "row",
    fill: true,
    justify: "between",
    gap: data.length / 2 + 1 + "px",
    responsive: false,
    onMouseOut: function onMouseOut(event) {
      var rect = detailContainer.current.getBoundingClientRect();
      if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top || event.pageY > rect.bottom) setDetailIndex(undefined);
    },
    onFocus: function onFocus() {},
    onBlur: function onBlur() {
      return setDetailIndex(undefined);
    }
  }, data.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      flex: true,
      align: "center",
      onMouseOver: function onMouseOver() {
        return setDetailIndex(i);
      },
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      ref: function ref(c) {
        detailRefs[i] = c;
      },
      fill: "vertical",
      border: detailIndex === i ? true : undefined
    }));
  }))), detailIndex !== undefined && detailRefs[detailIndex] && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, {
    key: "drop",
    target: detailRefs[detailIndex],
    align: detailIndex > data.length / 2 ? {
      right: 'left'
    } : {
      left: 'right'
    },
    plain: true
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: "small",
    background: {
      color: 'background-back'
    }
  }, /*#__PURE__*/_react["default"].createElement(_Grid.Grid, {
    columns: ['auto', 'auto', 'auto'],
    gap: "xsmall",
    align: "center"
  }, series.filter(function (_ref2) {
    var property = _ref2.property;
    return !activeProperty || activeProperty === property || axis && axis.x && axis.x.property === property;
  }).map(function (serie) {
    var propertyStyle = seriesStyles[serie.property];
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, propertyStyle ? /*#__PURE__*/_react["default"].createElement(_Swatch.Swatch, propertyStyle) : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small"
    }, serie.label || serie.property), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small",
      weight: "bold"
    }, renderValue(serie, detailIndex)));
  })))));
};

exports.Detail = Detail;