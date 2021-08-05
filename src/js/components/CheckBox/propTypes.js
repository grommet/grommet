import PropTypes from 'prop-types';
import { padPropType } from '../../utils/general-prop-types';

export const CheckBoxPropType = {
  a11yTitle: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  fill: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  pad: padPropType,
  reverse: PropTypes.bool,
  toggle: PropTypes.bool,
  indeterminate: PropTypes.bool,
};
