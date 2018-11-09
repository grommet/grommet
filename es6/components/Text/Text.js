function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { compose } from 'recompose';
import { withTheme } from '../hocs';
import { StyledText } from './StyledText';
var styledComponents = {
  span: StyledText
}; // tag -> styled component

var Text = function Text(_ref) {
  var color = _ref.color,
      tag = _ref.tag,
      rest = _objectWithoutPropertiesLoose(_ref, ["color", "tag"]);

  var StyledComponent = styledComponents[tag];

  if (!StyledComponent) {
    StyledComponent = StyledText.withComponent(tag);
    styledComponents[tag] = StyledComponent;
  }

  return React.createElement(StyledComponent, _extends({
    colorProp: color
  }, rest));
};

Text.defaultProps = {
  level: 1,
  tag: 'span'
};
var TextDoc;

if (process.env.NODE_ENV !== 'production') {
  TextDoc = require('./doc').doc(Text); // eslint-disable-line global-require
}

var TextWrapper = compose(withTheme)(TextDoc || Text);
export { TextWrapper as Text };