"use strict";

exports.__esModule = true;
exports.RadioButtonGroupPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: _propTypes["default"].func,
    disabled: _propTypes["default"].bool,
    name: _propTypes["default"].string.isRequired,
    onChange: _propTypes["default"].func,
    options: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].arrayOf(_propTypes["default"].number), _propTypes["default"].arrayOf(_propTypes["default"].bool), _propTypes["default"].arrayOf(_propTypes["default"].shape({
      disabled: _propTypes["default"].bool,
      id: _propTypes["default"].string,
      label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
      value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool]).isRequired
    }))]).isRequired,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool, _propTypes["default"].object])
  };
}
var RadioButtonGroupPropTypes = exports.RadioButtonGroupPropTypes = PropType;