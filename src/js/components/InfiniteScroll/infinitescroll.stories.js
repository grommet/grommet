import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Grid, Grommet, Box, Image, InfiniteScroll, Text } from 'grommet';
import { grommet } from 'grommet/themes';

const allItems = Array(2000)
  .fill()
  .map((_, i) => `item ${i + 1}`);

const SimpleInfiniteScroll = props => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => (
          <Box
            key={item}
            pad="medium"
            border={{ side: 'bottom' }}
            align="center"
          >
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

/* eslint-disable react/prefer-stateless-function */
class MyItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <Box pad="medium" border={{ side: 'bottom' }} align="center">
        <Text>{item}</Text>
      </Box>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

const ClassChildrenInfiniteScroll = props => (
  <Grommet theme={grommet}>
    <Box>
      <InfiniteScroll items={allItems} {...props}>
        {item => <MyItem key={item} item={item} />}
      </InfiniteScroll>
    </Box>
  </Grommet>
);

class LazyInfiniteScroll extends Component {
  state = { items: allItems.slice(0, 200) };

  onMore = () => {
    setTimeout(() => {
      const { items } = this.state;
      this.setState({ items: allItems.slice(0, items.length + 200) });
    }, 1000);
  };

  render() {
    const { items } = this.state;
    return (
      <Grommet theme={grommet}>
        <Box>
          <InfiniteScroll items={items} onMore={this.onMore}>
            {item => (
              <Box
                key={item}
                pad="medium"
                border={{ side: 'bottom' }}
                align="center"
              >
                <Text>{item}</Text>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
      </Grommet>
    );
  }
}

const GridInfiniteScroll = () => (
  <Grommet theme={grommet}>
    <Grid columns="xsmall" rows="small">
      <InfiniteScroll items={allItems} step={12}>
        {item => (
          <Box key={item} as="article" pad="xsmall">
            <Image src="https://via.placeholder.com/350x150" />
            <Text>{item}</Text>
          </Box>
        )}
      </InfiniteScroll>
    </Grid>
  </Grommet>
);

storiesOf('InfiniteScroll', module)
  .add('Simple', () => <SimpleInfiniteScroll />)
  .add('Show 118th item', () => <SimpleInfiniteScroll show={117} />)
  .add('Marker', () => (
    <SimpleInfiniteScroll
      renderMarker={marker => (
        <Box pad="medium" background="accent-1">
          {marker}
        </Box>
      )}
    />
  ))
  .add('Replace', () => <SimpleInfiniteScroll replace />)
  .add('onMore', () => <LazyInfiniteScroll />)
  .add('Class Children', () => <ClassChildrenInfiniteScroll />)
  .add('Grid', () => <GridInfiniteScroll />);
