// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Documents = require('Documents');
var TBD = Documents.TBD;
var HelloWorld = require('./HelloWorld');
var DocumentFooter = require('DocumentFooter');

var Documentation = React.createClass({

  render: function() {

    var nav = (
      <div className={"documentation__nav"}>
        <div className={"documentation__nav-items"}>
          <div className={"documentation__nav-item"}>
            <Link to="helloworld">Hello World</Link>
          </div>
          <div className={"documentation__nav-item"}>
            <Link to="getstarted">Get Started</Link>
          </div>
          <div className={"documentation__nav-item"}>
            <Link to="reference">Reference</Link>
          </div>
          <div className={"documentation__nav-item"}>
            <Link to="architecture">Architecture</Link>
          </div>
        </div>
      </div>
    );
    
    return (
      <div className="documentation">
        {nav}
        <RouteHandler />
        <DocumentFooter />
      </div>
    );
  }
});

Documentation.routes = function () {
  return (
    <Route name="documentation" handler={Documentation}>
      <DefaultRoute name="helloworld" handler={HelloWorld} />
      <Route name="getstarted" handler={TBD} />
      <Route name="reference" handler={TBD} />
      <Route name="architecture" handler={TBD} />
    </Route>
  );
};

module.exports = Documentation;
