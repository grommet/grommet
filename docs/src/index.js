// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
require("!style!css!sass!index.scss");
require('imports?this=>window!modernizr');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Documents = require('Documents');
var Site = Documents.Site;
var SiteHeader = Documents.SiteHeader;
var SiteFooter = Documents.SiteFooter;
var Home = require('./Home');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./Documentation');
var Downloads = require('./downloads/Downloads');

var Docs = React.createClass({

  render: function() {
    var title = (<Link to="docs">ligo</Link>);
    var nav = [
      (<Link key="style-guide" to="style guide">Style Guide</Link>),
      (<Link key="documentation" to="documentation">Documentation</Link>),
      (<Link key="downloads" to="downloads" className="hide-palm">Downloads</Link>)
    ];

    return (
      <Site>
        <SiteHeader title={title} nav={nav} />
        <RouteHandler />
        <SiteFooter>
          &copy; 2015 Ligo Application Style Guide
        </SiteFooter>
      </Site>
    );
  }

});

var routes = (
  <Route name="docs" path="/" handler={Docs}>
    {StyleGuide.routes()}
    {Documentation.routes()}
    <Route name="downloads" handler={Downloads} />
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

var router = Router.create({routes: routes});

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('docs');
  React.render(factory(), element);
});
