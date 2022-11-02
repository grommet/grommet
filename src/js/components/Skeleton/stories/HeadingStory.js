import React, { useEffect, useState } from 'react';

import { Box, Heading } from 'grommet';

export const HeadingStory = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Box>
      <Heading level={2}>Heading loading</Heading>
      <Box gap="large" skeleton={!!isLoading}>
        <Heading margin="none" level={1}>
          Heading
        </Heading>
        <Heading margin="none" level={2}>
          Heading
        </Heading>
        <Heading margin="none" level={3}>
          Heading
        </Heading>
        <Heading margin="none" level={4}>
          Heading
        </Heading>
      </Box>
    </Box>
  );
};

export default {
  title: 'Visualizations/Skeleton/Heading',
};
