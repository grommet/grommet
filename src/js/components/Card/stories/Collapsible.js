import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Avatar,
  Box,
  Button,
  Card,
  Collapsible,
  Heading,
  CardBody,
  CardFooter,
  Grommet,
  Text,
  Image,
  Paragraph,
} from 'grommet';
import { FormDown, FormUp, Favorite, ShareOption } from 'grommet-icons';

const theme = {
  global: {
    font: {
      family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto`,
    },
  },
  heading: { font: { family: 'Comic Sans MS' } },
  card: {
    elevation: 'none',
    background: 'light-2',
    footer: {
      pad: 'medium',
    },
  },
};

const data = [
  {
    location: 'Barrier Reef',
    image: `https://img.jakpost.net/c/2020/04/07/2020_04_07_92088_1586233705._large.jpg`,
    state: 'Australia',
    gravatar: '',
    description: `The Great Barrier Reef is the world's largest coral reef 
    system composed of over 2,900 individual reefs and 900 islands stretching 
    for over 2,300 kilometers (1,400 mi) over an area of approximately 
    344,400 square kilometers (133,000 sq mi).`,
  },
  {
    location: 'The Satil',
    image: `https://www.israel21c.org/wp-content/uploads/2020/01/shutterstock_733279432.jpg`,
    state: 'Israel',
    description: `A former “Vedette of Cherbourg”, very well preserved. 
    This missile boat is about 45 meters long and lies between 20 and 
    25 meters depth with a lot of soft corals around.`,
  },
  {
    location: 'Blue Hole',
    image: `https://i.insider.com/5c796ca426289858f7205ede?width=1136&format=jpeg`,
    state: 'Belize',
    description: `The Great Blue Hole is a giant marine sinkhole off the 
      coast of Belize. It lies near the center of Lighthouse Reef, a small atoll
       70 km (43 mi) from the mainland and Belize City.`,
  },
];

const Example = () => {
  const src = '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
  const [open, setOpen] = React.useState(false);

  const ExpandButton = ({ ...rest }) => {
    const Icon = open ? FormUp : FormDown;
    return (
      <Button
        hoverIndicator="light-4"
        icon={<Icon color="brand" />}
        {...rest}
      />
    );
  };

  return (
    <Grommet theme={theme}>
      <Box pad="medium" align="start" gap="large" direction="row-responsive">
        {data.map(item => (
          <Card elevation="large" width="medium">
            <CardBody height="small">
              <Image fit="cover" src={item.image} a11yTitle="bridge" />
            </CardBody>
            <Box
              pad="medium"
              responsive={false}
              direction="row"
              align="center"
              gap="small"
            >
              <Avatar src={src} />
              <Box gap="xsmall">
                <Heading level="3" margin="none">
                  {item.location}
                </Heading>
                <Text size="xsmall">{item.state}</Text>
              </Box>
            </Box>
            <CardFooter>
              <Box direction="row">
                <Button icon={<Favorite color="red" />} hoverIndicator />
                <Button icon={<ShareOption color="plain" />} hoverIndicator />
              </Box>
              <ExpandButton onClick={() => setOpen(!open)} />
            </CardFooter>
            <Collapsible open={open}>
              <Paragraph margin="medium">{item.description}</Paragraph>
            </Collapsible>
          </Card>
        ))}
      </Box>
    </Grommet>
  );
};

storiesOf('Card', module).add('Collapsible', () => <Example />);
