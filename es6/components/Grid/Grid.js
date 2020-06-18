function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledGrid } from './StyledGrid';
var Grid = /*#__PURE__*/forwardRef(function (props, ref) {
  var a11yTitle = props.a11yTitle,
      fill = props.fill,
      _props$responsive = props.responsive,
      responsive = _props$responsive === void 0 ? true : _props$responsive,
      rows = props.rows,
      tag = props.tag,
      as = props.as,
      rest = _objectWithoutPropertiesLoose(props, ["a11yTitle", "fill", "responsive", "rows", "tag", "as"]);

  return /*#__PURE__*/React.createElement(StyledGrid, _extends({
    ref: ref,
    a11yTitleProp: a11yTitle,
    as: !as && tag ? tag : as,
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
GridWrapper.available = typeof window !== 'undefined' && window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');
export { GridWrapper as Grid };