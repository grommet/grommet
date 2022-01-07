import React from 'react';

import {
  Avatar,
  Box,
  Card,
  Heading,
  CardBody,
  CardHeader,
  Grid,
  Grommet,
  Text,
  Image,
  Stack,
} from 'grommet';

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
    container: {
      elevation: 'large',
    },
    footer: {
      pad: 'medium',
    },
  },
};

const data = [
  {
    location: 'Blue Hole',
    image: `https://i.insider.com/5c796ca426289858f7205ede?width=1136&format=jpeg`,
    state: 'Belize',
  },
  {
    location: 'The Satil',
    image: `https://www.israel21c.org/wp-content/uploads/2020/01/shutterstock_733279432.jpg`,
    state: 'Israel',
  },
  {
    location: 'Barrier Reef',
    image: `https://img.jakpost.net/c/2020/04/07/2020_04_07_92088_1586233705._large.jpg`,
    state: 'Australia',
  },
];

export const Stacked = () => {
  const avatarSrc =
    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    <Grommet theme={theme}>
      <Box pad="large">
        <Grid
          gap="large"
          rows="medium"
          columns={{ count: 'fit', size: ['small', 'medium'] }}
        >
          {data.map((item) => (
            <Card width="medium" key={item.location}>
              {/* Stacked CardBody and CardHeader on top of each other
              in that order */}
              <Stack anchor="bottom-left">
                <CardBody height="medium">
                  <Image
                    fit="cover"
                    src={item.image}
                    a11yTitle="scuba diving"
                  />
                </CardBody>
                <CardHeader
                  pad={{ horizontal: 'small', vertical: 'small' }}
                  // https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#all-hex-value-from-100-to-0-alpha
                  background="#000000A0"
                  width="medium"
                  justify="start"
                >
                  <Avatar src={avatarSrc} a11yTitle="avatar" />
                  <Box>
                    <Heading level="3" margin="none">
                      {item.location}
                    </Heading>
                    <Text size="small">{item.state}</Text>
                  </Box>
                </CardHeader>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Card/Custom Themed/Stacked',
};
