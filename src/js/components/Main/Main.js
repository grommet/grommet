import React from 'react';

import { Box } from '../Box';

const Main = ({ ...rest }) => (
  <Box as="main" fill="vertical" flex="grow" overflow="auto" {...rest} />
);

let MainDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  MainDoc = require('./doc').doc(Main);
}
const MainWrapper = MainDoc || Main;

export { MainWrapper as Main };
