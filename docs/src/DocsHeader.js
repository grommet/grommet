// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Box = require('grommet/components/Box');
var GrommetLogo = require('grommet/components/icons/Grommet');
var Menu = require('grommet/components/Menu');
var Link = require('react-router').Link;

var DocsHeader = React.createClass({

  propTypes: {
    float: React.PropTypes.bool
  },

  render: function() {
    return (
      <Header fixed={false} float={this.props.float} large={true}
        appCentered={true} justify="between">
        <Title responsive={false}>
          <Link to="docs">
            <Box align="center" direction="row">
              <GrommetLogo small={true} a11yTitle=""/>
              Grommet
            </Box>
          </Link>
        </Title>
        <Menu direction="row" responsive={false}>
          <Link id="design-link" to="design">Design</Link>
          <Link id="develop-link" to="develop">Develop</Link>
        </Menu>
      </Header>
    );
  }
});

module.exports = DocsHeader;
