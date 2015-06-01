// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var Label = require('grommet/components/Label');
var Footer = require('grommet/components/Footer');
var DesignIcon = require('./img/Design');
var DevelopIcon = require('./img/Develop');
var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

var Docs = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function() {
    var footerColorIndex = null;
    var footerLogo = "img/hpesm_sec_grn_pos_rgb.svg";
    var title = '';
    if (this.context.router.isActive("home")) {
      footerColorIndex = "grey-1";
      footerLogo = "img/hpesm_sec_grn_rev_rgb.svg";
    } else {
      title = (
        <Title>
          <Link to="docs">
            <img src="img/grommet.svg" title="Grommet" />
            Grommet
          </Link>
        </Title>
      );
    }

    return (
      <App className="docs">
        <Header className="docs__header" primary={true} fixed={true} large={true} flush={false}>
          {title}
          <Menu direction="left">
            <Link key="style-guide" to="style guide">
              <Label text="Style Guide" icon={<DesignIcon />} />
            </Link>
            <Link key="documentation" to="documentation">
              <Label text="Documentation" icon={<DevelopIcon />} />
            </Link>
            <Link key="downloads" to="downloads">
              <Label text="Downloads" />
            </Link>
          </Menu>
        </Header>
        <RouteHandler />
        <Footer className="docs__footer" colorIndex={footerColorIndex} primary={true} centered={true}>
          <img src={footerLogo} alt="Hewlett Packard Enterprise logo" />
          <h3>Build your ideas!</h3>
          <div>
            This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
            <div>
              <Menu label="Theme" direction="up" small={true}>
                <a href="/grommet/" className={this.props.theme === 'generic' ? 'active' : ''}>Grommet</a>
                <a href="/grommet/hpe/" className={this.props.theme === 'hpe' ? 'active' : ''}>HPE</a>
                <a href="/grommet/hpinc/" className={this.props.theme === 'hpinc' ? 'active' : ''}>HPInc</a>
              </Menu>
            </div>
          </div>
        </Footer>
      </App>
    );
  }

});

module.exports = Docs;
