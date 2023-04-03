"use strict";

exports.__esModule = true;
exports.NameValueList = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _Grid = require("../Grid");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _NameValueListContext = require("./NameValueListContext");
var _excluded = ["align", "layout", "nameProps", "pairProps", "valueProps"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var NameValueList = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$nameValueList$, _theme$nameValueList$2;
  var align = _ref.align,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'column' : _ref$layout,
    nameProps = _ref.nameProps,
    _ref$pairProps = _ref.pairProps,
    pairProps = _ref$pairProps === void 0 ? {
      direction: 'row'
    } : _ref$pairProps,
    valueProps = _ref.valueProps,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext);

  // If layout is grid, valueWidth sets the max width of the column.
  // Grid will 'fit' as many columns of valueWidth per row as container's
  // width allows.
  var columns;
  var valueWidth = (valueProps == null ? void 0 : valueProps.width) || theme.nameValueList.value.width;
  var nameWidth = (nameProps == null ? void 0 : nameProps.width) || theme.nameValueList.name.width;
  if (size === 'small' || layout === 'grid') columns = {
    count: 'fit',
    size: !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth
  };else if (layout === 'column' && pairProps.direction === 'row') columns = [nameWidth, !Array.isArray(valueWidth) ? ['auto', valueWidth] : valueWidth];else columns = [valueWidth];
  var gap = theme.nameValueList.gap;
  if ((pairProps.direction === 'column' || size === 'small') && (_theme$nameValueList$ = theme.nameValueList.pair) != null && (_theme$nameValueList$2 = _theme$nameValueList$.column) != null && _theme$nameValueList$2.gap) {
    gap = theme.nameValueList.pair.column.gap;
  }
  var listContextValue = (0, _react.useMemo)(function () {
    return {
      nameProps: nameProps,
      pairProps: pairProps,
      valueProps: valueProps
    };
  }, [nameProps, pairProps, valueProps]);
  return /*#__PURE__*/_react["default"].createElement(_NameValueListContext.NameValueListContext.Provider, {
    value: listContextValue
  }, /*#__PURE__*/_react["default"].createElement(_Grid.Grid, _extends({
    as: "dl",
    ref: ref,
    align: align,
    columns: columns,
    gap: gap,
    margin: "none" // override browser default margin for dl
  }, rest)));
});
exports.NameValueList = NameValueList;
NameValueList.displayName = 'NameValueList';