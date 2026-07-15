function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
      content: PropTypes.node,
      dropProps: PropTypes.shape({}),
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