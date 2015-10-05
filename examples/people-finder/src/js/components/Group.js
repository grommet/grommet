// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Rest = require('grommet/utils/Rest');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var List = require('grommet/components/List');
var SearchIcon = require('grommet/components/icons/Search');
var Logo = require('./Logo');
var config = require('../config');

var Group = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {group: {}, owners: [], scope: config.scopes.groups,
      peopleScope: config.scopes.people};
  },

  componentDidMount: function () {
    this._getGroup(this.props.id);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.id !== this.props.id) {
      this._getGroup(newProps.id);
    }
  },

  _onOwnersResponse: function (err, res) {
    if (err) {
      this.setState({owners: [], error: err});
    } else if (res.ok) {
      var result = res.body;
      this.setState({owners: result, error: null});
    }
  },

  _onGroupResponse: function (err, res) {
    if (err) {
      this.setState({group: {}, error: err});
    } else if (res.ok) {
      var group = res.body[0];
      this.setState({group: group, owners: [], error: null});

      if (group.owner) {
        var owners = Array.isArray(group.owner) ? group.owner : [group.owner];
        var filter = '(|' +
        owners.map(function (o) {
          return ('(' + o.split(',')[0] + ')');
        }).join('') +
        ')';
        var params = {
          url: encodeURIComponent(config.ldap_base_url),
          base: encodeURIComponent('ou=' + this.state.peopleScope.ou + ',o=' + config.organization),
          scope: 'sub',
          filter: encodeURIComponent(filter),
          attributes: config.attributesFromSchema(this.state.peopleScope.schema)
        };
        Rest.get('/ldap/', params).end(this._onOwnersResponse);
      }
    }
  },

  _getGroup: function (id) {
    var params = {
      url: encodeURIComponent(config.ldap_base_url),
      base: encodeURIComponent('ou=' + this.state.scope.ou + ',o=' + config.organization),
      scope: 'sub',
      filter: '(cn=' + id + ')'
    };
    Rest.get('/ldap/', params).end(this._onGroupResponse);
  },

  _onSelectOwner: function (owner) {
    this.props.onSelect(owner, this.state.peopleScope);
  },

  render: function() {
    var appTitle = this.getGrommetIntlMessage('Groups Finder');
    var group = this.state.group;
    var mails = Array.isArray(group.mail) ? group.mail : [group.mail];
    mails = mails.map(function (mail) {
      return (
        <h2 key={mail}><a href={"mailto:" + mail}>{mail}</a></h2>
      );
    });

    return (
      <Article>
        <Header large={true} pad={{horizontal: "medium"}} separator="bottom"
          justify="between">
          <Title onClick={this.props.onClose} responsive={false}>
            <Logo />
            {appTitle}
          </Title>
          <span onClick={this.props.onClose}>
            <SearchIcon />
          </span>
        </Header>
        <Section pad="medium">
          <Header tag="h1" justify="between">
            <span>{group.cn}</span>
          </Header>
          <p>{group.description}</p>
          {mails}
        </Section>
        <Header key="label" tag="h3" pad="medium">
          {"Owner" + (this.state.owners.length > 1 ? 's' : '')}
        </Header>
        <List large={true} data={this.state.owners} schema={this.state.peopleScope.schema}
          onSelect={this._onSelectOwner} />
      </Article>
    );
  }

});

module.exports = Group;
