function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    children: PropTypes.func,
    clear: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
      position: PropTypes.oneOf(['top', 'bottom']),
      label: PropTypes.string
    })]),
    closeOnChange: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]))]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]))]),
    disabledKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }),
    dropHeight: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    dropTarget: PropTypes.object,
    dropProps: PropTypes.object,
    focusIndicator: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node, PropTypes.elementType]),
    labelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    messages: PropTypes.shape({
      multiple: PropTypes.string
    }),
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onSearch: PropTypes.func,
    onMore: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.element, PropTypes.object])).isRequired,
    open: PropTypes.bool,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
    plain: PropTypes.bool,
    replace: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.element, // deprecated, use valueLabel
    PropTypes.object, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]))]),
    valueLabel: PropTypes.node,
    valueKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({
      key: PropTypes.string,
      reduce: PropTypes.bool
    })]),
    emptySearchMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  });
}

export var SelectPropTypes = PropType;