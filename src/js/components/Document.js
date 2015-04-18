// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var GrommetDocument = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.number
  },

  render: function() {
    var classes = ["document"];
    if (this.props.colorIndex) {
      classes.push("header-color-index-" + this.props.colorIndex);
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        <div className="document__content">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = GrommetDocument;
