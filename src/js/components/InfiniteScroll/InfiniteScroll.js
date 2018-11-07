import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import Waypoint from 'react-waypoint';

class InfiniteScroll extends PureComponent {
  static defaultProps = {
    items: [],
    step: 50,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { show, step } = nextProps;
    if (!prevState.count || (show && show < step * prevState.count)) {
      let count = prevState.count || 1;
      if (show && show > step * count) {
        count = (show + step) / step;
      }
      return { count };
    }
    return null;
  }

  state = {};

  showRef = React.createRef();

  initialScroll = false;

  componentDidMount() {
    this.scrollShow();
  }

  componentDidUpdate() {
    this.scrollShow();
  }

  scrollShow = () => {
    /* eslint-disable-next-line react/prop-types */
    const { show } = this.props;
    if (show && !this.initialScroll && this.showRef.current) {
      this.initialScroll = true;
      // on initial render, scroll to any 'show'
      /* eslint-disable react/no-find-dom-node */
      const element = findDOMNode(this.showRef.current);
      element.scrollIntoView();
    }
  };

  increaseOffset = () => {
    /* eslint-disable-next-line react/prop-types */
    const { items, onMore, step } = this.props;
    const { count } = this.state;
    this.setState(
      { count: count + 1 },
      // call onMore if we've reached the end of the items
      () => onMore && (count + 1) * step >= items.length && onMore(),
    );
  };

  render() {
    const {
      /* eslint-disable-next-line react/prop-types */
      children,
      items,
      renderMarker,
      scrollableAncestor,
      show,
      step,
    } = this.props;
    const { count } = this.state;
    const displayCount = step * count;
    const waypointAt = displayCount - step / 2;

    let marker = (
      <Waypoint
        key="marker"
        onEnter={this.increaseOffset}
        bottomOffsetX="-96px"
        scrollableAncestor={scrollableAncestor}
      />
    );
    if (renderMarker) {
      // need to give it a key
      marker = React.cloneElement(renderMarker(marker), { key: 'marker' });
    }

    return items.slice(0, displayCount).map((item, index) => {
      let child = children(item, index);
      if (show && show === index) {
        child = React.cloneElement(child, { key: 'show', ref: this.showRef });
      }
      if (index === waypointAt) {
        return [child, marker];
      }
      return child;
    });
  }
}

let InfiniteScrollDoc;
if (process.env.NODE_ENV !== 'production') {
  InfiniteScrollDoc = require('./doc').doc(InfiniteScroll); // eslint-disable-line global-require
}
const InfiniteScrollWrapper = InfiniteScrollDoc || InfiniteScroll;

export { InfiniteScrollWrapper as InfiniteScroll };
