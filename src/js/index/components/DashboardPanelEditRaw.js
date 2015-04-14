// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DashboardActions = require('../actions/DashboardActions');

var DashboardPanelEditRaw = React.createClass({

  _onChange: function (event) {
    var text = event.target.value;
    DashboardActions.editPanel(text);
  },

  render: function() {
    var text = '';
    var error = '';
    if (this.props.pendingPanel) {
      text = this.props.pendingPanel.text;
      error = this.props.pendingPanel.error;
    }
    return (
      <div className={"dashboard-panel-edit-raw"}>
        <textarea onChange={this._onChange}
          value={text} />
        <div className={"dashboard-panel-edit-raw__error"}>
          {error}
        </div>
      </div>
    );
  }

});

module.exports = DashboardPanelEditRaw;
