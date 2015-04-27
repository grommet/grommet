// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');

var LayerContainer = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    onClose: React.PropTypes.func,
    router: React.PropTypes.func.isRequired
  },

  childContextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [KeyboardAccelerators],

  _onClick: function (event) {
    if (this.props.onClose &&
      event.target === this.refs.background.getDOMNode()) {
      this.props.onClose();
    }
  },

  getChildContext: function () {
    return { router: this.props.router };
  },

  componentDidMount: function () {
    if (this.props.onClose) {
      this.startListeningToKeyboard({esc: this.props.onClose});
    }
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
      <div ref="background" className={classes.join(' ')} onClick={this._onClick}>
        <div className="layer__container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

var Layer = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    onClose: React.PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  mixins: [ReactLayeredComponent],

  getDefaultProps: function () {
    return {
      align: 'center'
    };
  },

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
