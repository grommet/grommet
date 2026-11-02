// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';

import { StyledTableRow } from '../Table/StyledTable';

const TableRow = forwardRef((props, ref) => (
  <StyledTableRow ref={ref} {...props} />
));

TableRow.displayName = 'TableRow';

export { TableRow };
