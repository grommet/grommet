// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var App = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    centered: React.PropTypes.bool,
  },

  getDefaultProps: function () {
    return {
      centered: true
    };
  },

  render: function() {
    var classes = ["app"];
    if (this.props.centered) {
      classes.push("app--centered");
    }
    if (this.props.inline) {
      classes.push("app--inline");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    //remove this when React 0.14 is released. This is required because context props are not being propagated to children.
    var bodyComponent = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, this.getChildContext());
    }.bind(this));

    return (
      <div className={classes.join(' ')}>
        {bodyComponent}
      </div>
    );
  }
});

module.exports = App;
