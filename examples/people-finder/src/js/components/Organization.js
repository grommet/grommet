// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var List = require('grommet/components/List');
var Header = require('grommet/components/Header');
var Rest = require('grommet/utils/Rest');
var Spinning = require('grommet/components/icons/Spinning');
var config = require('../config');

var Organization = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {team: [], managers: [], scope: config.scopes.people};
  },

  componentDidMount: function () {
    this._getRelatedDetails(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.person.dn !== this.props.person.dn) {
      this._getRelatedDetails(newProps);
    }
  },

  _onManagerResponse: function (err, res) {
    if (err) {
      this.setState({staff: [], error: err});
    } else if (res.ok) {
      var result = res.body;
      var manager = result[0];
      // might not match if domain names are different
      if (manager) {
        var managers = this.state.managers;
        managers.unshift(manager);
        this.setState({managers: managers, error: null});
        // 20 limit is to guard against bugs in the code
        if (manager.manager && manager.manager !== manager.dn && managers.length <= 20) {
          this._getManager(manager.manager);
        } else {
          this.setState({busy: false});
        }
      } else {
        console.log('Unknown manager', res.req.url);
        this.setState({busy: false});
      }
    }
  },

  _getManager: function (managerDn) {
    var params = {
      url: encodeURIComponent(config.ldap_base_url),
      base: managerDn,
      scope: 'sub'
    };
    Rest.get('/ldap/', params).end(this._onManagerResponse);
  },

  _onTeamResponse: function (err, res) {
    if (err) {
      this.setState({staff: [], error: err});
    } else if (res.ok) {
      var result = res.body;
      this.setState({team: result, error: null});
    }
  },

  _getRelatedDetails: function (props) {
    this.setState({team: [], managers: []});
    if (props.person.dn) {
      this.setState({busy: true});

      var params = {
        url: encodeURIComponent(config.ldap_base_url),
        base: encodeURIComponent('ou=' + this.state.scope.ou + ',o=' + config.organization),
        scope: 'sub',
        filter: encodeURIComponent('(&(hpStatus=Active)(manager=' + props.person.dn + '))'),
        attributes: config.attributesFromSchema(this.state.scope.schema)
      };
      Rest.get('/ldap/', params).end(this._onTeamResponse);

      this._getManager(props.person.manager);
    }
  },

  render: function() {
    var person = this.props.person;
    var people = [];
    if (person.uid) {
      if (this.state.busy) {
        people = [{uid: 'spinner', hpPictureThumbnailURI: <Spinning />}, person];
      } else {
        people = this.state.managers.concat(person);
      }
    }
    var team;
    if (this.state.team.length > 0) {
      team = [
        <Header key="label" tag="h4" pad="medium" separator="top">
          {person.givenName + "'s Team"}
        </Header>,
        <List key="team" large={true} data={this.state.team} schema={this.state.scope.schema}
          onSelect={this.props.onSelect} />
      ];
    }

    return (
      <Article>
        <List large={true} data={people} schema={this.state.scope.schema}
          onSelect={this.props.onSelect} />
        {team}
      </Article>
    );
  }

});

module.exports = Organization;
