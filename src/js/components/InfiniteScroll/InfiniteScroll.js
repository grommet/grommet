import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

import doc from './doc';

export default class InfiniteScroll extends Component {
  static defaultProps = {
    items: [],
    step: 50,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { count: 1 };
  }

  increaseOffset = () => {
    const { items, onMore, step } = this.props;
    const { count } = this.state;
    this.setState({ count: count + 1 },
      // call onMore if we've reached the end of the items
      () => (onMore && ((count + 1) * step) >= items.length && onMore()));
  }

  render() {
    const { children, items, renderMarker, step } = this.props;
    const { count } = this.state;
    const displayCount = step * count;
    const waypointAt = displayCount - (step / 2);

    let marker = (
      <Waypoint
        key='marker'
        onEnter={this.increaseOffset}
        bottomOffsetX='-96px'
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: 'marker' });
    }

    return (
      items
        .slice(0, displayCount)
        .map((item, index) => [
          children(item, index),
          (index === waypointAt && marker),
        ])
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(InfiniteScroll);
}
