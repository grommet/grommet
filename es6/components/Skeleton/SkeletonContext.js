// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
export var SkeletonContext = /*#__PURE__*/React.createContext();
export var useSkeleton = function useSkeleton() {
  return useContext(SkeletonContext);
};