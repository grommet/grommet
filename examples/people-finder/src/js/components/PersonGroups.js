// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var merge = require('lodash/object/merge');
var React = require('react');
var Rest = require('grommet/utils/Rest');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');

var LDAP_BASE = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=groups,o=hp.com'),
  scope: 'sub'
};

var GROUP_SCHEMA = [
  {attribute: 'cn', primary: true, uid: true}
];

var PersonGroups = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {groups: []};
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
      var result = res.body;
      this.setState({groups: result, error: null, changing: false});
    }
  },

  _getGroups: function (props) {
    this.setState({groups: [], changing: true});
    if (props.person.dn) {
      this.setState({busy: true});
      var filter = '(&(objectClass=groupOfNames)(member=' + props.person.dn + '))';
      var params = merge({}, LDAP_BASE, {
        filter: encodeURIComponent(filter)
      });
      Rest.get('/ldap/', params).end(this._onGroupsResponse);
    }
  },

  render: function() {
    var groups = this.state.groups;
    if (this.state.changing) {
      groups = [{cn: <Spinning />}];
    }

    return (
      <List large={true} data={groups} schema={GROUP_SCHEMA}
        onSelect={this.props.onSelect} />
    );
  }

});

module.exports = PersonGroups;
