"use strict";

exports.__esModule = true;
exports.StepperPropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    steps: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      id: _propTypes["default"].string.isRequired,
      title: _propTypes["default"].string.isRequired,
      description: _propTypes["default"].string,
      status: _propTypes["default"].oneOf(['pending', 'completed', 'error', 'disabled']),
      disabledReason: _propTypes["default"].string,
      errorMessage: _propTypes["default"].string,
      children: _propTypes["default"].arrayOf(_propTypes["default"].shape({
        id: _propTypes["default"].string.isRequired,
        title: _propTypes["default"].string.isRequired,
        description: _propTypes["default"].string,
        status: _propTypes["default"].oneOf(['pending', 'completed', 'error', 'disabled']),
        disabledReason: _propTypes["default"].string,
        errorMessage: _propTypes["default"].string
      }))
    })).isRequired,
    currentStep: _propTypes["default"].string.isRequired,
    direction: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    clickableSteps: _propTypes["default"].bool,
    showDescription: _propTypes["default"].bool,
    onStepClick: _propTypes["default"].func,
    id: _propTypes["default"].string,
    children: _propTypes["default"].node
  };
}
var StepperPropTypes = exports.StepperPropTypes = PropType;