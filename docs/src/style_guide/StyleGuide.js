// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Introduction = require('./Introduction');
var Philosophy = require('./Philosophy');
var Basics = require('./Basics');
var Patterns = require('./Patterns');
var Showcase = require('./Showcase');
var Login = require('./patterns/Login');
var Layout = require('ligo/components/Layout');
var TBD = require('ligo/components/TBD');
var LigoDocument = require('ligo/components/Document');
var Footer = require('ligo/components/Footer');
var Menu = require('ligo/components/Menu');

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
  {route: "sg_basics", label: 'Basics', component: Basics,
    contents: [
      {
        label: 'Color',
        id: 'color'
      },
      {
        label: 'Text',
        id: 'text'
      },
      {
        label: 'Typography',
        id: 'typography'
      },
      {
        label: 'Writing Style',
        id: 'writing-style'
      },
      {
        label: 'Date and Time',
        id: 'date-time'
      },
      {
        label: 'Capitalization',
        id: 'capitalization'
      },
      {
        label: 'Icons',
        id: 'icons'
      }
    ]},
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

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  _linkToNode: function (event) {
    event.preventDefault();
    var targetId = event.target.dataset.targetId;
    var node = this.getDOMNode();
    var headerHeight = document.body.querySelectorAll('.header--primary')[0].offsetHeight;
    console.log('!!! StyleGuide', node.querySelectorAll('#'+targetId)[0], node.querySelectorAll('#'+targetId)[0].offsetTop);
    node.parentNode.scrollTop = node.querySelectorAll('#'+targetId)[0].offsetTop - headerHeight;
  },

  render: function () {

    this._chapterIndex = -2;

    var chapterLinks = CONTENTS.map(function (chapter, index) {
      var chapterActive = this.context.router.isActive(chapter.route);
      var pageActive = (chapter.hasOwnProperty('contents') &&
        chapter.contents.some(function (page) {
          return page.route ? this.context.router.isActive(page.route) : false;
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
        if (page.route && this.context.router.isActive(page.route)) {
          className = 'active';
        }

        var pageLink = page.id ?
          <a key={page.id} data-target-id={page.id} href="#" onClick={this._linkToNode}
            className={className}>{page.label}</a>
        : (
          <Link key={page.label} to={page.route} className={className}>
            {page.label}
          </Link>
        );

        if (page.route && this.context.router.isActive(page.route)) {
          onPage = true;
          activePageIndex = index;
          layoutCompact = true;
          header = (
            <Menu direction="right" accent={true}>
              {chapterLinks[this._chapterIndex]}
              {pageLink}
            </Menu>
          );
        } else if (activePageIndex === (index - 1)) {
          nextLink = pageLink;
        }

        return pageLink;

      }.bind(this));
    }

    var next = null;
    if (! nextLink) {
      nextLink = chapterLinks[this._chapterIndex + 1];
    }
    if (nextLink) {
      next = <span>Next: {nextLink}</span>;
    }

    if (onPage) {
      // we are on a page, no chapters
      chapterLinks = null;
    }

    var accentIndex = this._chapterIndex + 1;

    return (
      <div>
        <Layout centerColumn={true} accentIndex={accentIndex}
          compact={layoutCompact}>
          <Menu direction="down" accent={true} >
            {chapterLinks}
          </Menu>
          {header}
        </Layout>
        <Layout centerColumn={true}>
          <Menu direction="down" inline={true}>{pageLinks}</Menu>
          <LigoDocument accentIndex={accentIndex}>
            <RouteHandler />
          </LigoDocument>
        </Layout>
        <Footer centerColumn={true} scrollTop={true}>
          <Menu></Menu>
          <Menu className="flex-1">{next}</Menu>
        </Footer>
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
