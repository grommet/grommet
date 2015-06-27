// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var GrommetLogo = require('grommet/components/icons/Grommet');
var Menu = require('grommet/components/Menu');
var Link = require('react-router').Link;

var DocsHeader = React.createClass({

  propTypes: {
    float: React.PropTypes.bool
  },

  render: function() {
    return (
      <Header primary={true} fixed={false}
        float={this.props.float} large={true} flush={false}>
        <Title>
          <Link to="docs">
            <GrommetLogo small={true} />
            Grommet
          </Link>
        </Title>
        <Menu direction="left">
          <Link to="design">Design</Link>
          <Link to="develop">Develop</Link>
        </Menu>
      </Header>
    );
  }
});

module.exports = DocsHeader;
