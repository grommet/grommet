import React, { useState } from 'react';
import { Box, Button } from 'grommet';

export const Test = () => {
  const [busy, setBusy] = useState();

  return (
    <Box align="center" pad="medium">
      <Button
        primary
        busy={busy}
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
  title: 'Controls/Button/Test',
};
