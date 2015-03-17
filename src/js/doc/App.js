// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./Header');

var App = React.createClass({

  render: function() {
    var classes = ['app'];
    return (
      <div className={classes.join(' ')}>
        <Header/>
        <div className={"app__content"}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
