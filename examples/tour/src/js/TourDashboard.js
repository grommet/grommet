// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LigoIndexDashboard = require('ligo/index/components/Dashboard');

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
      <LigoIndexDashboard configuration={configuration} />
    );
  }

});

module.exports = TourDashboard;
