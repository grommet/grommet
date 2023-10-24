var _excluded = ["values", "pad", "renderValue", "serie", "theme", "thickness"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useMemo } from 'react';
import { edgeToNum } from '../../utils';
import { Box } from '../Box';
import { showInUnits } from './utils';
var onlyHorizontalPad = function onlyHorizontalPad(pad) {
  var result;
  if (pad) {
    if (typeof pad === 'string') result = {
      horizontal: pad
    };else result = {
      horizontal: pad.horizontal,
      start: pad.start,
      end: pad.end,
      left: pad.left,
      right: pad.right
    };
  }
  return result;
};
var XAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var values = _ref.values,
    padProp = _ref.pad,
    renderValue = _ref.renderValue,
    serie = _ref.serie,
    theme = _ref.theme,
    thickness = _ref.thickness,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _ref2 = serie || {},
    render = _ref2.render,
    suffix = _ref2.suffix;

  // pad to the edge of the thickness, for when padding is more than half
  // the thickness
  var pad = useMemo(function () {
    return thickness && padProp && {
      start: edgeToNum(padProp.start || padProp.horizontal, theme) - edgeToNum(thickness, theme) / 2 + "px",
      end: edgeToNum(padProp.end || padProp.horizontal, theme) - edgeToNum(thickness, theme) / 2 + "px"
    } || onlyHorizontalPad(padProp);
  }, [padProp, theme, thickness]);

  // When there are only labels at the end of the axis and there isn't
  // much space for them, let them take as much space as they like
  // flowing in from the edges.
  // Otherwise, align their container to the
  // data/guide lines and then let their content overflow that.
  var labelContainerProps = useMemo(function () {
    // 24px was chosen empirically as 48px is enough to show some simple text
    var centered = values.length !== 2 || edgeToNum((padProp == null ? void 0 : padProp.start) || (padProp == null ? void 0 : padProp.horizontal), theme) >= 24;
    if (centered) return {
      basis: thickness || '1px',
      overflow: 'visible',
      align: 'center'
    };
    return {};
  }, [padProp, theme, thickness, values]);
  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref,
    gridArea: "xAxis",
    direction: "row",
    justify: "between",
    pad: pad
  }, rest), values.map(function (axisValue, i) {
    var content = serie ? renderValue(serie, axisValue) : axisValue;
    if (content === axisValue && !render && !suffix) {
      var maxValue = Math.max.apply(Math, values.map(function (v) {
        return Math.abs(v);
      }));
      content = showInUnits(content, maxValue);
    }
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, _extends({
        key: i
      }, labelContainerProps), content)
    );
  }));
});
export { XAxis };