// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Article = require('grommet/components/Article');
var DocsHeader = require('../DocsHeader');
var Section = require('grommet/components/Section');
var DocsSplit = require('../DocsSplit');
var DocsMenu = require('../DocsMenu');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');

//var Introduction = require('./Introduction');
var Philosophy = require('./Philosophy');
var Basics = require('./Basics');
var Patterns = require('./Patterns');
var Showcase = require('./Showcase');
var Login = require('./patterns/Login');
var TBD = require('grommet/components/TBD');
var Resources = require('./Resources');

var CONTENTS = [
  //{route: "design_introduction", label: 'Introduction', component: Introduction},
  {route: "design_philosophy", label: 'Philosophy', component: Philosophy,
    contents: [
      {label: 'Best Practices', id: 'best-practices'},
      {label: 'Usability', id: 'usability'},
      {label: 'Interactions', id: 'interactions'},
      {label: 'Mobile', id: 'mobile'},
      {label: 'Accessibility', id: 'accessibility'}
    ]},
  {route: "design_basics", label: 'Basics', component: Basics,
    contents: [
      {label: 'Color', id: 'color'},
      {label: 'Text', id: 'text'},
      {label: 'Typography', id: 'typography'},
      {label: 'Writing Style', id: 'writing-style'},
      {label: 'Date and Time', id: 'date-time'},
      {label: 'Capitalization', id: 'capitalization'},
      {label: 'Icons', id: 'icons'}
    ]},
  {route: "design_patterns", label: 'Patterns', component: Patterns,
    contents: [
      {route: "design_login", label: 'Login', component: Login},
      {route: "design_header", label: 'Header', component: TBD},
      {route: "design_dashboard", label: 'Dashboard', component: TBD},
      {route: "design_search", label: 'Search', component: TBD}
    ]
  },
  {route: "design_showcase", label: 'Showcase', component: Showcase,
    contents: [
      {id: "hpsw-analytics", label: 'Analytics'},
      {id: "hpsw-big-data", label: 'Big Data'},
      {id: "hpsw-cloud-analytics", label: 'Cloud Analytics'},
      {id: "hpsw-business-analytics", label: 'IT Business Analytics'},
      {id: "hpsw-login", label: 'Login'},
      {id: "oneview-dashboard", label: 'OneView Dashboard'},
      {id: "oneview-detail-page", label: 'OneView Detail Page'},
      {id: "hpsw-ops-dashboard", label: 'Ops Dashboard'},
      {id: "propel-dashboard", label: 'Propel Dashboard'},
      {id: "propel-prod-detail", label: 'Propel Product Detail'},
      {id: "hpsw-service-anywhere", label: 'Service Anywhere'},
      {id: "hpsw-web-inspect", label: 'Web Inspect'}
    ]
  },
  {route: "design_resources", label: 'Resources', component: Resources}
];

var Design = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function () {
    return (
      <Article>
        <DocsHeader />

        <Section appCentered={true} colorIndex="neutral-1" primary={true}>
          <h1>Design</h1>
          <p>This application style guide was created by the designers at Hewlett
          Packard Enterprise. The guide covers the general design principles as well
          as specific design guidelines. You'll also find downloadable assets for the
          basic elements of the application style. These are meant to help designers
          quickly begin designing applications based on these styles and patterns.
          Finally, we've also created a web-based development platform that enables
          developers to quickly begin implementing enterprise applications.</p>
          <Menu direction="row">
            <Link to="design_resources">
              <Button id="resources-button" label="Resources" onClick={this._onClick} primary={true} />
            </Link>
          </Menu>
        </Section>

        <Section appCentered={true}>
          <h2>Contents</h2>
          <DocsMenu direction="row" contents={CONTENTS} />
        </Section>
      </Article>
    );
  }
});

var DesignDocument = React.createClass({

  render: function () {
    var title = <Link to="design">Design</Link>;
    return (
      <DocsSplit title={title} contents={CONTENTS}>
        <RouteHandler />
      </DocsSplit>
    );
  }
});

var Empty = React.createClass({
  render: function () {
    return (<div></div>);
  }
});

function createContentRoutes(contents) {
  var result = [];
  contents.forEach(function (content) {

    var handler = content.component || Empty;
    result.push(
      <Route key={content.label} name={content.route}
        path={content.label.toLowerCase().replace(/ /g, "-")}
        handler={handler} />
    );

    if (content.hasOwnProperty('contents')) {
      result = result.concat(createContentRoutes(content.contents));
    }
  });
  return result;
}

Design.routes = function () {
  var routes = createContentRoutes(CONTENTS);
  return [
    <Route key="top" name="design" handler={Design} />,
    <Route key="docs" path="design" handler={DesignDocument}>{routes}</Route>
  ];
};

module.exports = Design;
