// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SpinningIcon = require('./icons/Spinning');
var LeftIcon = require('./icons/Left');
var RightIcon = require('./icons/Right');
var Scroll = require('../utils/Scroll');
var InfiniteScroll = require('../mixins/InfiniteScroll');

var CLASS_ROOT = "tiles";

var Tiles = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['row', 'column']),
    fill: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    onMore: React.PropTypes.func,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool
  },

  mixins: [InfiniteScroll],

  getDefaultProps: function () {
    return {
      flush: true,
      fill: false,
      small: false
    };
  },

  _onLeft: function () {
    var tiles = this.refs.tiles.getDOMNode();
    Scroll.scrollBy(tiles, 'scrollLeft', - tiles.offsetWidth);
  },

  _onRight: function () {
    var tiles = this.refs.tiles.getDOMNode();
    Scroll.scrollBy(tiles, 'scrollLeft', tiles.offsetWidth);
  },

  _onScrollHorizontal: function () {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._layout, 50);
  },

  _onWheel: function (event) {
    if (Math.abs(event.deltaX) > 100) {
      clearInterval(this._scrollTimer);
    } else if (event.deltaX > 5) {
      this._onRight();
    } else if (event.deltaX < -5) {
      this._onLeft();
    }
  },

  _layout: function () {
    if ('row' === this.props.direction) {
      // determine if we have more tiles than room to fit
      var tiles = this.refs.tiles.getDOMNode();
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
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  getInitialState: function () {
    return {overflow: false};
  },

  _trackHorizontalScroll: function () {
    if (this.state.overflow && ! this._tracking) {
      var tiles = this.refs.tiles.getDOMNode();
      tiles.addEventListener('scroll', this._onScrollHorizontal);
      this._tracking = true;
    }
  },

  componentDidMount: function () {
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
    if ('row' === this.props.direction) {
      window.addEventListener('resize', this._onResize);
      document.addEventListener('wheel', this._onWheel);
      this._trackHorizontalScroll();
      this._layout();
    }
  },

  componentDidUpdate: function () {
    this.stopListeningForScroll();
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
    if ('row' === this.props.direction) {
      this._trackHorizontalScroll();
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this.stopListeningForScroll();
    }
    if ('row' === this.props.direction) {
      window.removeEventListener('resize', this._onResize);
      document.removeEventListener('wheel', this._onWheel);
      if (this._tracking) {
        var tiles = this.refs.tiles.getDOMNode();
        tiles.removeEventListener('scroll', this._onScrollHorizontal);
      }
    }
  },

  // children should be an array of Tile
  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    } else if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.direction) {
      classes.push(CLASS_ROOT + "--direction-" + this.props.direction);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

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
      <div ref="tiles" className={classes.join(' ')}>
        {this.props.children}
        {more}
      </div>
    );

    if (this.state.overflow) {
      classes.push(CLASS_ROOT + "--overflowed");
      if (! this.state.overflowStart) {
        var left = (
          <div className={CLASS_ROOT + "__left"} onClick={this._onLeft}>
            <LeftIcon />
          </div>
        );
      }
      if (! this.state.overflowEnd) {
        var right = (
          <div className={CLASS_ROOT + "__right"} onClick={this._onRight}>
            <RightIcon />
          </div>
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

});

module.exports = Tiles;
