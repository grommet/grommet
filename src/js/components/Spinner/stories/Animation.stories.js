/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Box, Spinner } from 'grommet';

const gradient =
  'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)';

const gradientRainbow =
  'radial-gradient(circle at 50% -3.03%, #ff99ff 0, #ff91ff 3.33%, #ff8bf9 6.67%, #ff86e4 10%, #ff85cf 13.33%, #ff85b9 16.67%, #ff89a4 20%, #ff8f90 23.33%, #ff967d 26.67%, #ff9e6a 30%, #ffa758 33.33%, #ffb047 36.67%, #ffb937 40%, #ffc228 43.33%, #ffca1a 46.67%, #f8d110 50%, #e5d812 53.33%, #d0de1f 56.67%, #bae32f 60%, #a2e840 63.33%, #87ec52 66.67%, #67ef65 70%, #36f279 73.33%, #00f48e 76.67%, #00f6a3 80%, #00f7b9 83.33%, #00f8cf 86.67%, #00f9e5 90%, #00f9fb 93.33%, #00f9ff 96.67%, #00f8ff 100%);';

const BounceSpinner = styled(Spinner)`
  animation-name: bounce-1;
  animation-timing-function: ease;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  @keyframes bounce-1 {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-100px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

export const Animation = () => {
  const [meterValue, setMeterValue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (meterValue < 100) setMeterValue(meterValue + 0.02);
    });
    return () => {
      clearTimeout(timer);
    };
  }, [meterValue]);

  return (
    <Box
      gap="xlarge"
      pad={{ vertical: 'xlarge', horizontal: 'large' }}
      margin="xlarge"
    >
      <BounceSpinner
        background={gradientRainbow}
        border={false}
        size="medium"
      />
      <Spinner
        background={gradient}
        size="large"
        animation={[
          { type: 'fadeIn', duration: 1900, size: 'large' },
          { type: 'pulse', duration: 1450, size: 'large' },
        ]}
        border={false}
      />
    </Box>
  );
};

Animation.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/Spinner/Animation',
};
