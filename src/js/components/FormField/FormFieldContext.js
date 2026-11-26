// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

// Internal focus-indicator ownership contract. Descendants can keep normal
// focus/blur events while opting to display their own indicator.
export const FormFieldContext = React.createContext({});
