var _excluded = ["values", "pad", "renderValue", "serie", "theme", "thickness"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, useMemo } from 'react';
import { edgeToNum } from '../../utils';
import { Box } from '../Box';
var XAxis = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var values = _ref.values,
    padProp = _ref.pad,
    renderValue = _ref.renderValue,
    serie = _ref.serie,
    theme = _ref.theme,
    thickness = _ref.thickness,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  // pad to the edge of the thickness, for when padding is more than half
  // the thickness
  var pad = useMemo(function () {
    return {
      start: edgeToNum(padProp.start || padProp.horizontal, theme) - edgeToNum(thickness, theme) / 2 + "px",
      end: edgeToNum(padProp.end || padProp.horizontal, theme) - edgeToNum(thickness, theme) / 2 + "px"
    };
  }, [padProp, theme, thickness]);

  // When there are only labels at the end of the axis and there isn't
  // much space for them, let them take as much space as they like
  // flowing in from the edges.
  // Otherwise, align their container to the
  // data/guide lines and then let their content overflow that.
  var labelContainerProps = useMemo(function () {
    // 24px was chosen empirically as 48px is enough to show some simple text
    var centered = values.length !== 2 || edgeToNum(padProp.start || padProp.horizontal, theme) >= 24;
    if (centered) return {
      width: thickness,
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
  }, rest), values.map(function (dataIndex, i) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(Box, _extends({
        key: i
      }, labelContainerProps), serie ? renderValue(serie, dataIndex) : dataIndex)
    );
  }));
});
export { XAxis };