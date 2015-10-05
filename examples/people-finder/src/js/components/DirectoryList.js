// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Rest = require('grommet/utils/Rest');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');
var config = require('../config');

var DirectoryList = React.createClass({

  propTypes: {
    scope: React.PropTypes.object.isRequired,
    searchText: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {
      changing: false,
      data: []
    };
  },

  componentDidMount: function () {
    this._queueSearch(this.props.searchText);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.scope !== this.props.scope ||
      newProps.searchText !== this.props.searchText) {
      this._queueSearch(newProps.searchText);
    }
  },

  componentDidUnmount: function () {
    clearTimeout(this._searchTimer);
  },

  _onSearchResponse: function (err, res) {
    if (err) {
      this.setState({data: [], error: err, changing: false});
    } else if (res.ok && this.props.searchText) {
      // don't keep result if we don't have search text anymore
      var result = res.body;
      this.setState({data: result, error: null, changing: false});
    }
  },

  _search: function () {
    var searchText = this.props.searchText;
    var filter;
    if (searchText[0] === '(') {
      // assume this is already a formal LDAP filter
      filter = encodeURIComponent(searchText);
    } else {
      filter = encodeURIComponent(this.props.scope.filterForSearch(searchText));
    }

    var params = {
      url: encodeURIComponent(config.ldap_base_url),
      base: encodeURIComponent('ou=' + this.props.scope.ou + ',o=' + config.organization),
      scope: 'sub',
      filter: filter,
      attributes: config.attributesFromSchema(this.props.scope.schema)
    };
    Rest.get('/ldap/', params).end(this._onSearchResponse);
  },

  _queueSearch: function (searchText) {
    clearTimeout(this._searchTimer);
    if (! searchText) {
      this.setState({data: [], changing: false});
    } else {
      this.setState({changing: true});
      // debounce
      this._searchTimer = setTimeout(this._search, 500);
    }
  },

  render: function() {
    var schema = this.props.scope.schema;
    var data = this.state.data;
    var empty;
    if (this.state.changing) {
      var busy = {uid: 'spinner'};
      busy[schema[0].attribute] = <Spinning />;
      data = [busy];
    } else if (this.props.searchText && this.state.data.length === 0) {
      empty = this.getGrommetIntlMessage('No matches');
      data = [];
    }

    return (
      <List key="results" large={true} data={data} emptyIndicator={empty}
        schema={schema} onSelect={this.props.onSelect} />
    );
  }

});

module.exports = DirectoryList;
