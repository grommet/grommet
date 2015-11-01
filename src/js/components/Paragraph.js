// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var React = require('react');

var CLASS_ROOT = "paragraph";

var Paragraph = React.createClass({

  propTypes: {
    size: React.PropTypes.oneOf(['small', 'medium', 'large'])
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.size) {
      classes.push(CLASS_ROOT + "--" + this.props.size);
    }

    return (
      <p id={this.props.id} className={classes.join(' ')}>
        {this.props.children}
      </p>
    );
  }

});

module.exports = Paragraph;
