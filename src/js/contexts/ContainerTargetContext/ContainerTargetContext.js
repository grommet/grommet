// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

export const ContainerTargetContext = React.createContext(
  typeof document === 'object' ? document.body : undefined,
);
