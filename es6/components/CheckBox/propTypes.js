import PropTypes from 'prop-types';
import { padPropType } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
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
    indeterminate: PropTypes.bool
  };
}

export var CheckBoxPropTypes = PropType;