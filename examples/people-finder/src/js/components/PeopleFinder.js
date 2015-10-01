// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Finder = require('./Finder');
var People = require('./People');
var Groups = require('./Groups');
var Locations = require('./Locations');
var Person = require('./Person');
var Group = require('./Group');
var LocationComponent = require('./Location');

/*
 * The PeopleFinder module controls the browser location and interacts with the
 * back end. It uses the People and Person modules to handle all visualizations.
 */

var PeopleFinder = React.createClass({

  mixins: [IntlMixin],

  getInitialState: function () {
    var params = this._paramsFromQuery(window.location.search);
    var searchText = params.search || '';
    var scope = params.scope || 'People';
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
    url += 'scope=' + encodeURIComponent(this.state.scope);
    var label = this.state.scope + ' Finder';
    if (this.state.searchText) {
      url += '&search=' + encodeURIComponent(this.state.searchText);
      label = this.state.searchText;
    }
    if (this.state.id) {
      url += '&id=' + encodeURIComponent(this.state.id);
      label = this.state.id;
    }
    var state = {
      scope: this.state.scope,
      searchText: this.state.searchText,
      id: this.state.id
    };
    window.history.pushState(state, label, url);
  },

  _popState: function (event) {
    if (event.state) {
      this.setState({
        scope: event.state.scope,
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

  _onSelectPerson: function (person) {
    this.setState({id: person.uid, scope: 'People'}, this._pushState);
  },

  _onSelectGroup: function (group) {
    this.setState({id: group.cn, scope: 'Groups'}, this._pushState);
  },

  _onSelectLocation: function (locationArg) {
    this.setState({id: locationArg.hpRealEstateID, scope: 'Locations'}, this._pushState);
  },

  _onCloseItem: function () {
    this.setState({id: null}, this._pushState);
  },

  render: function() {
    var contents;
    var title = this.state.scope + " Finder";
    var list;
    if ('People' === this.state.scope) {

      if (this.state.id) {
        contents = (
          <Person uid={this.state.id}
            onSelectPerson={this._onSelectPerson}
            onSelectGroup={this._onSelectGroup}
            onClose={this._onCloseItem} />
        );
      } else {
        list = (
          <People searchText={this.state.searchText}
            onSelect={this._onSelectPerson} />
        );
      }

    } else if ('Groups' === this.state.scope) {

      if (this.state.id) {
        contents = (
          <Group cn={this.state.id} onSelect={this._onSelectPerson}
            onClose={this._onCloseItem} />
        );
      } else {
        list = (
          <Groups searchText={this.state.searchText}
            onSelect={this._onSelectGroup} />
        );
      }

    } else if ('Locations' === this.state.scope) {

      if (this.state.id) {
        contents = (
          <LocationComponent hpRealEstateID={this.state.id}
            onClose={this._onCloseItem} />
        );
      } else {
        list = (
          <Locations searchText={this.state.searchText}
            onSelect={this._onSelectLocation} />
        );
      }

    }

    if (! contents) {
      contents = (
        <Finder title={title} initial={this.state.initial}
          onScope={this._onScope}
          searchText={this.state.searchText} onSearch={this._onSearchText}>
          {list}
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
