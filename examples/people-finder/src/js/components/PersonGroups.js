// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Rest = require('grommet/utils/Rest');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');
var config = require('../config');

var PersonGroups = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {groups: [], scope: config.scopes.groups};
  },

  componentDidMount: function () {
    this._getGroups(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.person.dn !== this.props.person.dn) {
      this._getGroups(newProps);
    }
  },

  _onGroupsResponse: function (err, res) {
    if (err) {
      this.setState({groups: [], error: err, changing: false});
    } else if (res.ok) {
      var result = res.body.sort(function (g1, g2) {
        var n1 = g1.cn.toLowerCase();
        var n2 = g2.cn.toLowerCase();
        if (n1 > n2) {
          return 1;
        }
        if (n1 < n2) {
          return -1;
        }
        return 0;
      });
      this.setState({groups: result, error: null, changing: false});
    }
  },

  _getGroups: function (props) {
    this.setState({groups: [], changing: true});
    if (props.person.dn) {
      this.setState({busy: true});
      var filter = '(&(objectClass=groupOfNames)(member=' + props.person.dn + '))';
      var params = {
        url: encodeURIComponent(config.ldap_base_url),
        base: encodeURIComponent('ou=' + this.state.scope.ou + ',o=' + config.organization),
        scope: 'sub',
        filter: encodeURIComponent(filter),
        attributes: config.attributesFromSchema(this.state.scope.schema)
      };
      Rest.get('/ldap/', params).end(this._onGroupsResponse);
    }
  },

  _onSelectGroup: function (group) {
    this.props.onSelect(group, this.state.scope);
  },

  render: function() {
    var groups = this.state.groups;
    if (this.state.changing) {
      groups = [{cn: <Spinning />}];
    }

    return (
      <List large={true} data={groups} schema={this.state.scope.schema}
        itemDirection="column" onSelect={this._onSelectGroup} />
    );
  }

});

module.exports = PersonGroups;
