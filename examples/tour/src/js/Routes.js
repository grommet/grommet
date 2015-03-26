// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;

var Ligo = require('ligo');
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

module.exports = routes;
