// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { ResponsiveContextPropTypes } from './propTypes';

export const ResponsiveContext = React.createContext(undefined);

ResponsiveContext.propTypes = ResponsiveContextPropTypes;
