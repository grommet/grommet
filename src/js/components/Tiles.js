// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import pick from 'lodash/object/pick';
import keys from 'lodash/object/keys';
import Box from './Box';
import Button from './Button';
import SpinningIcon from './icons/Spinning';
import LeftIcon from './icons/base/LinkPrevious';
import RightIcon from './icons/base/LinkNext';
import Scroll from '../utils/Scroll';
import InfiniteScroll from '../utils/InfiniteScroll';

const CLASS_ROOT = "tiles";

class Tiles extends Component {

  constructor () {
    super();
    this._onLeft = this._onLeft.bind(this);
    this._onRight = this._onRight.bind(this);
    this._onScrollHorizontal = this._onScrollHorizontal.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onResize = this._onResize.bind(this);
    this._layout = this._layout.bind(this);

    this.state = { overflow: false };
  }

  componentDidMount () {
    if (this.props.onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
    if ('row' === this.props.direction) {
      window.addEventListener('resize', this._onResize);
      document.addEventListener('wheel', this._onWheel);
      this._trackHorizontalScroll();
      this._layout();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = null;
    }
  }

  componentDidUpdate () {
    if (this.props.onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(this.refs.more, this.props.onMore);
    }
    if ('row' === this.props.direction) {
      this._trackHorizontalScroll();
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
    if ('row' === this.props.direction) {
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('wheel', this._onWheel);
      if (this._tracking) {
        var tiles = ReactDOM.findDOMNode(this.refs.tiles);
        tiles.removeEventListener('scroll', this._onScrollHorizontal);
      }
    }
  }

  _onLeft () {
    var tiles = ReactDOM.findDOMNode(this.refs.tiles);
    Scroll.scrollBy(tiles, 'scrollLeft', - tiles.offsetWidth);
  }

  _onRight () {
    var tiles = ReactDOM.findDOMNode(this.refs.tiles);
    Scroll.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
  }

  _onScrollHorizontal () {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._layout, 50);
  }

  _onWheel (event) {
    if (Math.abs(event.deltaX) > 100) {
      clearInterval(this._scrollTimer);
    } else if (event.deltaX > 5) {
      this._onRight();
    } else if (event.deltaX < -5) {
      this._onLeft();
    }
  }

  _layout () {
    if ('row' === this.props.direction) {
      // determine if we have more tiles than room to fit
      var tiles = ReactDOM.findDOMNode(this.refs.tiles);
      // 20 is to allow some fuzziness as scrollbars come and go
      this.setState({
        overflow: (tiles.scrollWidth > (tiles.offsetWidth + 20)),
        overflowStart: (tiles.scrollLeft <= 20),
        overflowEnd: (tiles.scrollLeft >= (tiles.scrollWidth - tiles.offsetWidth))
      });

      // mark any tiles that might be clipped
      var rect = tiles.getBoundingClientRect();
      var children = tiles.querySelectorAll('.tile');
      for (var i = 0; i < children.length; i += 1) {
        var child = children[i];
        var childRect = child.getBoundingClientRect();
        // 12 accounts for padding
        if ((childRect.left + 12) < rect.left ||
          (childRect.right - 12) > rect.right) {
          child.classList.add('tile--eclipsed');
        } else {
          child.classList.remove('tile--eclipsed');
        }
      }
    }
  }

  _onResize () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  }

  _trackHorizontalScroll () {
    if (this.state.overflow && ! this._tracking) {
      var tiles = ReactDOM.findDOMNode(this.refs.tiles);
      tiles.addEventListener('scroll', this._onScrollHorizontal);
      this._tracking = true;
    }
  }

  // children should be an array of Tile
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var other = pick(this.props, keys(Box.propTypes));

    var more = null;
    if (this.props.onMore) {
      classes.push(CLASS_ROOT + "--moreable");
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </div>
      );
    }

    var contents = (
      <Box ref="tiles" {...other}
        wrap={this.props.direction ? false : true}
        direction={this.props.direction ? this.props.direction : 'row'}
        className={classes.join(' ')}>
        {this.props.children}
        {more}
      </Box>
    );

    if (this.state.overflow) {
      classes.push(CLASS_ROOT + "--overflowed");
      if (! this.state.overflowStart) {
        var left = (
          <Button className={CLASS_ROOT + "__left"} type="icon"
            onClick={this._onLeft}>
            <LeftIcon />
          </Button>
        );
      }
      if (! this.state.overflowEnd) {
        var right = (
          <Button className={CLASS_ROOT + "__right"} type="icon"
            onClick={this._onRight}>
            <RightIcon />
          </Button>
        );
      }

      contents = (
        <div className={CLASS_ROOT + "__container"}>
          {left}
          {contents}
          {right}
        </div>
      );
    }

    return contents;
  }

}

Tiles.propTypes = {
  fill: PropTypes.bool,
  flush: PropTypes.bool,
  onMore: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Tiles.defaultProps = {
  flush: true,
  justify: 'start'
};

module.exports = Tiles;
