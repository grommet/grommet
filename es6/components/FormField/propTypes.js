import PropTypes from 'prop-types';
import { marginProp } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    a11yTitle: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    contentProps: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    htmlFor: PropTypes.string,
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    name: PropTypes.string,
    margin: marginProp,
    pad: PropTypes.bool,
    required: PropTypes.bool,
    validate: PropTypes.oneOfType([PropTypes.shape({
      regexp: PropTypes.instanceOf(RegExp),
      // regular expression
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      status: PropTypes.oneOf(['error', 'info'])
    }), PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
      regexp: PropTypes.instanceOf(RegExp),
      // regular expression
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      status: PropTypes.oneOf(['error', 'info'])
    }), PropTypes.func]))])
  };
}

export var FormFieldPropTypes = PropType;