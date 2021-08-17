function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    numberEdgePages: PropTypes.number,
    numberItems: PropTypes.number,
    numberMiddlePages: PropTypes.number,
    onChange: PropTypes.func,
    page: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    step: PropTypes.number
  });
}

export var PaginationPropTypes = PropType;