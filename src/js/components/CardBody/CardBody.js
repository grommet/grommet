// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';

const CardBody = ({ ...rest }) => {
  const { theme } = useThemeValue();
  return <Box flex {...theme.card.body} {...rest} />;
};

export { CardBody };
