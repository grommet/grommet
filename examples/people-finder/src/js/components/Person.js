// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Rest = require('grommet/utils/Rest');
var Split = require('grommet/components/Split');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Sidebar = require('grommet/components/Sidebar');
var Menu = require('grommet/components/Menu');
var SearchIcon = require('grommet/components/icons/Search');
var EditIcon = require('grommet/components/icons/Edit');
var Logo = require('./Logo');
var Map = require('./Map');
var About = require('./About');
var PersonGroups = require('./PersonGroups');
var Organization = require('./Organization');
var config = require('../config');

var Person = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {view: 'organization', person: {}, scope: config.scopes.people};
  },

  componentDidMount: function () {
    this._getPerson(this.props.id);
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.id !== this.props.id) {
      this._getPerson(newProps.id);
    }
  },

  _onPersonResponse: function (err, res) {
    if (err) {
      this.setState({person: {}, error: err});
    } else if (res.ok) {
      var result = res.body;
      this.setState({person: result[0], error: null});
    }
  },

  _getPerson: function (id) {
    var params = {
      url: encodeURIComponent(config.ldap_base_url),
      base: encodeURIComponent('ou=' + this.state.scope.ou + ',o=' + config.organization),
      scope: 'sub',
      filter: '(uid=' + id + ')'
    };
    Rest.get('/ldap/', params).end(this._onPersonResponse);
  },

  _onAbout: function () {
    this.setState({view: 'about'});
  },

  _onGroups: function () {
    this.setState({view: 'groups'});
  },

  _onOrganization: function () {
    this.setState({view: 'organization'});
  },

  render: function() {
    var appTitle = this.getGrommetIntlMessage('People Finder');
    var person = this.state.person;

    var view;
    var viewLabel;
    if ('about' === this.state.view) {
      view = <About person={person}/>;
      viewLabel = 'About';
    } else if ('groups' === this.state.view) {
      view = <PersonGroups person={person} onSelect={this.props.onSelect} />;
      viewLabel = 'Groups';
    } else if ('organization' === this.state.view) {
      view = <Organization person={person} onSelect={this.props.onSelect} />;
      viewLabel = 'Organization';
    }

    var personTitle;
    if (person.title) {
      personTitle = person.title.replace(/&amp;/g, '&');
    }

    return (
      <Split flex="left" separator={true}>
        <div>
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
                <span>{person.cn}</span>
                <a href={"http://directoryworks.core.hp.com/protected/people/view/person/normal/?dn=" + person.dn}><EditIcon /></a>
              </Header>
              <div>
                <img src={person.hpPictureURI || 'img/no-picture.png'} alt="picture" />
              </div>
              <p>{personTitle}</p>
              <h2><a href={"mailto:" + person.uid}>{person.uid}</a></h2>
              <h3><a href={"tel:" + person.telephoneNumber}>{person.telephoneNumber}</a></h3>
            </Section>
            <Map title={person.o}
              street={person.street} city={person.l} state={person.st} country={person.c} />
          </Article>
        </div>
        <Sidebar>
          <Header large={true} pad={{horizontal: "medium"}} justify="between" separator="bottom">
            <h3>{viewLabel}</h3>
            <Menu inline={false} dropAlign={{right: 'right'}} large={true}>
              <a onClick={this._onAbout}>About</a>
              <a onClick={this._onGroups}>Groups</a>
              <a onClick={this._onOrganization}>Organization</a>
            </Menu>
          </Header>
          {view}
        </Sidebar>
      </Split>
    );
  }

});

module.exports = Person;
