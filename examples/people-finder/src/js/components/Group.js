// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var merge = require('lodash/object/merge');
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

var LDAP_BASE = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=groups,o=hp.com'),
  scope: 'sub'
};

var LDAP_PEOPLE_BASE = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=people,o=hp.com'),
  scope: 'sub'
};

var OWNER_SCHEMA = [
  {attribute: 'uid', uid: true},
  {attribute: 'hpPictureThumbnailURI', image: true, default: 'img/no-picture.png'},
  {attribute: 'cn', primary: true},
  {attribute: 'hpBusinessUnit', secondary: true}
];

var Group = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    cn: React.PropTypes.string.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {group: {}, owners: []};
  },

  componentDidMount: function () {
    this._getGroup(this.props.cn);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.cn !== this.props.cn) {
      this._getGroup(newProps.cn);
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
        var params = merge({}, LDAP_PEOPLE_BASE, {
          filter: encodeURIComponent(filter),
          attributes: ['cn', 'uid', 'hpPictureThumbnailURI', 'hpBusinessUnit']
        });
        Rest.get('/ldap/', params).end(this._onOwnersResponse);
      }
    }
  },

  _getGroup: function (cn) {
    var params = merge({}, LDAP_BASE, {
      filter: '(cn=' + cn + ')'
    });
    Rest.get('/ldap/', params).end(this._onGroupResponse);
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
          {mails}
          <p>{group.description}</p>
        </Section>
        <Header key="label" tag="h3" pad="medium">
          {"Owner" + (this.state.owners.length > 1 ? 's' : '')}
        </Header>
        <List large={true} data={this.state.owners} schema={OWNER_SCHEMA}
          onSelect={this.props.onSelect} />
      </Article>
    );
  }

});

module.exports = Group;
