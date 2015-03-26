// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var html = require("html!./Login.html");

var Login = React.createClass({

  getInitialState: function () {
    // strip <html> and <body>
    var lines = html.split("\n");
    return {html: lines.slice(3, lines.length-2).join("\n")};
  },

  render: function() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
    );
  }

});

module.exports = Login;
