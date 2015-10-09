// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Finder = require('./Finder');
var DirectoryList = require('./DirectoryList');
var Person = require('./Person');
var Group = require('./Group');
var LocationComponent = require('./Location');
var config = require('../config');

/*
 * The PeopleFinder module controls the browser location and interacts with the
 * back end. It uses the People and Person modules to handle all visualizations.
 */

var PeopleFinder = React.createClass({

  mixins: [IntlMixin],

  getInitialState: function () {
    var params = this._paramsFromQuery(window.location.search);
    var searchText = params.search || '';
    var scope = config.scopes[params.scope || 'people'];
    var id = params.id || null;

    return {
      initial: (! searchText),
      scope: scope,
      searchText: searchText,
      id: id
    };
  },

  componentDidMount: function () {
    window.onpopstate = this._popState;
  },

  _paramsFromQuery: function (query) {
    var params = {};
    query.replace(/(^\?)/,'').split('&').forEach(function (p) {
      var parts = p.split('=');
      params[parts[0]] = decodeURIComponent(parts[1]);
    });
    return params;
  },

  _pushState: function () {
    var url = window.location.href.split('?')[0] + '?';
    url += 'scope=' + encodeURIComponent(this.state.scope.ou);
    var label = this.getGrommetIntlMessage(this.state.scope.label + " Finder");
    if (this.state.searchText) {
      url += '&search=' + encodeURIComponent(this.state.searchText);
      label = this.state.searchText;
    }
    if (this.state.id) {
      url += '&id=' + encodeURIComponent(this.state.id);
      label = this.state.id;
    }
    var state = {
      ou: this.state.scope.ou,
      searchText: this.state.searchText,
      id: this.state.id
    };
    window.history.pushState(state, label, url);
  },

  _popState: function (event) {
    if (event.state) {
      this.setState({
        scope: config.scopes[event.state.ou],
        searchText: event.state.searchText,
        id: event.state.id
      });
    }
  },

  _onSearchText: function (text) {
    this.setState({initial: (! text), searchText: text}, this._pushState);
  },

  _onScope: function (scope) {
    this.setState({scope: scope}, this._pushState);
  },

  _onSelect: function (item, scopeArg) {
    var scope = scopeArg || this.state.scope;
    this.setState({id: item[scope.id], scope: scope}, this._pushState);
  },

  _onCloseItem: function () {
    this.setState({id: null}, this._pushState);
  },

  render: function() {
    var contents;

    if (this.state.id) {

      if ('people' === this.state.scope.ou) {

        contents = (
          <Person id={this.state.id} onSelect={this._onSelect}
            onClose={this._onCloseItem} />
        );

      } else if ('groups' === this.state.scope.ou) {

        contents = (
          <Group id={this.state.id} onSelect={this._onSelect}
            onClose={this._onCloseItem} />
        );

      } else if ('locations' === this.state.scope.ou) {

        contents = (
          <LocationComponent id={this.state.id}
            onClose={this._onCloseItem} />
        );

      }

    } else {

      contents = (
        <Finder scope={this.state.scope} initial={this.state.initial}
          onScope={this._onScope}
          searchText={this.state.searchText} onSearch={this._onSearchText}>
          <DirectoryList scope={this.state.scope}
            searchText={this.state.searchText}
            onSelect={this._onSelect} onScope={this._onScope} />
        </Finder>
      );

    }

    return (
      <App centered={false}>
        {contents}
      </App>
    );
  }

});

module.exports = PeopleFinder;
