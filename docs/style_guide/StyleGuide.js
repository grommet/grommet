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
var Login = require('./Login');
var Documents = require('Documents');
var Document = Documents.Document;
var TBD = Documents.TBD;

var CONTENTS = [
  {route: "introduction", label: 'Introduction'},
  {route: "philosophy", label: 'Philosophy'},
  {route: "basics", label: 'Basics'},
  {route: "patterns", label: 'Patterns', contents: [
    {route: "login", label: 'Login'},
    {route: "header", label: 'Header'},
    {route: "dashboard", label: 'Dashboard'},
    {route: "search", label: 'Search'}
  ]},
  {route: "showcase", label: 'Showcase', contents: [
    {route: "oneview", label: 'OneView'}
  ]}
];

var StyleGuide = React.createClass({

  mixins: [RouterState],

  _buildContents: function (contents, sections, sectionIndex) {
    return contents.map(function (content, index) {
      var className = '';
      var active = this.isActive(content.route);
      if (active) {
        className = 'active';
        this._activeSectionIndex = sectionIndex || index + 1;
      }
      var link = (
        <Link to={content.route} className={className}>{content.label}</Link>
      );
      var item;
      if (sections) {
        item = {section: link};
        if (content.hasOwnProperty('contents')) {
          item.contents = this._buildContents(content.contents, false, index + 1);
        }
        item.active = active || this._activeSectionIndex === (index + 1);
      } else {
        item = link;
      }
      return item;
    }.bind(this));
  },

  render: function() {

    this._activeChapterIndex = -2;
    var pages = [];
    var nextLink = '';
    var chapterContextLink = '';

    var chapters = CONTENTS.map(function (content, index) {
      var chapterActive = this.isActive(content.route);
      var pageActive = (content.hasOwnProperty('contents') &&
        content.contents.some(function (item) {
          return this.isActive(item.route);
        }.bind(this)));
      var active = chapterActive || pageActive;

      var className = '';
      if (active) {
        className = 'active';
        this._activeChapterIndex = index;
      }

      var chapterLink = (
        <Link to={content.route} className={className}>{content.label}</Link>
      );

      if (active && content.hasOwnProperty('contents')) {

        var activePageIndex = (chapterActive ? -1 : -2);
        pages = content.contents.map(function (item, pageIndex) {

          var pageLink = (<Link to={item.route}>{item.label}</Link>);

          if (this.isActive(item.route)) {
            activePageIndex = pageIndex;
            chapterContextLink = chapterLink;
          } else if (activePageIndex === (pageIndex - 1)) {
            nextLink = pageLink;
          }

          return pageLink;

        }.bind(this));
      }

      if (! nextLink && this._activeChapterIndex === (index - 1)) {
        nextLink = chapterLink;
      }

      return chapterLink;
    }.bind(this));

    return (
      <Document chapters={chapters} pages={pages} next={nextLink}
        chapter={chapterContextLink}
        activeChapterIndex={this._activeChapterIndex + 1}>
        <RouteHandler />
      </Document>
    );
  }
});

StyleGuide.routes = function () {
  return (
    <Route name="style guide" path="styleguide" handler={StyleGuide}>
      <DefaultRoute name="introduction" handler={Introduction} />
      <Route name="philosophy" handler={Philosophy} />
      <Route name="basics" handler={Basics} />
      <Route name="patterns" handler={Patterns} />
      <Route name="login" handler={Login} />
      <Route name="header" handler={TBD} />
      <Route name="dashboard" handler={TBD} />
      <Route name="search" handler={TBD} />
      <Route name="filter" handler={TBD} />
      <Route name="showcase" handler={Showcase} />
      <Route name="oneview" handler={TBD} />
    </Route>
  );
}

module.exports = StyleGuide;
