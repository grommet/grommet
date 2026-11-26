// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';

import { Anchor } from '../Anchor';

export const SkipLink = forwardRef(({ id, label, ...rest }, ref) => (
  <Anchor href={`#${id}`} ref={ref} label={label} {...rest} />
));
