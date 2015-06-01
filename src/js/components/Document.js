// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "document";

var GrommetDocument = React.createClass({

  propTypes: {
    colorIndex: React.PropTypes.string,
    flush: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      flush: true
    };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.colorIndex) {
      classes.push("header-color-index-" + this.props.colorIndex);
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__content"}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = GrommetDocument;
