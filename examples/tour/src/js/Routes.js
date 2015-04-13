// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var LigoTBD = require('ligo/components/TBD');
var LigoIndexActivity = require('ligo/index/components/Activity');
var LigoIndexDashboardEdit = require('ligo/index/components/DashboardEdit');
var LigoIndexDashboardPanelAdd = require('ligo/index/components/DashboardPanelAdd');
var LigoIndexDashboardPanelEdit = require('ligo/index/components/DashboardPanelEdit');
var Tour = require('./Tour');
var TourDashboard = require('./TourDashboard');
/*
var App = Ligo.App;
var Login = Ligo.Login;
var Settings = Ligo.Settings;
var LigoIndex = Ligo.Index;
var DashboardEdit = LigoIndex.DashboardEdit;
var DashboardPanelAdd = LigoIndex.DashboardPanelAdd;
var DashboardPanelEdit = LigoIndex.DashboardPanelEdit;
var IndexEdit = LigoIndex.IndexEdit;
var Activity = LigoIndex.Activity;
var ActivityResource = LigoIndex.ActivityResource;
var TBD = Ligo.TBD;
var TourDashboard = require('./TourDashboard');
*/

var routes = (
  <Route name="tour" path="/" handler={Tour}>
    <Route name="login" handler={LigoTBD}/>
    <Route name="tbd" handler={LigoTBD}/>
    <Route name="settings" handler={LigoTBD}/>
    <Route name="activity" handler={LigoIndexActivity} />
    <Route name="reports" handler={LigoTBD} />
    <Route name="dashboard-edit" path="dashboard/edit"
      handler={LigoIndexDashboardEdit}>
      <Route name="dashboard-panel-add" path="panel/add"
        handler={LigoIndexDashboardPanelAdd}/>
      <Route name="dashboard-panel-edit" path="panel/edit/:index"
        handler={LigoIndexDashboardPanelEdit}/>
    </Route>
    <DefaultRoute name="dashboard" handler={TourDashboard}/>
  </Route>
);

/*
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login}/>
    <Route name="tbd" handler={TBD}/>
    <Route name="settings" handler={Settings}/>
    <Route name="activity" handler={Activity}>
      <Route name="activity-resource" path="*" handler={ActivityResource}/>
    </Route>
    <Route name="dashboard-edit" path="dashboard/edit" handler={DashboardEdit}>
      <Route name="dashboard-panel-add" path="panel/add" handler={DashboardPanelAdd}/>
      <Route name="dashboard-panel-edit" path="panel/edit/:index" handler={DashboardPanelEdit}/>
    </Route>
    <Route name="index-edit" path="index/edit/:category" handler={IndexEdit} />
    <DefaultRoute name="dashboard" handler={TourDashboard}/>
  </Route>
);
*/

module.exports = routes;
