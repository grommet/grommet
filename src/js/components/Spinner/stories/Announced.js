import React, { useState } from 'react';
import { grommet } from 'grommet/themes';

import { Box, Button, Grommet, Spinner } from 'grommet';

const PageContent = () => {
  // show= true will trigger the start of the announcement
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        label="Load"
        onClick={() => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 1500);
        }}
      />
      {show && (
        <Spinner
          message={{
            start: 'Start Built-in Spinner Announcement',
            end: 'End Spinner Announcement',
          }}
        />
      )}
    </>
  );
};

export const Announced = () => (
  <Grommet theme={grommet} full>
    <Box justify="center" align="center" background="background-back" fill>
      <PageContent />
    </Box>
  </Grommet>
);

export default {
  title: 'Utilities/Spinner/Announced',
};
