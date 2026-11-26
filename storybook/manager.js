// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { addons } from 'storybook/internal/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
  showNav: true,
  showPanel: true, // show the code panel by default
});
