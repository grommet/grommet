// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface DataSortProps {
  drop?: boolean;
}

export interface DataSortExtendedProps extends DataSortProps {}

declare const DataSort: React.FC<DataSortExtendedProps>;

export { DataSort };
