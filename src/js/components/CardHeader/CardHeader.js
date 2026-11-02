// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Header } from '../Header';
import { useThemeValue } from '../../utils/useThemeValue';

const CardHeader = ({ ...rest }) => {
  const { theme } = useThemeValue();
  return <Header {...theme.card.header} {...rest} />;
};

export { CardHeader };
