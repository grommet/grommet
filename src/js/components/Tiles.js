// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SpinningIcon = require('./icons/Spinning');
var InfiniteScroll = require('../mixins/InfiniteScroll');

var CLASS_ROOT = "tiles";

var Tiles = React.createClass({

  propTypes: {
    fill: React.PropTypes.bool,
    flush: React.PropTypes.bool,
    onMore: React.PropTypes.func,
    small: React.PropTypes.bool
  },

  mixins: [InfiniteScroll],

  getDefaultProps: function () {
    return {flush: true, fill: false, small: false};
  },

  componentDidMount: function () {
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
  },

  componentDidUpdate: function () {
    this.stopListeningForScroll();
    if (this.props.onMore) {
      this.startListeningForScroll(this.refs.more.getDOMNode(), this.props.onMore);
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this.stopListeningForScroll();
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
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
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

    return (
      <div ref="tiles" className={classes.join(' ')}>
        {this.props.children}
        {more}
      </div>
    );
  }

});

module.exports = Tiles;
