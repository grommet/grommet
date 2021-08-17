"use strict";

exports.__esModule = true;
exports.DropPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// if you update values here, make sure to update in Box too.
var dropOverflowPropTypes = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(_generalPropTypes.OVERFLOW_VALUES), _propTypes["default"].shape({
  horizontal: _propTypes["default"].oneOf(_generalPropTypes.OVERFLOW_VALUES),
  vertical: _propTypes["default"].oneOf(_generalPropTypes.OVERFLOW_VALUES)
}), _propTypes["default"].string]);

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    align: _propTypes["default"].shape({
      top: _propTypes["default"].oneOf(['top', 'bottom']),
      bottom: _propTypes["default"].oneOf(['top', 'bottom']),
      right: _propTypes["default"].oneOf(['left', 'right']),
      left: _propTypes["default"].oneOf(['left', 'right'])
    }),
    background: _generalPropTypes.backgroundDoc,
    elevation: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['none', 'xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    margin: _generalPropTypes.marginProp,
    onClickOutside: _propTypes["default"].func,
    onEsc: _propTypes["default"].func,
    overflow: dropOverflowPropTypes,
    plain: _propTypes["default"].bool,
    responsive: _propTypes["default"].bool,
    restrictFocus: _propTypes["default"].bool,
    round: _generalPropTypes.roundPropType,
    stretch: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['align'])]),
    target: _propTypes["default"].object.isRequired,
    trapFocus: _propTypes["default"].bool
  };
}

var DropPropTypes = PropType;
exports.DropPropTypes = DropPropTypes;