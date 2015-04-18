// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');

// Create an intermediary component to transfer the router context across
// TODO: Explore moving this to ReactLayeredComponent
var DialogContainer = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    router: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getChildContext: function () {
    return { router: this.props.router };
  },

  render: function () {
    var classes = ["dialog"];
    if (this.props.compact) {
      classes.push("dialog--compact");
    }
    return (
      <div className={classes.join(' ')}>
        <div className="dialog__container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var Dialog = React.createClass({

  mixins: [ReactLayeredComponent],

  propTypes: {
    compact: React.PropTypes.bool
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function () {
    return (<span></span>);
  },

  renderLayer: function () {
    return (
      <DialogContainer
        children={this.props.children}
        compact={this.props.compact}
        router={this.context.router} />
    );
  }

});

module.exports = Dialog;
