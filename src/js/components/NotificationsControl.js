// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var Notifications = require('../components/Notifications');

var NotificationsControl = React.createClass({

  mixins: [ReactLayeredComponent],

  _onClick: function() {
    this.setState({active: !this.state.active});
  },

  getInitialState: function() {
    return {active: false};
  },

  renderLayer: function() {
    if (! this.state.active) {
      return <span />;
    } else {
      return (
        <Notifications onRequestClose={this._onClick} />
      );
    }
  },

  render: function() {
    return (
      <div className={'notifications-control control-icon control-icon--full'}
        onClick={this._onClick}>
      </div>
    );
    //        <SVG path={'img/notifications.svg'}/>
  }

});

module.exports = NotificationsControl;
