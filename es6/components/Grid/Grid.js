var _excluded = ["a11yTitle", "aria-label", "border", "fill", "height", "responsive", "rows", "tag", "as", "width"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledGrid } from './StyledGrid';
import { GridPropTypes } from './propTypes';
var Grid = /*#__PURE__*/forwardRef(function (props, ref) {
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

  return /*#__PURE__*/React.createElement(StyledGrid, _extends({
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
Grid.displayName = 'Grid';
Grid.propTypes = GridPropTypes;
Grid.available = typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');
export { Grid };