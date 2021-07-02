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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailControl = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Detail__DetailControl",
  componentId: "huiwg9-0"
})(["&:focus{", "}&:focus:not(:focus-visible){", "}"], (0, _utils.focusStyle)(), (0, _utils.unfocusStyle)());

var Detail = function Detail(_ref) {
  var activeProperty = _ref.activeProperty,
      axis = _ref.axis,
      data = _ref.data,
      series = _ref.series,
      seriesStyles = _ref.seriesStyles,
      renderValue = _ref.renderValue,
      thickness = _ref.thickness;

  var _useState = (0, _react.useState)(),
      detailIndex = _useState[0],
      setDetailIndex = _useState[1];

  var activeIndex = (0, _react.useRef)();
  var detailRefs = (0, _react.useMemo)(function () {
    return [];
  }, []);
  var onMouseLeave = (0, _react.useCallback)(function (event) {
    // Only remove detail if the mouse isn't over the active index.
    // This helps distinguish leaving the drop on the edge where it is
    // anchored.
    var rect = activeIndex.current.getBoundingClientRect();

    if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top || event.pageY > rect.bottom) {
      activeIndex.current = undefined;
      setDetailIndex(undefined);
    }
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
    tabIndex: 0,
    direction: "row",
    fill: true,
    justify: "between",
    responsive: false,
    onFocus: function onFocus() {},
    onBlur: function onBlur() {
      return setDetailIndex(undefined);
    }
  }, data.map(function (_, i) {
    return /*#__PURE__*/_react["default"].createElement(_Box.Box // eslint-disable-next-line react/no-array-index-key
    , {
      key: i,
      align: "center",
      responsive: false,
      width: thickness,
      onMouseOver: function onMouseOver(event) {
        activeIndex.current = event.currentTarget;
        setDetailIndex(i);
      },
      onMouseLeave: onMouseLeave,
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
    plain: true,
    onMouseLeave: onMouseLeave
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
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: serie.property
    }, propertyStyle ? /*#__PURE__*/_react["default"].createElement(_Swatch.Swatch, propertyStyle) : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small"
    }, serie.label || serie.property), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small",
      weight: "bold"
    }, renderValue(serie, detailIndex)));
  })))));
};

exports.Detail = Detail;