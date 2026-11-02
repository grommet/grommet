// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { cloneElement } from 'react';

export const useSizedIcon = (icon, size, theme) =>
  icon && theme?.icon?.matchSize && !icon.props.size
    ? cloneElement(icon, { size })
    : icon;
