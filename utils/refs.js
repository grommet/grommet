"use strict";

exports.__esModule = true;
exports.useForwardedRef = void 0;
var _react = require("react");
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var useForwardedRef = exports.useForwardedRef = function useForwardedRef(ref) {
  var innerRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, function () {
    return innerRef.current;
  }, [innerRef]);
  return innerRef;
};