import React, { useState } from 'react';

import { Grommet, Box, List } from 'grommet';
import { grommet } from 'grommet/themes';

const locations = [
  `Lorem ipsum, or lipsum as it is sometimes known,
   is dummy text used in laying out print, graphic
   or web designs. The passage is attributed to an
   unknown typesetter in the 15th century who is
   thought to have scrambled parts of Cicero's De Finibus
   Bonorum et Malorum for use in a type specimen book.
   It usually begins with:`,
  'Fort Collins',
  'Los Gatos',
  'Palo Alto',
  'San Francisco',
];

export const Order = () => {
  const [ordered, setOrder] = useState(locations);
  return (
    <Grommet theme={grommet} role="application">
      <Box align="center" pad="large">
        <List
          generalItemProps={{ align: 'start' }}
          data={ordered}
          onOrder={setOrder}
        />
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/List/Order',
};
