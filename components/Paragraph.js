// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');

var CLASS_ROOT = "paragraph";

var Paragraph = React.createClass({
  displayName: 'Paragraph',

  propTypes: {
    size: React.PropTypes.oneOf(['small', 'medium', 'large'])
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }

    return React.createElement(
      'p',
      { id: this.props.id, className: classes.join(' ') },
      this.props.children
    );
  }

});

module.exports = Paragraph;