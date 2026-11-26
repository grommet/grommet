// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Image } from 'grommet';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Image src="//v2.grommet.io/assets/IMG_4245.jpg" alt="simple image" />
  // </Grommet>
);

export default {
  title: 'Media/Image/Simple',
};
