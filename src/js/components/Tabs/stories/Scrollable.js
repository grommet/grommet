import React from 'react';

import { Box, Heading, Tab, Tabs, Text, Paragraph } from 'grommet';
import { TreeOption } from 'grommet-icons';

const ScrollableTabs = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill>
    <Tabs flex>
      <Tab title="Tab 1">
        <Box
          fill
          overflow="auto"
          pad="xlarge"
          align="center"
          background="light-2"
        >
          <Heading>Title</Heading>
          <Paragraph>
            <Text weight="bold">
              This is a tab with a lot of content. If you scroll down, the tabs
              header remains in view.
            </Text>
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            porttitor ipsum a ligula tincidunt, tempor posuere massa gravida.
            Morbi at magna lacus. Vivamus eu consequat lectus. Quisque a aliquam
            risus. Ut vel dignissim nunc. Etiam rhoncus pellentesque porttitor.
            Sed nec gravida nisl. Cras justo ex, condimentum at dolor vel,
            lacinia efficitur dui. Nullam pellentesque metus nec felis gravida,
            vel suscipit sem condimentum. Ut hendrerit varius enim. Donec congue
            vestibulum neque accumsan fermentum. Nulla facilisi. Praesent ornare
            id magna vitae malesuada. Aenean nulla enim, pretium ac est vel,
            tristique condimentum ex. Phasellus ante enim, pellentesque ut arcu
            sit amet, semper sodales dolor.
          </Paragraph>
          <Paragraph>
            Proin sollicitudin dui eget diam mollis mattis eget id magna.
            Pellentesque tristique aliquet leo, a euismod velit molestie non.
            Donec lacinia, lectus quis mollis pretium, turpis erat sollicitudin
            mauris, vitae luctus velit lacus eu metus. Nam pulvinar mauris vitae
            massa faucibus, id semper sapien facilisis. Integer a congue ex.
            Vestibulum dapibus est fermentum felis hendrerit vulputate. Fusce
            libero odio, posuere sit amet mi vitae, cursus aliquam nulla. Nunc
            ornare augue vitae mauris ultricies gravida. In quis enim at nisi
            semper ultrices. Nunc posuere sed libero in facilisis.
          </Paragraph>
          <Paragraph>
            Etiam sit amet ligula nunc. Pellentesque pulvinar nisl ornare dui
            molestie, sed faucibus elit rhoncus. In nec pellentesque enim, eget
            ultricies tortor. Phasellus tincidunt ultrices tortor vitae
            malesuada. Proin rhoncus maximus mauris, a commodo tortor blandit
            quis. Phasellus tincidunt luctus dapibus. Sed in imperdiet enim.
            Vivamus varius ut dolor non scelerisque. Praesent volutpat ligula
            sodales augue auctor tempor. Quisque eleifend eleifend turpis nec
            egestas. Nunc dapibus semper commodo. Sed volutpat arcu eleifend
            ipsum volutpat, eu sagittis leo hendrerit. Nulla consequat justo non
            erat finibus cursus. Integer porttitor ante in ultrices semper.
          </Paragraph>
          <Paragraph>
            Praesent vel tellus sagittis, fringilla arcu vel, sodales turpis.
            Nam id accumsan nibh. Pellentesque eget diam eleifend, ultrices diam
            ac, suscipit ipsum. Curabitur euismod sodales sem vel ultricies.
            Proin euismod ipsum eros, ut efficitur felis pharetra finibus.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut
            tincidunt posuere augue at porttitor. Sed venenatis iaculis est, sit
            amet interdum magna varius ut. In euismod scelerisque velit, vel
            aliquet enim. Etiam lacinia justo nec nibh aliquam, et pulvinar eros
            luctus. Fusce quis nisi eu tellus imperdiet bibendum ac id nulla.
            Proin ut tincidunt libero. Phasellus sed velit eu risus hendrerit
            suscipit at eget felis. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Phasellus at
            blandit est. Phasellus fringilla nibh ac est scelerisque, id
            faucibus enim interdum.
          </Paragraph>
        </Box>
      </Tab>
      <Tab title="Tab 2">
        <Box margin="small" pad="large" align="center" background="brand">
          <TreeOption size="xlarge" />
        </Box>
      </Tab>
    </Tabs>
  </Box>
  // </Grommet>
);

export const Scrollable = () => <ScrollableTabs />;

Scrollable.args = {
  full: true,
};

export default {
  title: 'Controls/Tabs/Scrollable',
};
