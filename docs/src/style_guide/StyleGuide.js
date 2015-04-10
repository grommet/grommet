// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var RouterState = Router.State;
var Introduction = require('./Introduction');
var Philosophy = require('./Philosophy');
var Basics = require('./Basics');
var Patterns = require('./Patterns');
var Showcase = require('./Showcase');
var Login = require('./patterns/Login');
var Ligo = require('Ligo');
var TBD = Ligo.TBD;

var CONTENTS = [
  {route: "sg_introduction", label: 'Introduction', component: Introduction, default: true},
  {route: "sg_philosophy", label: 'Philosophy', component: Philosophy,
    contents: [
      {
        label: 'Best Practices',
        id: 'best-practices'
      },
      {
        label: 'Usability',
        id: 'usability'
      },
      {
        label: 'Interactions',
        id: 'interactions'
      },
      {
        label: 'Mobile',
        id: 'mobile'
      },
      {
        label: 'Accessibility',
        id: 'accessibility'
      }
    ]},
  {route: "sg_basics", label: 'Basics', component: Basics},
  {route: "sg_patterns", label: 'Patterns', component: Patterns,
    contents: [
      {route: "sg_login", label: 'Login', component: Login},
      {route: "sg_header", label: 'Header', component: TBD},
      {route: "sg_dashboard", label: 'Dashboard', component: TBD},
      {route: "sg_search", label: 'Search', component: TBD}
    ]
  },
  {route: "sg_showcase", label: 'Showcase', component: Showcase,
    contents: [
      {route: "sg_oneview", label: 'OneView', component: TBD}
    ]
  }
];

var StyleGuide = React.createClass({

  mixins: [RouterState],

  _linkToNode: function(e) {
    e.preventDefault();
    var node = this.getDOMNode();
    node.parentNode.scrollTop = node.querySelectorAll('section#'+e.target.id)[0].offsetTop - 100;
  },

  render: function() {

    this._chapterIndex = -2;

    var chapterLinks = CONTENTS.map(function (chapter, index) {
      var chapterActive = this.isActive(chapter.route);
      var pageActive = (chapter.hasOwnProperty('contents') &&
        chapter.contents.some(function (page) {
          return page.route ? this.isActive(page.route) : false;
        }.bind(this)));
      var active = chapterActive || pageActive;

      var className = '';
      if (active) {
        className = 'active';
        this._chapterIndex = index;
      }

      return (
        <Link key={chapter.label} to={chapter.route} className={className}>
          {chapter.label}
        </Link>
      );
    }.bind(this));

    var chapter = CONTENTS[this._chapterIndex];
    var header = React.createFactory(chapter.component.Header)();
    var pageLinks = null;
    var nextLink = null;
    var onPage = false;
    var layoutCompact = false;

    if (chapter.hasOwnProperty('contents')) {

      var activePageIndex = -2;
      pageLinks = chapter.contents.map(function (page, index) {

        var className = '';
        if (page.route && this.isActive(page.route)) {
          className = 'active';
        }

        var pageLink = page.id ? <a key={page.id} id={page.id} href="#" onClick={this._linkToNode} className={className}>{page.label}</a> : (
          <Link key={page.label} to={page.route} className={className}>
            {page.label}
          </Link>
        );

        if (page.route && this.isActive(page.route)) {
          onPage = true;
          activePageIndex = index;
          layoutCompact = true;
          header = (
            <Ligo.Nav accent={true}>
              {chapterLinks[this._chapterIndex]}
              {pageLink}
            </Ligo.Nav>
          );
        } else if (activePageIndex === (index - 1)) {
          nextLink = pageLink;
        }

        return pageLink;

      }.bind(this));
    }

    if (! nextLink) {
      nextLink = chapterLinks[this._chapterIndex + 1];
    }

    if (onPage) {
      // we are on a page, no chapters
      chapterLinks = null;
    }

    var accentIndex = this._chapterIndex + 1;

    var content;
    if (pageLinks || true) {
      content = (
        <Ligo.Layout centerColumn={true}>
          <Ligo.Nav vertical={true}>{pageLinks}</Ligo.Nav>
          <Ligo.Document accentIndex={accentIndex}>
            <RouteHandler />
          </Ligo.Document>
        </Ligo.Layout>
      );
    } else {
      content = (
        <Ligo.Document centerColumn={true} accentIndex={accentIndex}>
          <RouteHandler />
        </Ligo.Document>
      );
    }

    return (
      <div>
        <Ligo.Layout centerColumn={true} accentIndex={accentIndex}
          compact={layoutCompact}>
          <Ligo.Nav vertical={true} accent={true}>
            {chapterLinks}
          </Ligo.Nav>
          {header}
        </Ligo.Layout>
        {content}
        <Ligo.Footer centerColumn={true} scrollTop={true}>
          <Ligo.Nav><span>Next: {nextLink}</span></Ligo.Nav>
        </Ligo.Footer>
      </div>
    );
  }
});

var Empty = React.createClass({
  render: function () {
    return (<div></div>);
  }
});

function createContentRoutes(contents, level) {
  var result = [];
  contents.forEach(function (content) {

    var handler;
    if (level > 1) {
      handler = content.component;
    } else {
      handler = content.component.Section;
    }
    if (! handler) {
      handler = Empty;
    }

    if (content.default) {
      result.push(
        <DefaultRoute key={content.label} name={content.route}
          handler={handler} />
      );
    } else {
      result.push(
        <Route key={content.label} name={content.route}
          path={content.label.toLowerCase()}
          handler={handler} />
      );
    }

    if (content.hasOwnProperty('contents')) {
      result = result.concat(createContentRoutes(content.contents, level + 1));
    }
  });
  return result;
}

StyleGuide.routes = function () {
  var routes = createContentRoutes(CONTENTS, 1);
  return (
    <Route name="style guide" path="styleguide" handler={StyleGuide}>
      {routes}
    </Route>
  );
};

module.exports = StyleGuide;
