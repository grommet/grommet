"use strict";

exports.__esModule = true;
exports.StyledWizardFocusAnchor = void 0;
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _utils = require("../../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

// Programmatic focus target for step transitions (tabIndex={-1}); no visible
// focus indication — screen readers announce via aria-live on this element.
var StyledWizardFocusAnchor = exports.StyledWizardFocusAnchor = _styledComponents["default"].div.withConfig(_utils.styledComponentsConfig).withConfig({
  displayName: "StyledWizard__StyledWizardFocusAnchor",
  componentId: "sc-1o4qqu4-0"
})(["outline:none;"]);