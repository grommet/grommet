// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
require("!style!css!highlight.js/styles/github.css");
//require("!style!css!sass!index.scss");
require("!style!css!sass!index-hpe.scss");
require('imports?this=>window!modernizr');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Ligo = require('ligo');
var Home = require('./Home');
var DesignIcon = require('./DesignIcon');
var DevelopIcon = require('./DevelopIcon');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./documentation/Documentation');
var Downloads = require('./downloads/Downloads');

var Docs = React.createClass({

  render: function() {
    var title = (<Link to="docs">ligo</Link>);
    var nav = [
      (<Link key="style-guide" to="style guide">
        <DesignIcon/>
        <span>Style Guide</span>
      </Link>),
      (<Link key="documentation" to="documentation">
        <DevelopIcon/>
        <span>Documentation</span>
      </Link>),
      (<Link key="downloads" to="downloads">
        <span>Downloads</span>
      </Link>)
    ];

    return (
      <Ligo.App>
        <Ligo.Header centerColumn={true} primary={true}>
          <Ligo.Title>{title}</Ligo.Title>
          <Ligo.Menu direction="left">{nav}</Ligo.Menu>
        </Ligo.Header>
        <RouteHandler />
        <Ligo.Footer centerColumn={true}>
          <img src="img/hpesm_pri_grn_pos_rgb.svg" alt="HPE logo" />
          <div>This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.</div>
        </Ligo.Footer>
      </Ligo.App>
    );
  }

});

var routes = (
  <Route name="docs" path="/" handler={Docs}>
    <DefaultRoute name="home" handler={Home} />
    {StyleGuide.routes()}
    {Documentation.routes()}
    <Route name="downloads" handler={Downloads} />
  </Route>
);

var router = Router.create({routes: routes}); //, location: Router.HistoryLocation});

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('content');
  React.render(factory(), element);
});

document.body.classList.remove('loading');
