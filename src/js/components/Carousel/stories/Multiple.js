import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Carousel, Image } from 'grommet';

const CarouselMulti = () => {
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

  // 3 Carousel Views with up to 3 images in each view
  const getCarouselView = () => {
    const carouselView = new Array(3)
      .fill([])
      .map((_, i) => data.slice(i * 3, i * 3 + 3));

    // add images to each view
    return carouselView.map(view => {
      // return each view with three images
      return (
        <Box direction="row" key={view}>
          {view.map(img => (
            <Image src={img} fit="contain" key={img} />
          ))}
        </Box>
      );
    });
  };
  return (
    <Grommet>
      <Carousel controls="arrows">{getCarouselView()}</Carousel>
    </Grommet>
  );
};

storiesOf('Carousel', module).add('Multi', () => <CarouselMulti />);
