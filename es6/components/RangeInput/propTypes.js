import PropTypes from 'prop-types';
import { colorPropType } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    color: PropTypes.oneOfType([colorPropType, PropTypes.arrayOf(PropTypes.shape({
      color: colorPropType.isRequired,
      value: PropTypes.number.isRequired,
      opacity: PropTypes.number
    }))]),
    id: PropTypes.string,
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
}
export var RangeInputPropTypes = PropType;