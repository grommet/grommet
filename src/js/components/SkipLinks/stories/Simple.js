/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';

import {
  Avatar,
  Box,
  Anchor,
  Header,
  Nav,
  Paragraph,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Heading,
} from 'grommet';

const avatarSrc =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

const contentFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum.
`;

const introContent = `
The main content is not usually the first thing on a web page. Keyboard and 
screen reader users generally must navigate a long list of navigation 
links, sub-lists of links, corporate icons, site searches, and other 
elements before ever arriving at the main content. This is particularly 
difficult for users with some forms of motor disabilities.
Without some sort of system for bypassing the long list of links, some users 
are at a huge disadvantage. Consider users with no arm movement, who use 
computers by tapping their heads on a switch or that use a stick in their 
mouth to press keyboard keys. Requiring users to perform any action perhaps 
100s of times before reaching the main content is simply unacceptable.
Of course, sighted people who use their mouse do not have any trouble with 
pages such as this. They can almost immediately scan over the page and 
identify where the main content is. In effect, sighted users have a built-in 
"skip navigation" mechanism: their eyes. They can also bypass the many links 
before the main content and click directly on the link they want with the mouse.
The "skip navigation" idea was invented to give screen reader and keyboard 
users the same capability of going directly to the main content that 
sighted mouse users take for granted.
`;

const howDoesItWorkContent = `
To get the most of Grommet's SkipLinks example, use a narrow window width and
open this page in a full screen (you can either use the 
storybook "full-screen" icon or click on any of the Header's anchors 
on the top right of the page (Home, Profile or Setting links) to achieve it) 
and then enter Tab on your keyboard.
The first tabbed element of the page will be the SkipLinks layer, 
the layer will provide you the option to skip the navigation 
of the page to the Main Content or the Footer. 
For example, let's take a user that isn't using a mouse, and is interested in 
skipping to the Main Content or the Footer without tabbing through all 
the Header links, the user can choose one of the suggested options of the layer 
either 'Main Content' or 'Footer', and that will 
set the focus of the page to the 
targeted (SkipLinkTarget) position and hence speeding the navigation 
throughout the page.`;

const Info = ({ label }) => (
  <Paragraph>
    After choosing the {label} option on the SkipLinks layer, the following
    interactive element will be the next focusable item.
  </Paragraph>
);

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <SkipLinks>
      <SkipLink id="main" label="Main Content" />
      <SkipLink id="footer" label="Footer" />
    </SkipLinks>
    <Box gap="large" margin={{ bottom: 'xlarge' }}>
      <Box background="light-3" pad="small" fill="horizontal">
        <Header pad={{ horizontal: 'large' }}>
          <Avatar src={avatarSrc} />
          <Nav direction="row">
            <Anchor label="Home" href="#" />
            <Anchor label="Profile" href="#" />
            <Anchor label="Setting" href="#" />
          </Nav>
        </Header>
      </Box>
      <Box pad={{ horizontal: 'large' }}>
        <Box gap="medium" align="start">
          <Heading level={1}>SkipLinks Example</Heading>
          <Heading level={2}>Accessibility Overview</Heading>
          {introContent}
          <Anchor
            href="https://webaim.org/techniques/skipnav/"
            label="Content taken from WebAIM"
          />
          <Heading level={2}>How does it work</Heading>
          {howDoesItWorkContent}
        </Box>
        <Box gap="medium" align="start" margin={{ vertical: 'medium' }}>
          <SkipLinkTarget id="main" />
          <Heading level={2}>Main Content</Heading>
          <Info label="Main Content" />
          <Anchor href="#" label="Interactive Element" />
          {contentFiller}
        </Box>
        <Box gap="medium" align="start">
          <SkipLinkTarget id="footer" />
          <Heading level={2}>Footer</Heading>
          <Info label="Footer" />
          <Anchor href="#" label="Interactive Element" />
          {contentFiller}
        </Box>
      </Box>
    </Box>
  </Box>
  // </Grommet>
);

Simple.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Utilities/SkipLinks/Simple',
};
