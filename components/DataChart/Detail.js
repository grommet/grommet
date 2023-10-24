"use strict";

exports.__esModule = true;
exports.Detail = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Box = require("../Box");
var _Drop = require("../Drop");
var _Grid = require("../Grid");
var _Keyboard = require("../Keyboard");
var _Text = require("../Text");
var _utils = require("../../utils");
var _Swatch = require("./Swatch");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var DetailControl = (0, _styledComponents["default"])(_Box.Box).withConfig({
  displayName: "Detail__DetailControl",
  componentId: "sc-huiwg9-0"
})(["&:focus{", "}&:focus:not(:focus-visible){", "}"], (0, _utils.focusStyle)(), (0, _utils.unfocusStyle)());
var Detail = exports.Detail = function Detail(_ref) {
  var activeProperty = _ref.activeProperty,
    axis = _ref.axis,
    data = _ref.data,
    horizontalProp = _ref.horizontal,
    padProp = _ref.pad,
    series = _ref.series,
    seriesStyles = _ref.seriesStyles,
    renderValue = _ref.renderValue,
    thickness = _ref.thickness;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || defaultProps.theme;
  var _useState = (0, _react.useState)(),
    detailIndex = _useState[0],
    setDetailIndex = _useState[1];
  var activeIndex = (0, _react.useRef)();
  var detailRefs = (0, _react.useMemo)(function () {
    return [];
  }, []);
  var pad = (0, _react.useMemo)(function () {
    // ensure the hit targets and center lines align with
    // the data/guide lines
    var horizontal = (padProp == null ? void 0 : padProp.horizontal) || typeof padProp === 'string' && padProp || 0;
    horizontal = theme.global.edgeSize[horizontal] || horizontal;
    horizontal = (0, _utils.parseMetricToNum)(horizontal);
    var vertical = (padProp == null ? void 0 : padProp.vertical) || typeof padProp === 'string' && padProp || 0;
    vertical = theme.global.edgeSize[vertical] || vertical;
    vertical = (0, _utils.parseMetricToNum)(vertical);
    return {
      horizontal: horizontal - (0, _utils.parseMetricToNum)(thickness) / 2 + "px",
      vertical: vertical + "px"
    };
  }, [padProp, theme.global.edgeSize, thickness]);
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
  var dropAlign = (0, _react.useMemo)(function () {
    var res;
    if (detailIndex > data.length / 2) {
      if (horizontalProp) res = {
        bottom: 'top'
      };else res = {
        right: 'left'
      };
    } else if (horizontalProp) res = {
      top: 'bottom'
    };else res = {
      left: 'right'
    };
    return res;
  }, [data.length, detailIndex, horizontalProp]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onLeft: function onLeft() {
      if (detailIndex === undefined) setDetailIndex(data.length - 1);else if (detailIndex > 0) setDetailIndex(detailIndex - 1);
    },
    onRight: function onRight() {
      if (detailIndex === undefined) setDetailIndex(0);else if (detailIndex < data.length - 1) setDetailIndex(detailIndex + 1);
    }
  }, /*#__PURE__*/_react["default"].createElement(DetailControl, _extends({
    key: "band",
    tabIndex: 0,
    fill: true,
    justify: "between",
    responsive: false
  }, horizontalProp ? {
    direction: 'column'
  } : {
    direction: 'row',
    pad: pad
  }, {
    onFocus: function onFocus() {},
    onBlur: function onBlur() {
      return setDetailIndex(undefined);
    }
  }), data.map(function (_, i) {
    var ref = function ref(c) {
      detailRefs[i] = c;
    };
    return /*#__PURE__*/_react["default"].createElement(_Box.Box
    // eslint-disable-next-line react/no-array-index-key
    , _extends({
      key: i,
      responsive: false
    }, horizontalProp ? {
      justify: 'center',
      height: thickness
    } : {
      align: 'center',
      width: thickness
    }, {
      onMouseOver: function onMouseOver(event) {
        activeIndex.current = event.currentTarget;
        setDetailIndex(i);
      },
      onMouseLeave: onMouseLeave,
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }), /*#__PURE__*/_react["default"].createElement(_Box.Box
    // for horizontal, ref will be placed on child box so
    // drop is restricted to drop dimensions as opposed
    // to filling the chart width
    , _extends({}, horizontalProp ? {
      fill: 'horizontal'
    } : {
      ref: ref,
      fill: 'vertical'
    }, {
      border: detailIndex === i ? true : undefined
    }), horizontalProp ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      alignSelf: "center",
      ref: ref
    }) : null));
  }))), detailIndex !== undefined && detailRefs[detailIndex] && /*#__PURE__*/_react["default"].createElement(_Drop.Drop, {
    key: "drop",
    target: detailRefs[detailIndex],
    align: dropAlign,
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
    var _data$detailIndex;
    var property = _ref2.property;
    return (!activeProperty || activeProperty === property) && (data == null || (_data$detailIndex = data[detailIndex]) == null ? void 0 : _data$detailIndex[property]) !== undefined || axis && axis.x && axis.x.property === property;
  }).map(function (serie) {
    var propertyStyle = seriesStyles[serie.property];
    var axisValue = horizontalProp ? data[detailIndex][serie.property] : detailIndex;
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
      key: serie.property
    }, propertyStyle ? /*#__PURE__*/_react["default"].createElement(_Swatch.Swatch, propertyStyle) : /*#__PURE__*/_react["default"].createElement("span", null), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small"
    }, serie.label || serie.property), /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      size: "small",
      weight: "bold"
    }, renderValue(serie, axisValue)));
  })))));
};