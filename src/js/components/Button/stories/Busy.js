import React, { useState } from 'react';
import { Box, Button } from 'grommet';

export const Busy = () => {
  const [busy, setBusy] = useState();
  const [success, setSuccess] = useState();

  return (
    <Box align="center" pad="medium">
      <Button
        primary
        busy={busy}
        success={success}
        label="Button Busy"
        onClick={() => {
          if (success) {
            setSuccess(false);
          } else {
            setBusy(true);
            setTimeout(() => {
              setBusy(false);
              setSuccess(true);
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
