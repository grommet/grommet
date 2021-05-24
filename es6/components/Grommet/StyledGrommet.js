import styled, { css } from 'styled-components';
import { baseStyle } from '../../utils';
import { defaultProps } from '../../default-props';

var fullStyle = function fullStyle(full) {
  if (full === 'min') return css(["min-height:100vh;"]);
  return css(["width:100vw;height:100vh;overflow:auto;"]);
};

var StyledGrommet = styled.div.withConfig({
  displayName: "StyledGrommet",
  componentId: "sc-19lkkz7-0"
})(["", " ", " ", " ", " ", ""], function (props) {
  return !props.plain && baseStyle;
}, function (props) {
  return props.full && fullStyle(props.full);
}, function (props) {
  return props.theme.global.font.face;
}, function (props) {
  return props.theme.grommet.extend;
}, function (props) {
  return props.cssVars && Object.keys(props.theme.global.colors).filter(function (k) {
    return typeof props.theme.global.colors[k] === 'string';
  }).map(function (k) {
    return "--" + k + ": " + props.theme.global.colors[k] + ";";
  }).join('\n');
});
StyledGrommet.defaultProps = {};
Object.setPrototypeOf(StyledGrommet.defaultProps, defaultProps);
export { StyledGrommet };