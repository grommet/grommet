// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

// Internal Wizard state used only to keep progress sub-steps revealed while
// the progress rail is unmounted and mounted again.
export const WizardRevealContext = React.createContext([]);
