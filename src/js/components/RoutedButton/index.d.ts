// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { ButtonProps } from '../Button';

export interface RoutedButtonProps {
  path: string;
  method?: 'push' | 'replace';
}

declare const RoutedButton: React.ComponentClass<
  RoutedButtonProps & ButtonProps
>;

export { RoutedButton };
