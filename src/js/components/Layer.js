// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');

var LayerContainer = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    onClose: React.PropTypes.func.isRequired,
    router: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    router: React.PropTypes.func.isRequired
  },

  getChildContext: function () {
    return { router: this.props.router };
  },

  render: function () {
    var classes = ["layer"];
    if (this.props.align) {
      classes.push("layer--align-" + this.props.align);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div className={classes.join(' ')} onClick={this.props.onClose}>
        <div className="layer__container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var Layer = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    onClose: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [ReactLayeredComponent],

  render: function () {
    return (<span></span>);
  },

  renderLayer: function () {
    return (
      <LayerContainer
        align={this.props.align}
        children={this.props.children}
        className={this.props.className}
        onClose={this.props.onClose}
        router={this.context.router} />
    );
  }

});

module.exports = Layer;
