// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { BoxProps } from '../Box';

export function getPartStyleProps(part?: object): Partial<BoxProps>;
export function mergePart<T extends object, U extends object>(
  base: T,
  override: U,
): T & U;
export function mergeDefinedPart<T extends object, U extends object>(
  base: T,
  override: U,
): T & U;
export function resolvePart(
  base?: object,
  input?: object,
  state?: string,
): {
  props: Partial<BoxProps>;
  hover?: Partial<BoxProps> | false;
  hasHover: boolean;
  hasStatePad: boolean;
};
