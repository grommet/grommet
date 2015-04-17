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

var Docs = React.createClass({

  render: function() {

    var hpeThemeClasses = __THEME__.hpe ? 'active' : '';
    var genericThemeClasses = !__THEME__.hpe ? 'active' : '';

    var title = (<Link to="docs">Grommet</Link>);
    var nav = [
      (<Link key="style-guide" to="style guide">
        <Label text="Style Guide" icon={<DesignIcon />} />
      </Link>),
      (<Link key="documentation" to="documentation">
        <Label text="Documentation" icon={<DevelopIcon />} />
      </Link>),
      (<Link key="downloads" to="downloads">
        <Label text="Downloads" />
      </Link>)
    ];

    return (
      <App>
        <Header centerColumn={true} primary={true}>
          <Title>{title}</Title>
          <Menu direction="left">{nav}</Menu>
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
