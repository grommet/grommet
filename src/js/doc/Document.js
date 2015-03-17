// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./Header');

var Document = React.createClass({

  propTypes: {
    menuConfig: React.PropTypes.array.isRequired
  },

  render: function() {
    var classes = ['document'];
    return (
      <div className={classes.join(' ')}>
        <Header menuConfig={this.props.menuConfig} />
        <div className={"document__content"}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Document;
