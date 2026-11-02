// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export type AnalyticsValue = Node;

declare const AnalyticsContext: React.Context<AnalyticsValue>;

export { AnalyticsContext };
