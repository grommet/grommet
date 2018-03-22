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

  increaseOffset = () => this.setState({ count: this.state.count + 1 },
    () => this.props.onMore && this.props.onMore())

  render() {
    const { count } = this.state;
    const { children, items, step } = this.props;
    const displayCount = step * count;
    const waypointAt = displayCount - (step / 2);
    return (
      items
        .slice(0, displayCount)
        .map((item, index) => [
          children(item, index),
          (index === waypointAt && (
            <Waypoint
              key='waypoint-trigger'
              onEnter={this.increaseOffset}
            />
          )),
        ])
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(InfiniteScroll);
}
