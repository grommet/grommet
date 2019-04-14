import React from 'react';
import { Box, ResponsiveContext, Text } from 'grommet';

import { Logo, SocialMedia } from '../index';
import { FooterContent } from './FooterContent';

const Footer = ({ ...rest }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        direction="row"
        justify="between"
        border={{ side: 'top', color: 'light-4' }}
        pad={{ top: 'xlarge' }}
        {...rest}
      >
        <Box gap="large" align="start">
          <Box
            gap="small"
            direction="row-responsive"
            align="center"
            pad={{ horizontal: 'small' }} // align with margin of icons from SocialMedia
          >
            <Logo />
            {size !== 'small' && size !== 'xsmall' && (
              <Text weight="bold" size="large">
                App Teaser
              </Text>
            )}
          </Box>
          <SocialMedia />
        </Box>
        <FooterContent />
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

export { Footer };
