import React from 'react';
import { Box, Card, CardBody, Heading, Text } from 'grommet';
import { CardImage } from '../CardImage';

export default {
  title: 'Media/CardImage/Simple',
};

export const Simple = () => (
  <Box width="medium">
    <CardImage src="//v2.grommet.io/assets/IMG_4245.jpg" alt="sample" />
  </Box>
);

export const FitOptions = () => (
  <Box direction="row" gap="medium" wrap>
    <Box width="small">
      <Text weight="bold">Cover</Text>
      <CardImage
        fit="cover"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="cover fit"
      />
    </Box>
    <Box width="small">
      <Text weight="bold">Contain</Text>
      <CardImage
        fit="contain"
        src="//v2.grommet.io/assets/IMG_4245.jpg"
        alt="contain fit"
      />
    </Box>
  </Box>
);

export const InCard = () => (
  <Card width="medium">
    <CardImage src="//v2.grommet.io/assets/IMG_4245.jpg" alt="card header" />
    <CardBody pad="medium">
      <Heading level={3} margin="none">
        Card Title
      </Heading>
      <Text>CardImage used within a Card component.</Text>
    </CardBody>
  </Card>
);
