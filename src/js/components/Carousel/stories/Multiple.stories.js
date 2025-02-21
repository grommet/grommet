import React from 'react';

import { Box, Carousel, Image } from 'grommet';

const data = [
  '//v2.grommet.io/assets/IMG_4210.jpg',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
  '//v2.grommet.io/assets/IMG_4245.jpg',
  '//v2.grommet.io/assets/IMG_4210.jpg',
  'https://avatars1.githubusercontent.com/u/14203820?s=280&v=4',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
  '//v2.grommet.io/assets/IMG_4245.jpg',
  '//v2.grommet.io/assets/IMG_4210.jpg',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg',
];

const captions = {
  '//v2.grommet.io/assets/IMG_4210.jpg': 'Office workspace with decorations',
  '//v2.grommet.io/assets/IMG_4245.jpg': 'Shore with a bridge and some ships',
  '//v2.grommet.io/assets/Wilderpeople_Ricky.jpg': 'Boy hiding behind bushes',
  'https://avatars1.githubusercontent.com/u/14203820?s=280&v=4': 'Grommet logo',
};

const View0 = () => {
  const imgs = data.slice(0, 3);
  return (
    <Box direction="row">
      {imgs.map((img) => (
        <Image key={img} src={img} fit="contain" alt={captions[img]} />
      ))}
    </Box>
  );
};
const View1 = () => {
  const imgs = data.slice(3, 6);
  return (
    <Box direction="row">
      {imgs.map((img) => (
        <Image key={img} src={img} fit="contain" alt={captions[img]} />
      ))}
    </Box>
  );
};
const View2 = () => {
  const imgs = data.slice(6);
  return (
    <Box direction="row">
      {imgs.map((img) => (
        <Image key={img} src={img} fit="contain" alt={captions[img]} />
      ))}
    </Box>
  );
};

export const Multi = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box>
    <Carousel>
      <View0 />
      <View1 />
      <View2 />
    </Carousel>
  </Box>
  // </Grommet>
);

export default {
  title: 'Media/Carousel/Multi',
};
