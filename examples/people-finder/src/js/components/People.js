// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var Section = require('grommet/components/Section');
var List = require('grommet/components/List');
var Spinning = require('grommet/components/icons/Spinning');
var Logo = require('./Logo');

var PEOPLE_SCHEMA = [
  {attribute: 'uid', uid: true},
  {attribute: 'hpPictureThumbnailURI', image: true, default: 'img/no-picture.png'},
  {attribute: 'cn', primary: true},
  {attribute: 'hpBusinessUnit', secondary: true}
];

var People = React.createClass({

  propTypes: {
    changing: React.PropTypes.bool,
    initial: React.PropTypes.bool,
    onSearch: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    searchText: React.PropTypes.string.isRequired
  },

  mixins: [IntlMixin],

  componentDidMount: function () {
    this.refs.search.focus();
  },

  render: function() {
    var title = this.getGrommetIntlMessage('People Finder');
    var texture;
    var colorIndex = "neutral-1";
    var logo;

    if (this.props.initial) {
      texture = "url(img/people-finder-background.png)";
      colorIndex = "neutral-1-a";
      logo = <img src="img/hpesm_pri_grn_rev_rgb.svg" alt="logo" className="logo" />;
    }

    var data = this.props.people;
    var empty;
    if (this.props.changing) {
      data = [{uid: 'spinner', hpPictureThumbnailURI: <Spinning />}];
    } else if (! this.props.initial && !this.props.people) {
      empty = 'No matches';
      data = [];
    }

    return (
      <Section texture={texture} full={true} pad="none">
        <Header key="header" large={true} pad={{horizontal: "medium"}}
          float={this.props.initial}
          colorIndex={colorIndex} splash={this.props.initial} responsive={false}>
          <Title>
            <Logo />
            {title}
          </Title>
          <Search ref="search" inline={true} className="flex"
            defaultValue={this.props.searchText}
            onChange={this.props.onSearch} />
        </Header>
        <List key="results" large={true} data={data} emptyIndicator={empty}
          schema={PEOPLE_SCHEMA} onSelect={this.props.onSelect} />
        {logo}
      </Section>
    );
  }

});

module.exports = People;
