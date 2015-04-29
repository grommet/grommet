// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Dashboard = React.createClass({


  render: function () {
    return (
      <div className={"dashboard"}>
        <div className={"dashboard__panels"}>
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Dashboard;
