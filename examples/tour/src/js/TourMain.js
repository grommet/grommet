// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Sidebar = require('grommet/components/Sidebar');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var Logo = require('./MediumLogo');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var TourMainMenu = require('./TourMainMenu');
var TourSessionMenu = require('./TourSessionMenu');

var TourMain = React.createClass({

  propTypes: {
    primary: React.PropTypes.bool,
    onClose: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {primary: true};
  },

  render: function() {
    return (
      <Sidebar primary={this.props.primary}>
        <Header large={true} flush={false}>
          <Title>
            <Logo />
            <span>Medium App</span>
          </Title>
          <Menu>
            <div onClick={this.props.onClose}>
              <CloseIcon />
            </div>
          </Menu>
        </Header>
        <TourMainMenu onClose={this.props.onClose} />
        <Footer>
          <TourSessionMenu direction="up" />
        </Footer>
      </Sidebar>
    );
  }

});

module.exports = TourMain;
