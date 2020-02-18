import React, { forwardRef } from 'react';

import { Box } from '../Box';
import { Image } from '../Image';

import { StyledCard, StyledImage, StyledBody, StyledTitle } from './StyledCard';

const Card = forwardRef(
  (
    {
      size = 'medium',
      image = '',
      onClick,
      children = '',
      title = '',
      ...rest
    },
    ref,
  ) => (
    <StyledCard ref={ref} sizeProp={size} {...rest} onClick={onClick}>
      <Box>
        {image && (
          <StyledImage>
            <Image width="100%" src={image} />
          </StyledImage>
        )}
        <StyledBody>
          <StyledTitle>{title}</StyledTitle>
          {children}
        </StyledBody>
      </Box>
    </StyledCard>
  ),
);

Card.displayName = 'Card';

let CardDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardDoc = require('./doc').doc(Card);
}
const CardWrapper = CardDoc || Card;

export { CardWrapper as Card };
