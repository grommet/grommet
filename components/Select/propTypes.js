"use strict";

exports.__esModule = true;
exports.genericSelectProps = exports.SelectPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var genericSelectProps = exports.genericSelectProps = _extends({}, _generalPropTypes.genericProps, {
  children: _propTypes["default"].func,
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
  emptySearchMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  focusIndicator: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func, _propTypes["default"].node, _propTypes["default"].elementType]),
  labelKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  messages: _propTypes["default"].shape({
    multiple: _propTypes["default"].string
  }),
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
  searchPlaceholder: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element, _propTypes["default"].node]),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
  valueLabel: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  valueKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func, _propTypes["default"].shape({
    key: _propTypes["default"].string,
    reduce: _propTypes["default"].bool
  })])
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericSelectProps, {
    clear: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
      position: _propTypes["default"].oneOf(['top', 'bottom']),
      label: _propTypes["default"].string
    })]),
    closeOnChange: _propTypes["default"].bool,
    defaultValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]))]),
    multiple: _propTypes["default"].bool,
    selected: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].number)]),
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element,
    // deprecated, use valueLabel
    _propTypes["default"].object, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].object, _propTypes["default"].number]))])
  });
}
var SelectPropTypes = exports.SelectPropTypes = PropType;