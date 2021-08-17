function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    color: colorPropType,
    continents: PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      name: PropTypes.oneOf(['Africa', 'Asia', 'Australia', 'Europe', 'North America', 'South America']).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func
    })),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    onSelectPlace: PropTypes.func,
    places: PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType,
      name: PropTypes.string,
      // for a11y aria-label
      location: PropTypes.arrayOf(PropTypes.number).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func
    })),
    hoverColor: colorPropType
  });
}

export var WorldMapPropTypes = PropType;