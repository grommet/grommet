// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('../utils/Router');

var Link = React.createClass({

  _onClick: function (event) {
    event.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    Router.transitionTo(event.currentTarget.getAttribute('href'));
  },

  render: function() {
    return (
      <a className={this.props.className} href={this.props.href} onClick={this._onClick}>
        {this.props.children}
      </a>
    );
  }

});

module.exports = Link;
