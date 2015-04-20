// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('imports?this=>window!modernizr');

if (! Modernizr.flexbox ||
  ! Modernizr.localstorage ||
  ! Modernizr.rgba ||
  ! Modernizr.draganddrop) {
  alert('Unfortunately, your browser appears to be too old. ' +
    'We recommend the latest version of Chrome, Firefox, Safari, or Internet Explorer. ' +
    'If you are using the latest Internet Explorer, you will need to turn off Compatibility Mode.');
}

var rootPath = '/docs/';
var theme = 'generic';

if (__THEME__.hpe) {
  require("!style!css!sass!index-hpe.scss");
  rootPath = '/docs/hpe/';
  theme = 'hpe';
} else {
  require("!style!css!sass!index.scss");
}

if ("/" === window.location.pathname) {
  rootPath = "/"; // webpack-dev-server
}

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var Label = require('grommet/components/Label');
var Footer = require('grommet/components/Footer');
var Home = require('./Home');
var DesignIcon = require('./img/Design');
var DevelopIcon = require('./img/Develop');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./documentation/Documentation');
var Downloads = require('./downloads/Downloads');
var RequestAccess = require('./RequestAccess');

var Docs = React.createClass({

  render: function() {

    return (
      <App className="docs">
        <Header primary={true} className="docs__header">
          <Title>
            <Link to="docs">
              <img src="img/grommet.svg" title="Grommet" />
              Grommet
            </Link>
          </Title>
          <Menu direction="left">
            <Link key="style-guide" to="style guide">
              <Label text="Style Guide" icon={<DesignIcon />} />
            </Link>
            <Link key="documentation" to="documentation">
              <Label text="Documentation" icon={<DevelopIcon />} />
            </Link>
            <Link key="downloads" to="downloads">
              <Label text="Downloads" />
            </Link>
            <Link key="request-access" to="request_access"
              className="button primary call-to-action docs__header-request-access">
              <Label text="Request access" />
            </Link>
          </Menu>
        </Header>
        <RouteHandler />
        <Footer className="docs__footer" primary={true} centered={true}>
          <img src="img/hpesm_sec_grn_pos_rgb.svg" alt="Hewlett Packard Enterprise logo" />
          <h3>Build your ideas!</h3>
          <div>
            This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
            <div>
              <Menu label="Theme" direction="up" small={true}>
                <a href="/docs/" className={theme === 'generic' ? 'active' : ''}>Grommet</a>
                <a href="/docs/hpe/" className={theme === 'hpe' ? 'active' : ''}>HPE</a>
              </Menu>
            </div>
          </div>
        </Footer>
      </App>
    );
  }

});

var routes = (
  <Route name="docs" path={rootPath} handler={Docs}>
    <Route name="home" path={rootPath} handler={Home}>
      <Route name="request_access" handler={RequestAccess} />
    </Route>
    {StyleGuide.routes()}
    {Documentation.routes()}
    <Route name="downloads" handler={Downloads} />
  </Route>
);

var router = Router.create({routes: routes, location: Router.HistoryLocation});

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('content');
  React.render(factory(), element);
  document.querySelectorAll('.docs')[0].scrollTop = 0;
});

document.body.classList.remove('loading');
