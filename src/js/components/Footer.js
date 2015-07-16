// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var pick = require('lodash/object/pick');
var keys = require('lodash/object/keys');
var Box = require('./Box');
var SkipLinkAnchor = require('./SkipLinkAnchor');

var CLASS_ROOT = "footer";

var Footer = React.createClass({

  propTypes: merge({
    large: React.PropTypes.bool,
    small: React.PropTypes.bool
  }, Box.propTypes),

  getDefaultProps: function () {
    return {
      pad: 'none',
      direction: 'row',
      responsive: false
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    var other = pick(this.props, keys(Box.propTypes));
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <Box tag="footer" {...other} className={classes.join(' ')}>
        <SkipLinkAnchor label="Footer" />
        {this.props.children}
      </Box>
    );
  }

});

module.exports = Footer;
