// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface SkipLinkTargetProps {
  id: string;
  label?: React.ReactNode;
}

declare const SkipLinkTarget: React.FC<SkipLinkTargetProps>;

export { SkipLinkTarget };
