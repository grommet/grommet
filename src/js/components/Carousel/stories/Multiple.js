import React from 'react';

import { Grommet, Box, Carousel, Image } from 'grommet';

const data = [
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
  '//v2.grommet.io/assets/IMG_4245.jpg',
  '//v2.grommet.io/assets/IMG_4210.jpg',
  'https://avatars1.githubusercontent.com/u/14203820?s=280&v=4',
  'https://developer.hpe.com/img/hpe-dev-grommet-gremlin-rockin-static.svg',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
  '//v2.grommet.io/assets/IMG_4245.jpg',
  '//v2.grommet.io/assets/IMG_4210.jpg',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
];

const View0 = () => {
  const imgs = data.slice(0, 3);
  return (
    <Box direction="row">
      {imgs.map(img => (
        <Image key={img} src={img} fit="contain" />
      ))}
    </Box>
  );
};
const View1 = () => {
  const imgs = data.slice(3, 6);
  return (
    <Box direction="row">
      {imgs.map(img => (
        <Image key={img} src={img} fit="contain" />
      ))}
    </Box>
  );
};
const View2 = () => {
  const imgs = data.slice(6);
  return (
    <Box direction="row">
      {imgs.map(img => (
        <Image key={img} src={img} fit="contain" />
      ))}
    </Box>
  );
};

export const Multi = () => (
  <Grommet>
    <Carousel>
      <View0 />
      <View1 />
      <View2 />
    </Carousel>
  </Grommet>
);

export default {
  title: 'Media/Carousel/Multi',
};
