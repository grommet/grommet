import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext, Stack, Text } from 'grommet';
import { getEmoji } from '../emojis/utils';

const SliderImage = ({ name, score, src }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Stack anchor="bottom">
        <Box
          round="xlarge"
          overflow="hidden"
          align="center"
          margin="small"
          height="large"
        >
          <Image src={src} />
        </Box>
        <Box margin="xlarge">
          {name && (
            <span style={{ fontSize: '90px' }}>{getEmoji(name[0])}</span>
          )}
        </Box>
        <Box>
          {size !== 'small' && size !== 'xsmall' && (
            <Text
              margin={{ bottom: '30px' }}
              weight="bold"
              color="white"
              size="large"
            >
              {score}
            </Text>
          )}
        </Box>
      </Stack>
    )}
  </ResponsiveContext.Consumer>
);

SliderImage.propTypes = {
  name: PropTypes.arrayOf.isRequired,
  score: PropTypes.arrayOf.isRequired,
  src: PropTypes.string.isRequired,
};

export { SliderImage };
