var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Logo = require('./img/Logo');
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

    var hpeThemeClasses = __THEME__.hpe ? 'active' : '';
    var genericThemeClasses = !__THEME__.hpe ? 'active' : '';

    return (
      <App className="docs">
        <Header primary={true} className="docs__header">
          <Title>
            <Link to="docs">
              <Logo />
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
      <Route name="request_access" handler={RequestAccess} />
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
  document.querySelectorAll('.docs')[0].scrollTop = 0;
});

document.body.classList.remove('loading');
