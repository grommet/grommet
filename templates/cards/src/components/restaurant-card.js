import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import styled, { css } from 'styled-components';
import {
  Box,
  Button,
  Collapsible,
  Image,
  Heading,
  Paragraph,
  Text,
  ThemeContext,
} from 'grommet';

import { Favorite } from 'grommet-icons';

import { Rating } from '.';

const filledIcon = css`
  path[fill='none'] {
    fill: ${props => props.theme.colors['dark-4']};
  }
`;

const CardFavorite = styled(Favorite)`
  ${props => (props.checked ? filledIcon : '')}
`;

// notice that this is not named Card.
// it is not generic. it is a card that works well for restaurant reviews
// the implementation is quite simple, so converting this to anything else is really easy
class RestaurantCard extends Component {
  state = {
    showReviews: false,
  };

  renderCardHeader = () => {
    const { restaurant } = this.props;
    let totalRating;
    const hasReviews = restaurant.reviews && restaurant.reviews.length;
    if (hasReviews) {
      totalRating =
        Math.round(
          (restaurant.reviews.reduce(
            (rating, review) => rating + review.rating,
            0,
          ) /
            restaurant.reviews.length) *
            100,
        ) / 100;
    }
    return (
      <Box pad={{ horizontal: 'small' }}>
        <Box
          margin={{ top: 'small' }}
          direction="row"
          align="center"
          justify="between"
        >
          <Box>
            <Heading level="3" margin="none">
              {restaurant.name}
            </Heading>
            <Text color="dark-5" size="small">
              {restaurant.cusine} &#8226; {restaurant.price}
            </Text>
          </Box>
          {totalRating ? (
            <Box align="end" justify="between" gap="xsmall">
              <Rating value={totalRating} />
              <Text color="dark-5" size="xsmall">
                {totalRating} {`(${restaurant.reviews.length})`}
              </Text>
            </Box>
          ) : (
            <Box
              round="xsmall"
              pad={{ vertical: 'xxsmall', horizontal: 'medium' }}
              background="brand"
            >
              <Text size="xsmall">NEW</Text>
            </Box>
          )}
        </Box>
        <Text
          size="small"
          color="dark-5"
          margin={{ vertical: 'small' }}
          truncate
        >
          {restaurant.description}
        </Text>
      </Box>
    );
  };

  renderCardFooter = () => {
    const { onClickFavorite, restaurant } = this.props;
    const hasReviews = restaurant.reviews && restaurant.reviews.length;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Box
            tag="footer"
            direction="row"
            align="center"
            justify="between"
            pad={{ left: 'small', vertical: 'small' }}
          >
            {hasReviews ? (
              <Button
                a11yTitle={`Reviews for ${restaurant.name}`}
                onClick={() =>
                  this.setState({ showReviews: !this.state.showReviews })
                }
              >
                <Box round="small">
                  <Text color="brand" size="small">
                    <strong>REVIEWS</strong>
                  </Text>
                </Box>
              </Button>
            ) : (
              <span />
            )}
            {onClickFavorite && (
              <Button
                margin={{ right: 'small' }}
                a11yTitle={`Favorite ${restaurant.name}`}
                onClick={onClickFavorite}
              >
                <Box>
                  <CardFavorite checked={restaurant.favorite} />
                </Box>
              </Button>
            )}
          </Box>
        )}
      </ThemeContext.Consumer>
    );
  };

  renderRestaurantReviews = () => {
    const { restaurant } = this.props;
    const { showReviews } = this.state;
    return (
      <Collapsible open={showReviews}>
        <Box
          style={{ maxHeight: '240px' }}
          border="top"
          overflow="auto"
          pad="small"
        >
          {restaurant.reviews.map(({ comment, name, rating, date }) => (
            <Box key={`${name}_${date}`} flex={false}>
              <Heading level="4" margin="none">
                {name}
              </Heading>
              <Text size="small" color="dark-5">
                <TimeAgo date={date} />
              </Text>
              <Rating value={rating} size="small" margin={{ top: 'small' }} />
              <Paragraph size="small">{comment}</Paragraph>
            </Box>
          ))}
        </Box>
      </Collapsible>
    );
  };

  render() {
    const { restaurant = {}, onClickFavorite, ...rest } = this.props;
    const hasReviews = restaurant.reviews && restaurant.reviews.length;
    return (
      <Box round="xxsmall" elevation="small" overflow="hidden" {...rest}>
        <Box height="small">
          <Image src={restaurant.image} fit="cover" />
        </Box>
        {this.renderCardHeader()}
        {hasReviews && this.renderRestaurantReviews()}

        {(hasReviews || onClickFavorite) && this.renderCardFooter()}
      </Box>
    );
  }
}

export { RestaurantCard };
