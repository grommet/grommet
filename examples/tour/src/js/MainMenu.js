// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Layer = require('grommet/components/Layer');
var Header = require('grommet/components/Header');
var Search = require('grommet/components/Search');
var Menu = require('grommet/components/Menu');
var Title = require('grommet/components/Title');
var Close = require('grommet/components/icons/Clear');
var Link = require('react-router').Link;
var SessionActions = require('grommet/actions/SessionActions');
var Rest = require('grommet/utils/Rest');

var MainMenu = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    pages: React.PropTypes.arrayOf(React.PropTypes.shape({
      route: React.PropTypes.string,
      label: React.PropTypes.string,
      indexCategory: React.PropTypes.string
    })).isRequired
  },

  _pageForIndexCategory: function (category) {
    var result = null;
    this.props.pages.some(function (page) {
      if (page.indexCategory === category) {
        result = page;
        return true;
      }
    });
    return result;
  },

  _onSuggestionsResponse: function (err, res) {
    if (err && err.timeout > 1000) {
      // ignore
    } else if (res.status === 400) {
      SessionActions.logout();
    } else if (!res.ok) {
      // ignore
    } else {
      this.setState({suggestions: res.body});
    }
  },

  _onSearch: function (text) {
    var regexp = new RegExp('^' + text, 'i');
    var visiblePages = this.props.pages.filter(function (page) {
      return regexp.test(page.label);
    });
    this.setState({visiblePages: visiblePages, suggestions: null});
    Rest.get('/rest/index/search-suggestions',
      {start: 0, count: 5, query: text},
      this._onSuggestionsResponse);
  },

  getInitialState: function() {
    return {visiblePages: this.props.pages, suggestions: null};
  },

  componentDidMount: function () {
    this.refs.search.focus();
  },

  render: function() {
    var pages = this.state.visiblePages.map(function (page) {
      return (
        <Link key={page.label} to={page.route} onClick={this.props.onClose}>
          {page.label}
        </Link>
      );
    }, this);

    var suggestions = null;
    if (this.state.suggestions && this.state.suggestions.length > 0) {
      var links = [];
      this.state.suggestions.forEach(function (suggestion) {
        var page = this._pageForIndexCategory(suggestion.category);
        if (page) {
          links.push(
            <Link key={suggestion.uri} to={page.route} onClick={this.props.onClose}>
              {suggestion.name}
            </Link>
          );
         }
      }, this);

      suggestions = [
        <h4 key="header">Suggestions</h4>,
        <Menu key="menu">{links}</Menu>
      ];
    }

    return (
      <Layer align="top" onClose={this.props.onClose}>
        <Menu primary={true}>
          <Header large={true}>
            <Title>
              {"Grommet Tour"}
            </Title>
            <Search ref="search" inline={true} onChange={this._onSearch} />
            <Menu>
              <div onClick={this.props.onClose}>
                <Close />
              </div>
            </Menu>
          </Header>
          <Menu>
            {pages}
          </Menu>
          {suggestions}
          <h4>Recent</h4>
          <Menu>
            <Link to="tbd">resource 1</Link>
            <Link to="tbd">resource 2</Link>
          </Menu>
        </Menu>
      </Layer>
    );
  }

});

module.exports = MainMenu;
