"use strict";

exports.__esModule = true;
exports.SpinnerPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      dark: _propTypes["default"].string,
      light: _propTypes["default"].string
    })]),
    message: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      start: _propTypes["default"].string,
      end: _propTypes["default"].string
    })])
  };
}
var SpinnerPropTypes = exports.SpinnerPropTypes = PropType;