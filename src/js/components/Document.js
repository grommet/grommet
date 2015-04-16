// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var LigoDocument = React.createClass({

  propTypes: {
    centerColumn: React.PropTypes.bool,
    colorIndex: React.PropTypes.number
  },

  render: function() {
    var classes = ["document"];
    var contentClasses = ["document__content"];
    if (this.props.centerColumn) {
      classes.push("center-column");
      contentClasses.push("center-column__content");
    }
    if (this.props.colorIndex) {
      classes.push("header-color-index-" + this.props.colorIndex);
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        <div className={contentClasses.join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = LigoDocument;
