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
var TBD = Documents.TBD;

var CONTENTS = [
  {route: "introduction", label: 'Introduction'},
  {route: "sg_philosophy", label: 'Philosophy'},
  {route: "sg_basics", label: 'Basics'},
  {route: "sg_patterns", label: 'Patterns', contents: [
    {route: "sg_login", label: 'Login'},
    {route: "sg_header", label: 'Header'},
    {route: "sg_dashboard", label: 'Dashboard'},
    {route: "sg_search", label: 'Search'}
  ]},
  {route: "sg_showcase", label: 'Showcase', contents: [
    {route: "sg_oneview", label: 'OneView'}
  ]}
];

var StyleGuide = React.createClass({

  mixins: [RouterState],

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

          return item;

        }.bind(this));
      }

      if (! nextLink && this._activeChapterIndex === (index - 1)) {
        nextLink = chapterLink;
      }

      return chapterLink;
    }.bind(this));

    return (
      <Documents.Document chapters={chapters} pages={pages} next={nextLink}
        chapter={chapterContextLink}
        activeChapterIndex={this._activeChapterIndex + 1}>
        <RouteHandler />
      </Documents.Document>
    );
  }
});

StyleGuide.routes = function () {
  return (
    <Route name="style guide" path="styleguide" handler={StyleGuide}>
      <DefaultRoute name="introduction" handler={Introduction} />
      <Route name="sg_philosophy" path="philosophy" handler={Philosophy} />
      <Route name="sg_basics" path="basics" handler={Basics} />
      <Route name="sg_patterns" path="patterns" handler={Patterns} />
      <Route name="sg_login" path="login" handler={Login} />
      <Route name="sg_header" path="header" handler={TBD} />
      <Route name="sg_dashboard" path="dashboard" handler={TBD} />
      <Route name="sg_search" path="search" handler={TBD} />
      <Route name="sg_filter" path="filter" handler={TBD} />
      <Route name="sg_showcase" path="showcase" handler={Showcase} />
      <Route name="sg_oneview" path="oneview" handler={TBD} />
    </Route>
  );
};

module.exports = StyleGuide;
