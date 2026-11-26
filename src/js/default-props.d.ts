// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { base, ThemeType } from './themes/base';

export namespace defaultProps {
  export { base as theme };
}

export function extendDefaultTheme(theme: ThemeType): void;

export function withTheme(props: Record<string, any>): ThemeType;
