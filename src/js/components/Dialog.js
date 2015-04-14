// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');

var Dialog = React.createClass({

  mixins: [ReactLayeredComponent],

  render: function () {
    return (<span></span>);
  },

  renderLayer: function() {
    return (
      <div className="dialog">
        <div className="dialog__container">
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Dialog;
