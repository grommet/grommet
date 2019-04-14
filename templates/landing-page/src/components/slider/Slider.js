/* eslint-disable no-nested-ternary */
import React from 'react';
import Slider from 'react-slick';

import { Box, ResponsiveContext } from 'grommet';
import { SliderImage } from './SliderImage';

import { data, images } from './data';

function getNumOfItemsToShow(size) {
  return size === 'xsmall'
    ? 2
    : size === 'small'
    ? 3
    : size === 'medium'
    ? 4
    : 5;
}

function galleryItems() {
  return images.map((item, index) => (
    <SliderImage
      src={item}
      name={data[index] && Object.keys(data[index])}
      score={data[index] && Object.values(data[index])}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    />
  ));
}

export function InstaSlider() {
  const items = galleryItems();
  const settings = {
    className: 'center',
    infinite: true,
    slidesToScroll: 1,
    speed: 1200,
    autoplay: true,
  };

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box pad="large">
          <Slider slidesToShow={getNumOfItemsToShow(size)} {...settings}>
            {items}
          </Slider>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

export { InstaSlider as Slider };
