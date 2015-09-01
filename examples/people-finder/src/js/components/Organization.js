// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Article = require('grommet/components/Article');
var List = require('grommet/components/List');
var Header = require('grommet/components/Header');
var Rest = require('grommet/utils/Rest');
var Spinning = require('grommet/components/icons/Spinning');

var LDAP_BASE_PARAMS = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=people,o=hp.com'),
  scope: 'sub'
};

var PEOPLE_SCHEMA = [
  {attribute: 'uid', uid: true},
  {attribute: 'hpPictureThumbnailURI', image: true, default: 'img/no-picture.png'},
  {attribute: 'cn', primary: true},
  {attribute: 'hpBusinessUnit', secondary: true}
];

var Organization = React.createClass({

  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {team: [], managers: []};
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
    var params = merge({}, LDAP_BASE_PARAMS, {
      base: managerDn
    });
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
      var params = merge({}, LDAP_BASE_PARAMS, {
        filter: '(manager=' + props.person.dn + ')',
        attributes: ['cn', 'uid', 'hpPictureThumbnailURI', 'hpBusinessUnit']
      });
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
        <List key="team" large={true} data={this.state.team} schema={PEOPLE_SCHEMA}
          onSelect={this.props.onSelect} />
      ];
    }

    return (
      <Article>
        <List large={true} data={people} schema={PEOPLE_SCHEMA}
          onSelect={this.props.onSelect} />
        {team}
      </Article>
    );
  }

});

module.exports = Organization;
