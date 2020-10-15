"use strict";

exports.__esModule = true;
exports.Grid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledGrid = require("./StyledGrid");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Grid = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var a11yTitle = props.a11yTitle,
      border = props.border,
      fill = props.fill,
      _props$responsive = props.responsive,
      responsive = _props$responsive === void 0 ? true : _props$responsive,
      rows = props.rows,
      tag = props.tag,
      as = props.as,
      rest = _objectWithoutPropertiesLoose(props, ["a11yTitle", "border", "fill", "responsive", "rows", "tag", "as"]);

  return /*#__PURE__*/_react["default"].createElement(_StyledGrid.StyledGrid, _extends({
    ref: ref,
    a11yTitleProp: a11yTitle,
    as: !as && tag ? tag : as,
    border: border,
    fillContainer: fill,
    responsive: responsive,
    rowsProp: rows
  }, rest));
});
Grid.displayName = 'Grid';
var GridDoc;

if (process.env.NODE_ENV !== 'production') {
  GridDoc = require('./doc').doc(Grid); // eslint-disable-line global-require
}

var GridWrapper = GridDoc || Grid;
exports.Grid = GridWrapper;
GridWrapper.available = typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');