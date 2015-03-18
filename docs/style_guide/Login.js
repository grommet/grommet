// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Navigation = require('react-router').Navigation;
var Details = require('Details');
var html = require("html!./Login.html");

var Login = React.createClass({

  mixins: [Navigation],

  _onClose: function () {
    this.transitionTo('patterns');
  },

  getInitialState: function () {
    // strip <html> and <body>
    var lines = html.split("\n");
    return {html: lines.slice(3, lines.length-2).join("\n")};
  },

  render: function() {
    return (
      <Details onClose={this._onClose}>
        <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
      </Details>
    );
  }

});

module.exports = Login;
