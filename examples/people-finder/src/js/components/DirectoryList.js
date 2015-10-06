// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var ReactIntl = require('react-intl');
var FormattedMessage = ReactIntl.FormattedMessage;
var Rest = require('grommet/utils/Rest');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');
var Right = require('grommet/components/icons/Right');
var Footer = require('grommet/components/Footer');
var config = require('../config');

var DirectoryList = React.createClass({

  propTypes: {
    scope: React.PropTypes.object.isRequired,
    searchText: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired,
    onScope: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {
      changing: false,
      data: [],
      summaries: {}
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

  _simulateItem: function (primary, uid, image) {
    var item = {};
    this.props.scope.schema.forEach(function (attr) {
      if (attr.primary) {
        // TODO: parameterize i18n
        item[attr.attribute] = primary;
      } else if (attr.uid) {
        item[attr.attribute] = uid;
      } else if (attr.image) {
        item[attr.attribute] = image;
      }
    }.bind(this));
    return item;
  },

  _onSearchResponse: function (scope, err, res) {
    if (err) {
      this.setState({data: [], error: err, changing: false});
    } else if (res.ok && this.props.searchText) {
      // don't keep result if we don't have search text anymore
      var state = {error: null, changing: false, summaries: this.state.summaries};
      if (scope.ou === this.props.scope.ou) {
        state.data = res.body;
      } else if (res.body.length > 0) {
        var message = (
          <FormattedMessage message={scope.label + ' matching'}
            search={this.props.searchText} />
        );
        var item = this._simulateItem(message, scope.ou, <Right />);
        item._scope = scope;
        state.summaries[scope.ou] = {
          scope: scope,
          item: item
        };
      }
      this.setState(state);
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
    Rest.get('/ldap/', params).end(function (err, res) {
      this._onSearchResponse(this.props.scope, err, res);
    }.bind(this));

    // get other scopes lazily
    this._searchTimer = setTimeout(function () {
      Object.keys(config.scopes).map(function (key) {
        var scope = config.scopes[key];
        if (scope.ou !== this.props.scope.ou) {
          params.base = encodeURIComponent('ou=' + scope.ou + ',o=' + config.organization);
          params.filter = encodeURIComponent(scope.filterForSearch(searchText));
          params.attributes = config.attributesFromSchema(scope.schema);
          Rest.get('/ldap/', params).end(function (err, res) {
            this._onSearchResponse(scope, err, res);
          }.bind(this));
        }
      }.bind(this));
    }.bind(this), 200);
  },

  _queueSearch: function (searchText) {
    clearTimeout(this._searchTimer);
    if (! searchText) {
      this.setState({data: [], summaries: {}, changing: false});
    } else {
      this.setState({summaries: {}, changing: true});
      // debounce
      this._searchTimer = setTimeout(this._search, 500);
    }
  },

  _onSelect: function (item) {
    if (item._scope) {
      this.props.onScope(item._scope);
    } else {
      this.props.onSelect(item);
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
      empty = this.getGrommetIntlMessage('No matching ' + this.props.scope.label.toLowerCase());
      data = [];
    }

    Object.keys(config.scopes).map(function (key) {
      if (this.state.summaries[key]) {
        var summary = this.state.summaries[key];
        data = data.concat([summary.item]);
      }
    }.bind(this));

    var more;
    if (data.length >= 20) {
      more = (
        <Footer pad="medium">
          {this.getGrommetIntlMessage('Refine search to find more')}
        </Footer>
      );
    }

    return (
      <div>
        <List key="results" large={true} data={data} emptyIndicator={empty}
          schema={schema} onSelect={this._onSelect} />,
        {more}
      </div>
    );
  }

});

module.exports = DirectoryList;
