import React from "react";

import { Box } from "grommet";
import { Star, StarHalf } from "grommet-icons";

export const Rating = ({ value, size, ...rest }) => {
  if (!value) {
    return null;
  }
  if (value >= 5) {
    return (
      <Box direction="row" gap="xsmall" {...rest}>
        <Star color="plain" size={size} />
        <Star color="plain" size={size} />
        <Star color="plain" size={size} />
        <Star color="plain" size={size} />
        <Star color="plain" size={size} />
      </Box>
    );
  }
  const fullStars = Math.floor(value);
  const remainingStars = 5 - Math.ceil(value);
  return (
    <Box direction="row" gap="xsmall" {...rest}>
      {Array.from(Array(fullStars).keys()).map(index => (
        <Star key={`full_star_${index}`} color="plain" size={size} />
      ))}
      {value !== fullStars && <StarHalf color="plain" size={size} />}
      {Array.from(Array(remainingStars).keys()).map(index => (
        <Star key={`no_star_${index}`} color="light-4" size={size} />
      ))}
    </Box>
  );
};
