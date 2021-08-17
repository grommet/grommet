function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { colorPropType, genericProps, padPropType, patternPropType, pointPropType } from '../../utils/general-prop-types';
var thicknessType = PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'none']), PropTypes.string, PropTypes.number]);
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    animate: PropTypes.bool,
    bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    color: PropTypes.oneOfType([colorPropType, PropTypes.shape({
      color: colorPropType,
      // deprecated, use top level 'opacity'
      opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool])
    }), PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      value: PropTypes.number
    }))]),
    id: PropTypes.string,
    dash: PropTypes.bool,
    gap: PropTypes.oneOfType([PropTypes.oneOf(['none', 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    opacity: PropTypes.oneOfType([PropTypes.oneOf(['weak', 'medium', 'strong']), PropTypes.bool]),
    overflow: PropTypes.bool,
    pad: padPropType,
    pattern: patternPropType,
    point: pointPropType,
    round: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full']), PropTypes.string]),
      width: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'fill', 'full', 'auto']), PropTypes.string])
    }), PropTypes.string]),
    thickness: thicknessType,
    type: PropTypes.oneOf(['bar', 'line', 'area', 'point']),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number), PropTypes.shape({
      color: colorPropType,
      label: PropTypes.string,
      // for accessibility of bars and points
      onClick: PropTypes.func,
      onHover: PropTypes.func,
      opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      thickness: thicknessType,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
    })]))
  });
}

export var ChartPropTypes = PropType;