// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var TourLogin = require('./TourLogin');
var TBD = require('grommet/components/TBD');
//var IndexDashboardEdit = require('grommet/index/components/DashboardEdit');
//var IndexDashboardPanelAdd = require('grommet/index/components/DashboardPanelAdd');
//var IndexDashboardPanelEdit = require('grommet/index/components/DashboardPanelEdit');
var Tour = require('./Tour');
var TourDashboard = require('./TourDashboard');
var Enclosures = require('./Enclosures');
var TourActivity = require('./TourActivity');
var TourAlert = require('./TourAlert');

var rootPath = "/tour/";
if (__DEV_MODE__) {
  rootPath = "/"; // webpack-dev-server
}

var routes = (
  <Route name="tour" path={rootPath} handler={Tour}>
    <Route name="login" handler={TourLogin}/>
    <Route name="tbd" handler={TBD}/>
    <Route name="settings" handler={TBD}/>
    <Route name="activity" handler={TourActivity}>
      <Route name="alert" path={rootPath + "alert/*"} handler={TourAlert} />
    </Route>
    <Route name="enclosures" handler={Enclosures} />
    <Route name="reports" handler={TBD} />
    <Route name="dashboard-edit" path="dashboard/edit"
      handler={TBD}>
      <Route name="dashboard-panel-add" path="panel/add"
        handler={TBD}/>
      <Route name="dashboard-panel-edit" path="panel/edit/:index"
        handler={TBD}/>
    </Route>
    <DefaultRoute name="dashboard" handler={TourDashboard}/>
  </Route>
);

module.exports = routes;
