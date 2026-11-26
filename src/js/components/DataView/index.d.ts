// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface DataViewProps {}

type divProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onClick' | 'property'
>;

export interface DataViewExtendedProps
  extends BoxProps,
    DataViewProps,
    divProps {}

declare const DataView: React.FC<DataViewExtendedProps>;

export { DataView };
