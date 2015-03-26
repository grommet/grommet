// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LigoIndex = require('ligo').Index;
var Dashboard = LigoIndex.Dashboard;

var configuration = {
  panels: [
    {
      name: 'Alerts',
      params: {
        category: 'alerts',
        search: 'state:Active'
      },
      attribute: {name: 'status'}
    }
  ],
  availablePanels: []
};

var TourDashboard = React.createClass({

  render: function () {
    return (
      <Dashboard configuration={configuration} />
    );
  }

});

module.exports = TourDashboard;
