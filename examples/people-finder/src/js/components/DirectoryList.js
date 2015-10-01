// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var merge = require('lodash/object/merge');
var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Rest = require('grommet/utils/Rest');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');

var DirectoryList = React.createClass({

  propTypes: {
    base: React.PropTypes.object.isRequired,
    filter: React.PropTypes.string,
    schema: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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
    this._search(this.props.filter, this._attributesFromSchema(this.props.schema));
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.filter !== this.props.filter) {
      this._search(newProps.filter, this._attributesFromSchema(newProps.schema));
    }
  },

  componentDidUnmount: function () {
    clearTimeout(this._searchTimer);
  },

  _attributesFromSchema: function (schema) {
    return schema.map(function (item) {
      return item.attribute;
    });
  },

  _onSearchResponse: function (err, res) {
    if (err) {
      this.setState({data: [], error: err, changing: false});
    } else if (res.ok && this.props.filter) {
      // don't keep result if we don't have search text anymore
      var result = res.body;
      this.setState({data: result, error: null, changing: false});
    }
  },

  _search: function (filter, attributes) {
    if (! filter) {
      this.setState({data: [], changing: false});
    } else {
      this.setState({changing: true});
      // debounce
      clearTimeout(this._searchTimer);
      this._searchTimer = setTimeout(function () {
        var params = merge({}, this.props.base, {
          filter: filter,
          attributes: attributes
        });
        Rest.get('/ldap/', params).end(this._onSearchResponse);
      }.bind(this), 500);
    }
  },

  render: function() {
    var data = this.state.data;
    var empty;
    if (this.state.changing) {
      var busy = {uid: 'spinner'};
      busy[this.props.schema[0].attribute] = <Spinning />;
      data = [busy];
    } else if (this.props.filter && this.state.data.length === 0) {
      empty = 'No matches';
      data = [];
    }

    return (
      <List key="results" large={true} data={data} emptyIndicator={empty}
        schema={this.props.schema} onSelect={this.props.onSelect} />
    );
  }

});

module.exports = DirectoryList;
