// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Menu = require('grommet/components/Menu');
var Gravatar = require('react-gravatar');
var SessionStore = require('grommet/stores/SessionStore');
var Actions = require('grommet/actions/Actions');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var MediumSessionMenu = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    align: React.PropTypes.string,
    direction: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {direction: 'down'};
  },

  _onLogout: function (event) {
    event.preventDefault();
    Actions.logout();
  },

  getInitialState: function () {
    return {
      session: SessionStore.getInitialState()
    };
  },

  render: function() {
    var icon = <Gravatar email={this.state.session.email || ''} default="mm"/>;
    return (
      <Menu icon={icon}
        align={this.props.align}
        direction={this.props.direction}>
        <a onClick={this._onLogout}>{this.getGrommetIntlMessage('Logout')}</a>
      </Menu>
    );
  }

});

module.exports = MediumSessionMenu;
