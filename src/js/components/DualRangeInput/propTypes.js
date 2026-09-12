import PropTypes from 'prop-types';
import { colorPropType } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    color: colorPropType,
    defaultValues: PropTypes.arrayOf(PropTypes.number),
    label: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    max: PropTypes.number,
    messages: PropTypes.shape({
      lower: PropTypes.string,
      upper: PropTypes.string,
    }),
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    step: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.number),
  };
}
export const DualRangeInputPropTypes = PropType;
