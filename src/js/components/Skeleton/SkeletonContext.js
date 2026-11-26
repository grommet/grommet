// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';

export const SkeletonContext = React.createContext();

export const useSkeleton = () => useContext(SkeletonContext);
