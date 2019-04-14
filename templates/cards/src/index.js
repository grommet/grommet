import React, { Component } from 'react';
import { render } from 'react-dom';

import { grommet, Grid, Grommet, ResponsiveContext } from 'grommet';

import { RestaurantCard } from './components';

const allRestaurants = [
  {
    name: 'Cafe Brazil',
    image:
      'https://uploads.codesandbox.io/uploads/user/5cb9a0d4-583b-4f51-aaa5-feb80db2b623/HlXm-restaurant_1.jpg',
    cusine: 'Brazilian',
    price: '$$$',
    description:
      'Best restaurant in town serving all you can eat brazilian moqueca.',
    reviews: [
      {
        name: 'Eric Soderberg',
        rating: 4.8,
        date: new Date('11/18/2018'),
        comment:
          'Almost perfect. Loved the food but did not get any Grommet swags.',
      },
      {
        name: 'Alan Souza',
        rating: 5,
        date: new Date('11/17/2018'),
        comment: "I'm the owner so I love it.",
      },
      {
        name: 'Chris Carlozzi',
        rating: 4.0,
        date: new Date('11/10/2018'),
        comment:
          'I like the food, but the design of the space can be improved.',
      },
      {
        name: 'Bryan Jacquot',
        rating: 2.1,
        date: new Date('08/09/2018'),
        comment: 'Does not have delivery in Fort Collins.',
      },
    ],
  },
  {
    name: 'Cafe Italia',
    image:
      'https://uploads.codesandbox.io/uploads/user/5cb9a0d4-583b-4f51-aaa5-feb80db2b623/dobe-restaurant_2.jpg',
    cusine: 'Italian',
    price: '$$',
    description: 'Pastas and pizzas from chef Lozzi.',
    reviews: [
      {
        name: 'Eric Soderberg',
        rating: 3.8,
        date: new Date('11/18/2018'),
        comment:
          'Almost perfect. Loved the food but did not get any Grommet swags.',
      },
      {
        name: 'Alan Souza',
        rating: 2.4,
        date: new Date('11/17/2018'),
        comment:
          'I like the food, but the design of the space can be improved.',
      },
      {
        name: 'Chris Carlozzi',
        rating: 5.0,
        date: new Date('11/10/2018'),
        comment: "I'm the owner so I love it.",
      },
      {
        name: 'Bryan Jacquot',
        rating: 2.1,
        date: new Date('08/09/2018'),
        comment: 'Does not have delivery in Fort Collins.',
      },
    ],
  },
  {
    name: 'Persian Lovers',
    image:
      'https://uploads.codesandbox.io/uploads/user/5cb9a0d4-583b-4f51-aaa5-feb80db2b623/YYMu-restaurant_3.jpg',
    cusine: 'Mediterranean',
    price: '$$$$',
    description: 'Michelin 3-star serving the bay area since 1999.',
    reviews: [
      {
        name: 'Eric Soderberg',
        rating: 4.8,
        date: new Date('11/18/2018'),
        comment: 'Really expensive but worth it.',
      },
      {
        name: 'Alan Souza',
        rating: 4.4,
        date: new Date('11/17/2018'),
        comment:
          'I like the food, but the design of the space can be improved.',
      },
      {
        name: 'Chris Carlozzi',
        rating: 4.0,
        date: new Date('11/10/2018'),
        comment: 'Yeah it works...',
      },
      {
        name: 'Bryan Jacquot',
        rating: 5.0,
        date: new Date('08/09/2018'),
        comment: 'Super tasty tacos.',
      },
    ],
  },
  {
    name: 'Cali Bites',
    image:
      'https://uploads.codesandbox.io/uploads/user/5cb9a0d4-583b-4f51-aaa5-feb80db2b623/4_WW-restaurant_4.jpg',
    cusine: 'Mexican Fusion',
    price: '$$',
    description: 'Tapas and tacos.',
  },
];

class App extends Component {
  state = {
    restaurants: [...allRestaurants],
  };

  updateFavorite = index => {
    const { restaurants } = this.state;
    const newRestaurants = [...restaurants];

    newRestaurants[index].favorite = !newRestaurants[index].favorite;
    this.setState({ restaurants: newRestaurants });
  };

  render() {
    const { restaurants } = this.state;
    return (
      <Grommet theme={grommet}>
        <ResponsiveContext.Consumer>
          {size => (
            <Grid
              align="start"
              columns={size !== 'small' && { count: 'fill', size: 'medium' }}
              gap="medium"
            >
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.name}
                  restaurant={restaurant}
                  onClickFavorite={() => this.updateFavorite(index)}
                />
              ))}
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

render(<App />, document.getElementById('app'));
