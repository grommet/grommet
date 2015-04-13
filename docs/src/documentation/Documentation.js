// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var LigoLayout = require('ligo/components/Layout');
var LigoMenu = require('ligo/components/Menu');
var LigoTBD = require('ligo/components/TBD');
var LigoDocument = require('ligo/components/Document');
var HelloWorld = require('./HelloWorld');
var GetStarted = require('./GetStarted');
var MenuDoc = require('./components/MenuDoc');
var HeaderDoc = require('./components/HeaderDoc');
require("!style!css!highlight.js/styles/github.css");
var hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var CONTENTS = [
  {label: 'Guides',
    contents: [
      {route: 'doc_helloworld', label: 'Hello World', component: HelloWorld, default: true},
      {route: 'doc_getstarted', label: 'Get Started', component: GetStarted}
    ]
  },
  {label: 'Patterns',
    contents: [
      {route: 'doc_dashboard', label: 'Dashboard', component: LigoTBD},
      {route: 'doc_index', label: 'Index', component: LigoTBD},
      {route: 'doc_login', label: 'Login', component: LigoTBD},
      {route: 'doc_navigation', label: 'Navigation', component: LigoTBD},
      {route: 'doc_search', label: 'Search', component: LigoTBD},
      {route: 'doc_session', label: 'Session', component: LigoTBD}
    ]
  },
  {label: 'Components',
    contents: [
      {route: 'doc_chart', label: 'Chart', component: LigoTBD},
      {route: 'doc_document', label: 'Document', component: LigoTBD},
      {route: 'doc_donut', label: 'Donut', component: LigoTBD},
      {route: 'doc_footer', label: 'Footer', component: LigoTBD},
      {route: 'doc_form', label: 'Form', component: LigoTBD},
      {route: 'doc_header', label: 'Header', component: HeaderDoc},
      {route: 'doc_menu', label: 'Menu', component: MenuDoc},
      {route: 'doc_meter', label: 'Meter', component: LigoTBD},
      {route: 'doc_table', label: 'Table', component: LigoTBD},
      {route: 'doc_tile', label: 'Tile', component: LigoTBD}
    ]
  },
  {label: 'Reference',
    contents: [
      {route: 'doc_architecture', label: 'Architecture', component: LigoTBD}
    ]
  }
];

function createPageLinks(contents, level) {
  var result = [];
  contents.forEach(function (page) {
    if (page.hasOwnProperty('route')) {
      result.push(<Link key={page.label} to={page.route}>{page.label}</Link>);
    } else {
      if (2 === level) {
        result.push(<h3 key={page.label}>{page.label}</h3>);
      } else if (3 === level) {
        result.push(<h4 key={page.label}>{page.label}</h4>);
      } else {
        result.push(<h5 key={page.label}>{page.label}</h5>);
      }
    }
    if (page.hasOwnProperty('contents')) {
      result = result.concat(createPageLinks(page.contents, level + 1));
    }
  });
  return result;
}

var Documentation = React.createClass({

  componentDidMount: function () {
    this.highlightCode();
  },

  componentDidUpdate: function () {
    this.highlightCode();
  },

  highlightCode: function () {
    var domNode = this.getDOMNode();
    var nodes = domNode.querySelectorAll('pre code');
    if (nodes.length > 0) {
      for (var i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  },

  render: function() {
    var pages = createPageLinks(CONTENTS, 2);
    return (
      <LigoLayout centerColumn={true}>
        <LigoMenu direction="down" accentIndex={1}>{pages}</LigoMenu>
        <LigoDocument accentIndex={1}>
          <RouteHandler />
        </LigoDocument>
      </LigoLayout>
    );
  }
});

function createContentRoutes(contents) {
  var result = [];
  contents.forEach(function (content) {
    if (content.default) {
      result.push(
        <DefaultRoute key={content.label} name={content.route}
          handler={content.component} />
      );
    } else {
      result.push(
        <Route key={content.label} name={content.route}
          path={content.label.toLowerCase().replace(/ /g,"-")}
          handler={content.component} />
      );
    }
    if (content.hasOwnProperty('contents')) {
      result = result.concat(createContentRoutes(content.contents));
    }
  });
  return result;
}

Documentation.routes = function () {
  var routes = createContentRoutes(CONTENTS);
  return (
    <Route name="documentation" path="documentation" handler={Documentation}>
      {routes}
    </Route>
  );
};

module.exports = Documentation;
