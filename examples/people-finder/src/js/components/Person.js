// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Split = require('grommet/components/Split');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Menu = require('grommet/components/Menu');
var SearchIcon = require('grommet/components/icons/Search');
var Logo = require('./Logo');
var Map = require('./Map');
var About = require('./About');
var Organization = require('./Organization');
var Rest = require('grommet/utils/Rest');

var Person = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    person: React.PropTypes.object.isRequired
  },

  mixins: [IntlMixin],

  _onAbout: function () {
    this.setState({view: 'about'});
  },

  _onOrganization: function () {
    this.setState({view: 'organization'});
  },

  getInitialState: function () {
    return {view: 'organization'};
  },

  render: function() {
    var appTitle = this.getGrommetIntlMessage('People Finder');
    var person = this.props.person;

    var view;
    var viewLabel;
    if ('about' === this.state.view) {
      view = <About person={person}/>;
      viewLabel = 'About';
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
          <Article align="start">
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
              <h1>{person.cn}</h1>
              <div>
                <img src={person.hpPictureURI || 'img/no-picture.png'} alt="picture" />
              </div>
              <p>{personTitle}</p>
              <h2><a href={"mailto:" + person.uid}>{person.uid}</a></h2>
              <h3>{person.telephoneNumber}</h3>
            </Section>
            <Map person={person} />
          </Article>
        </div>
        <div>
            <Header large={true} pad={{horizontal: "medium"}} justify="between" separator="bottom">
            <h3>{viewLabel}</h3>
            <Menu collapse={true} dropAlign={{right: 'right'}}>
              <a onClick={this._onAbout}>About</a>
              <a onClick={this._onOrganization}>Organization</a>
            </Menu>
          </Header>
          {view}
        </div>
      </Split>
    );
  }

});

module.exports = Person;
