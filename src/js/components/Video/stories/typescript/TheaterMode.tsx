import React, { useState } from 'react';

import { Box, Video } from 'grommet';
import { Monitor } from 'grommet-icons/icons/Monitor';

const TheaterMode = (props) => {
  const [theaterMode, setTheaterMode] = useState(false);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <Box
      background={theaterMode ? 'dark-1' : 'light-1'}
      overflow="hidden"
      width={theaterMode ? null : 'small'}
      height={isSafari && { max: theaterMode ? null : '237px' }}
      fill="vertical"
      align="center"
      flex={true}
      pad="large"
    >
      <Video
        src="large_video.mp4"
        fit="cover"
        controls={{
          position: theaterMode ? 'over' : 'below',
          items: [
            {
              icon: <Monitor />,
              onClick: () => setTheaterMode(!theaterMode),
              a11yTitle: 'Toggle theater mode',
            },
            'fullScreen',
          ],
        }}
        {...props}
      />
    </Box>
  );
};

export const CustomizableControls = () => <TheaterMode />;

CustomizableControls.storyName = 'Theater mode';

CustomizableControls.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Media/Video/Theater mode',
};
