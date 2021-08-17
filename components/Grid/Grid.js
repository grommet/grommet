"use strict";

exports.__esModule = true;
exports.Grid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _StyledGrid = require("./StyledGrid");

var _propTypes = require("./propTypes");

var _excluded = ["a11yTitle", "aria-label", "border", "fill", "height", "responsive", "rows", "tag", "as", "width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Grid = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var a11yTitle = props.a11yTitle,
      ariaLabel = props['aria-label'],
      border = props.border,
      fill = props.fill,
      height = props.height,
      _props$responsive = props.responsive,
      responsive = _props$responsive === void 0 ? true : _props$responsive,
      rows = props.rows,
      tag = props.tag,
      as = props.as,
      width = props.width,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_StyledGrid.StyledGrid, _extends({
    ref: ref,
    a11yTitleProp: ariaLabel || a11yTitle,
    as: !as && tag ? tag : as,
    border: border,
    fillContainer: fill,
    heightProp: height,
    responsive: responsive,
    rowsProp: rows,
    widthProp: width
  }, rest));
});
exports.Grid = Grid;
Grid.displayName = 'Grid';
Grid.propTypes = _propTypes.GridPropTypes;
Grid.available = typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');