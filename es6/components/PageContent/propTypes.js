import PropTypes from 'prop-types';
import { colorPropType } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      color: colorPropType,
      dark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
      image: PropTypes.string,
      position: PropTypes.string,
      opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number, PropTypes.oneOf(['weak', 'medium', 'strong'])]),
      repeat: PropTypes.oneOfType([PropTypes.oneOf(['no-repeat', 'repeat']), PropTypes.string]),
      size: PropTypes.oneOfType([PropTypes.oneOf(['cover', 'contain']), PropTypes.string]),
      light: PropTypes.string,
      fill: PropTypes.oneOf(['horizontal'])
    })])
  };
}
export var PageContentPropTypes = PropType;