// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

var Panel = React.createClass({

  propTypes: {
    direction: React.PropTypes.string,
    index: React.PropTypes.number
  },

  render: function() {
    var classes = ["panel"];
    if (this.props.direction === 'horizontal') {
      classes.push("panel--horizontal");
    }
    if (this.props.index) {
      classes.push("panel--index-" + this.props.index);
    }

    var title = null;
    if (this.props.title) {
      title = (<h2 className="panel__title">{this.props.title}</h2>);
    }

    return (
      <div className={classes.join(' ')}>
        {title}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Panel;
