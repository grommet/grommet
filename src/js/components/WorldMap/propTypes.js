import PropTypes from 'prop-types';
import { colorPropType, genericProps } from '../../utils/general-prop-types';

export const WorldMapPropType = {
  ...genericProps,
  color: colorPropType,
  continents: PropTypes.arrayOf(
    PropTypes.shape({
      color: colorPropType,
      name: PropTypes.oneOf([
        'Africa',
        'Asia',
        'Australia',
        'Europe',
        'North America',
        'South America',
      ]).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
    }),
  ),
  fill: PropTypes.oneOfType([
    PropTypes.oneOf(['horizontal', 'vertical']),
    PropTypes.bool,
  ]),
  onSelectPlace: PropTypes.func,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      color: colorPropType,
      name: PropTypes.string, // for a11y aria-label
      location: PropTypes.arrayOf(PropTypes.number).isRequired,
      onClick: PropTypes.func,
      onHover: PropTypes.func,
    }),
  ),
  hoverColor: colorPropType,
};
