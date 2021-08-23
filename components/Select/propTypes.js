"use strict";

exports.__esModule = true;
exports.SelectPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    children: _propTypes["default"].func,
    clear: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      position: _propTypes["default"].oneOf(['top', 'bottom']),
      label: _propTypes["default"].string
    })]),
    closeOnChange: _propTypes["default"].bool,
    defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]))]),
    disabled: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string, _propTypes["default"].object]))]),
    disabledKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    dropAlign: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(['top', 'bottom']),
      bottom: _propTypes["default"].oneOf(['top', 'bottom']),
      right: _propTypes["default"].oneOf(['left', 'right']),
      left: _propTypes["default"].oneOf(['left', 'right'])
    }),
    dropHeight: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    dropTarget: _propTypes["default"].object,
    dropProps: _propTypes["default"].object,
    focusIndicator: _propTypes["default"].bool,
    icon: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func, _propTypes["default"].node, _propTypes["default"].elementType]),
    labelKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    messages: _propTypes["default"].shape({
      multiple: _propTypes["default"].string
    }),
    multiple: _propTypes["default"].bool,
    name: _propTypes["default"].string,
    onChange: _propTypes["default"].func,
    onClose: _propTypes["default"].func,
    onOpen: _propTypes["default"].func,
    onSearch: _propTypes["default"].func,
    onMore: _propTypes["default"].func,
    options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool, _propTypes["default"].element, _propTypes["default"].object])).isRequired,
    open: _propTypes["default"].bool,
    placeholder: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, _propTypes["default"].node]),
    plain: _propTypes["default"].bool,
    replace: _propTypes["default"].bool,
    searchPlaceholder: _propTypes["default"].string,
    selected: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, // deprecated, use valueLabel
    _propTypes["default"].object, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]))]),
    valueLabel: _propTypes["default"].node,
    valueKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].shape({
      key: _propTypes["default"].string,
      reduce: _propTypes["default"].bool
    })]),
    emptySearchMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
  });
}

var SelectPropTypes = PropType;
exports.SelectPropTypes = SelectPropTypes;