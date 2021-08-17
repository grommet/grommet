function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps, heightPropType, padPropType, widthPropType } from '../../utils/general-prop-types';
var fixedSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'flex', 'auto'];
var edgeSizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none'];
var BORDER_SHAPE = PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all', 'between']),
  size: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
  style: PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'hidden'])
});
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    align: PropTypes.oneOfType([PropTypes.oneOf(['baseline', 'center', 'end', 'start', 'stretch']), PropTypes.string]),
    alignContent: PropTypes.oneOfType([PropTypes.oneOf(['around', 'baseline', 'between', 'center', 'evenly', 'end', 'start', 'stretch']), PropTypes.string]),
    areas: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      start: PropTypes.arrayOf(PropTypes.number),
      end: PropTypes.arrayOf(PropTypes.number)
    })), PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))]),
    border: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'left', 'bottom', 'right', 'start', 'end', 'horizontal', 'vertical', 'all']), BORDER_SHAPE, PropTypes.arrayOf(BORDER_SHAPE)]),
    columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(sizes), PropTypes.shape({
      count: PropTypes.oneOfType([PropTypes.oneOf(['fit', 'fill']), PropTypes.number]),
      size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.string])
    }), PropTypes.string]),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    gap: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.shape({
      row: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.string]),
      column: PropTypes.oneOfType([PropTypes.oneOf(edgeSizes), PropTypes.string])
    }), PropTypes.string]),
    height: heightPropType,
    justify: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
    justifyContent: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around', 'stretch']),
    pad: padPropType,
    responsive: PropTypes.bool,
    rows: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(sizes), PropTypes.string])), PropTypes.oneOf(fixedSizes), PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    width: widthPropType
  });
}

export var GridPropTypes = PropType;