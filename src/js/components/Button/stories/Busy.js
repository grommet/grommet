import React, { useState } from 'react';
import { Box, Button } from 'grommet';

export const Busy = () => {
  const [busy, setBusy] = useState();

  return (
    <Box align="center" pad="medium">
      <Button
        primary
        busy={{
          state: busy,
          messages: {
            loading: 'Button Busy is in a loading state',
            success: 'Button Busy action succeeded',
          },
        }}
        label="Button Busy"
        onClick={() => {
          if (busy) {
            setBusy(undefined);
          } else {
            setBusy('loading');
            setTimeout(() => {
              setBusy('success');
            }, 2000);
          }
        }}
      />
    </Box>
  );
};

export default {
  title: 'Controls/Button/Busy',
};
