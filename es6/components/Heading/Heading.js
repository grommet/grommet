function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from 'react';
import { StyledHeading } from './StyledHeading';
var Heading = /*#__PURE__*/forwardRef(function (props, ref) {
  var color = props.color,
      level = props.level,
      rest = _objectWithoutPropertiesLoose(props, ["color", "level"]); // enforce level to be a number


  return /*#__PURE__*/React.createElement(StyledHeading, _extends({
    as: "h" + level,
    colorProp: color,
    level: +level
  }, rest, {
    ref: ref
  }));
});
Heading.displayName = 'Heading';
Heading.defaultProps = {
  level: 1,
  responsive: true
};
var HeadingDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  HeadingDoc = require('./doc').doc(Heading);
}

var HeadingWrapper = HeadingDoc || Heading;
export { HeadingWrapper as Heading };