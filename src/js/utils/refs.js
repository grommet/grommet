// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useImperativeHandle, useRef } from 'react';

export const useForwardedRef = (ref) => {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current, [innerRef]);
  return innerRef;
};
