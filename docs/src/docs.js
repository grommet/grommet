require('imports?this=>window!modernizr');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var LigoApp = require('ligo/components/App');
var LigoHeader = require('ligo/components/Header');
var LigoTitle = require('ligo/components/Title');
var LigoMenu = require('ligo/components/Menu');
var LigoLabel = require('ligo/components/Label');
var LigoFooter = require('ligo/components/Footer');
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

    var title = (<Link to="docs">ligo</Link>);
    var nav = [
      (<Link key="style-guide" to="style guide">
        <LigoLabel text="Style Guide" icon={<DesignIcon />} />
      </Link>),
      (<Link key="documentation" to="documentation">
        <LigoLabel text="Documentation" icon={<DevelopIcon />} />
      </Link>),
      (<Link key="downloads" to="downloads">
        <LigoLabel text="Downloads" />
      </Link>)
    ];

    return (
      <LigoApp>
        <LigoHeader centerColumn={true} primary={true}>
          <LigoTitle>{title}</LigoTitle>
          <LigoMenu direction="left">{nav}</LigoMenu>
        </LigoHeader>
        <RouteHandler />
        <LigoFooter centerColumn={true} primary={true}>
          <img src="img/hpesm_pri_grn_pos_rgb.svg" alt="HPE logo" />
          <div>
            This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
            <div>
              <LigoMenu label="Theme" direction="up" small={true}>
                <a href="/docs/" className={genericThemeClasses}>Ligo</a>
                <a href="/docs/hpe/" className={hpeThemeClasses}>HPE</a>
              </LigoMenu>
            </div>
          </div>
        </LigoFooter>
      </LigoApp>
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