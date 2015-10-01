// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var Search = require('grommet/components/Search');
var Section = require('grommet/components/Section');
var Paragraph = require('grommet/components/Paragraph');
var Box = require('grommet/components/Box');
var Logo = require('./Logo');

var Finder = React.createClass({

  propTypes: {
    initial: React.PropTypes.bool.isRequired,
    onScope: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    searchText: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  },

  componentDidMount: function () {
    this.refs.search.focus();
  },

  componentDidUpdate: function () {
    this.refs.search.focus();
  },

  _onScope: function (scope) {
    this.props.onScope(scope);
  },

  render: function() {
    var texture;
    var colorIndex = "neutral-1";
    var footer;

    if (this.props.initial) {
      texture = "url(img/people-finder-background.jpg)";
      colorIndex = "neutral-1-a";
      footer = (
        <Footer float={true} colorIndex="grey-3-a"
          pad={{vertical: "small", horizontal: "medium"}}>
          <img src="img/hpesm_pri_grn_rev_rgb.svg" alt="logo" className="logo" />
          <Box className="flex" align="end">
            <Paragraph size="small">© Copyright 2015 Hewlett-Packard Development Company, L.P.</Paragraph>
          </Box>
        </Footer>
      );
    }

    return (
      <Section texture={texture} full={true} pad="none">
        <Header key="header" large={true} pad={{horizontal: "medium"}}
          float={this.props.initial}
          colorIndex={colorIndex} splash={this.props.initial} responsive={false}>
          <Title>
            <Logo reverse={true} />
            {this.props.title}
          </Title>
          <Search ref="search" inline={true} className="flex"
            defaultValue={this.props.searchText}
            onChange={this.props.onSearch} />
          <Menu inline={false}>
            <Anchor onClick={this._onScope.bind(this, 'People')}>People</Anchor>
            <Anchor onClick={this._onScope.bind(this, 'Groups')}>Groups</Anchor>
            <Anchor onClick={this._onScope.bind(this, 'Locations')}>Locations</Anchor>
          </Menu>
        </Header>
        {this.props.children}
        {footer}
      </Section>
    );
  }

});

module.exports = Finder;
