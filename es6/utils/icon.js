// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { cloneElement } from 'react';
export var useSizedIcon = function useSizedIcon(icon, size, theme) {
  var _theme$icon;
  return icon && theme != null && (_theme$icon = theme.icon) != null && _theme$icon.matchSize && !icon.props.size ? /*#__PURE__*/cloneElement(icon, {
    size: size
  }) : icon;
};