// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var Section = require('grommet/components/Section');
var Box = require('grommet/components/Box');
var List = require('grommet/components/List');
var Logo = require('./Logo');

var PEOPLE_SCHEMA = [
  {attribute: 'uid', uid: true},
  {attribute: 'hpPictureThumbnailURI', image: true},
  {attribute: 'cn', primary: true},
  {attribute: 'hpBusinessUnit', secondary: true}
];

var People = React.createClass({

  propTypes: {
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

    return (
      <Section texture={texture} full={true} pad="none">
        <Header key="header" large={true} pad="medium" float={this.props.initial}
          colorIndex={colorIndex} splash={this.props.initial}>
          <Box direction="row" align="center" className="flex-grow-1">
            <Title>
              <Logo />
              {title}
            </Title>
            <Search ref="search" inline={true} className="flex-grow-1"
              defaultValue={this.props.searchText}
              onChange={this.props.onSearch} />
          </Box>
        </Header>
        <List key="results" large={true} data={this.props.people}
          schema={PEOPLE_SCHEMA} onSelect={this.props.onSelect} />
        {logo}
      </Section>
    );
  }

});

module.exports = People;
