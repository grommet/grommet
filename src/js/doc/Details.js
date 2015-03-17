// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
var RouterState = require('react-router').State;
var Close = require('./Close');

var Details = React.createClass({

  mixins: [RouterState],

  render: function() {
    var routes = this.getRoutes();
    var parentRoute = routes[routes.length - 2].name;
    return (
      <div className={"details"}>
        <div className={"details__header"}>
          <Link to={parentRoute} className={"details__close"}>
            <Close />
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }

});

module.exports = Details;
