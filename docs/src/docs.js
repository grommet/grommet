var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var Label = require('grommet/components/Label');
var Footer = require('grommet/components/Footer');
var Home = require('./Home');
var DesignIcon = require('./DesignIcon');
var DevelopIcon = require('./DevelopIcon');
var StyleGuide = require('./style_guide/StyleGuide');
var Documentation = require('./documentation/Documentation');
var Downloads = require('./downloads/Downloads');
var RequestAccess = require('./RequestAccess');

var Docs = React.createClass({

  render: function() {

    var hpeThemeClasses = __THEME__.hpe ? 'active' : '';
    var genericThemeClasses = !__THEME__.hpe ? 'active' : '';

    return (
      <App>
        <Header centerColumn={true} primary={true}>
          <Title><Link to="docs">Grommet</Link></Title>
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
            <Link key="request-access" to="request access"
              className="button primary call-to-action">
              <Label text="Request access" />
            </Link>
          </Menu>
        </Header>
        <RouteHandler />
        <Footer centerColumn={true} primary={true}>
          <img src="img/hpesm_pri_grn_pos_rgb.svg" alt="HPE logo" />
          <div>
            This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
            <div>
              <Menu label="Theme" direction="up" small={true}>
                <a href="/docs/" className={genericThemeClasses}>Grommet</a>
                <a href="/docs/hpe/" className={hpeThemeClasses}>HPE</a>
              </Menu>
            </div>
          </div>
        </Footer>
      </App>
    );
  }

});

var routes = (
  <Route name="docs" path="/" handler={Docs}>
    <Route name="home" path="/" handler={Home}>
      <Route name="request access" handler={RequestAccess} />
    </Route>
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
