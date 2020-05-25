import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Anchor, Box, Footer, Main, Text, Icon } from 'mnet-ui-base';
import { fiveColumns as data } from './data';

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);

const FooterContent = () => {
  return data.map(item => (
    <Box gap="medium" key={item[0]}>
      <Text weight="bold" size="small">
        {item[0]}
      </Text>
      <Box>
        {[1, 2, 3, 4].map(i => (
          <FooterAnchor key={item[i]}>{item[i]}</FooterAnchor>
        ))}
      </Box>
    </Box>
  ));
};

const DoubleFooter = () => {
  return (
    <>
      <Main background="light-4" elevation="large" pad="large" border>
        <Text margin="small" size="xsmall">
          Main Content
        </Text>
        <Box flex />
      </Main>
      <Footer background="dark-1" pad="large">
        <FooterContent />
      </Footer>
      <Footer
        background="dark-2"
        pad={{ horizontal: 'large', vertical: 'small' }}
      >
        <Box direction="row" gap="small">
          <Icon color="brand" />
          <Text alignSelf="center">grommet.io</Text>
        </Box>
        <Text textAlign="center" size="small">
          © 2019 Copyright
        </Text>
      </Footer>
    </>
  );
};

storiesOf('Footer', module).add('DoubleFooter', () => <DoubleFooter />);
