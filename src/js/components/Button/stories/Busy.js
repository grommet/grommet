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
          setBusy(true);
          setTimeout(() => {
            setBusy(false);
            setSuccess(true);
          }, 2000);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
        }}
      />
    </Box>
  );
};

Busy.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Controls/Button/Busy',
};
