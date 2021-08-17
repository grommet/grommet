var _excluded = ["color", "fill", "level"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledHeading } from './StyledHeading';
import { HeadingPropTypes } from './propTypes';
var Heading = /*#__PURE__*/forwardRef(function (_ref, ref // munged to avoid styled-components putting it in the DOM
) {
  var color = _ref.color,
      fill = _ref.fill,
      level = _ref.level,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return (
    /*#__PURE__*/
    // enforce level to be a number
    React.createElement(StyledHeading, _extends({
      as: "h" + level,
      colorProp: color,
      fillProp: fill,
      level: +level
    }, rest, {
      ref: ref
    }))
  );
});
Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true
};
Heading.propTypes = HeadingPropTypes;
export { Heading };