function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from '../hocs';
import { StyledHeading } from './StyledHeading';
var styledComponents = {
  div: StyledHeading
}; // tag -> styled component

var Heading = function Heading(props) {
  var color = props.color,
      level = props.level,
      rest = _objectWithoutPropertiesLoose(props, ["color", "level"]);

  var tag = "h" + level;
  var StyledComponent = styledComponents[tag];

  if (!StyledComponent) {
    StyledComponent = StyledHeading.withComponent(tag);
    styledComponents[tag] = StyledComponent;
  } // enforce level to be a number


  return React.createElement(StyledComponent, _extends({
    colorProp: color,
    level: +level
  }, rest));
};

Heading.defaultProps = {
  level: 1,
  responsive: true
};
var HeadingDoc;

if (process.env.NODE_ENV !== 'production') {
  HeadingDoc = require('./doc').doc(Heading); // eslint-disable-line global-require
}

var HeadingWrapper = compose(withTheme)(HeadingDoc || Heading);
export { HeadingWrapper as Heading };