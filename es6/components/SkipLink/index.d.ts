// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface SkipLinkProps {
  id: string;
  label?: React.ReactNode;
}

declare const SkipLink: React.FC<SkipLinkProps>;

export { SkipLink };
