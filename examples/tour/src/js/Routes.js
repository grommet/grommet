// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
//var DefaultRoute = require('react-router').DefaultRoute;

var TourLogin = require('./TourLogin');
var TBD = require('grommet/components/TBD');
//var IndexDashboardEdit = require('grommet/index/components/DashboardEdit');
//var IndexDashboardPanelAdd = require('grommet/index/components/DashboardPanelAdd');
//var IndexDashboardPanelEdit = require('grommet/index/components/DashboardPanelEdit');
var Tour = require('./Tour');
var TourDashboard = require('./TourDashboard');
var TourSplit = require('./TourSplit');
var Enclosures = require('./Enclosures');
var Enclosure = require('./Enclosure');
var Overview = require('./Overview');
var TourMap = require('./TourMap');
var Servers = require('./Servers');
var Server = require('./Server');
var TourActivity = require('./TourActivity');
var TourActivityResource = require('./TourActivityResource');

var rootPath = "/tour/";
if (__DEV_MODE__) {
  rootPath = "/"; // webpack-dev-server
}

var INDEX_MAP = {
  "enclosures": {
    label: 'Enclosures',
    categoryRoute: 'enclosures',
    resourceRoute: 'enclosure'
  },
  "server-hardware": {
    label: 'Servers',
    categoryRoute: 'servers',
    resourceRoute: 'server'
  }
};

module.exports = {

  categoryPath: function (router, indexCategory) {
    var result = null;
    var indexMap = INDEX_MAP[indexCategory];
    if (indexMap) {
      result = router.makePath(indexMap.categoryRoute);
    }
    return result;
  },

  categoryLabel: function (indexCategory) {
    var result = null;
    var indexMap = INDEX_MAP[indexCategory];
    if (indexMap) {
      result = indexMap.label;
    }
    return result;
  },

  resourcePath: function (router, indexCategory, uri, view) {
    var result = null;
    var indexMap = INDEX_MAP[indexCategory];
    if (indexMap) {
      var route = indexMap.resourceRoute;
      if (view) {
        route += '-' + view;
      }
      result = router.makePath(route, {splat: uri});
    }
    return result;
  },

  routes: (
    <Route name="tour" path={rootPath} handler={Tour}>
      <Route name="login" handler={TourLogin}/>
      <Route name="dashboard" path={rootPath} handler={TourDashboard}/>
      <Route handler={TourSplit}>
        <Route name="tbd" handler={TBD}/>
        <Route name="settings" handler={TBD}/>
        <Route name="activity" handler={TourActivity}>
          <Route name="activity-resource" path={rootPath + "activity/*"}
            handler={TourActivityResource} />
        </Route>
        <Route name="enclosures" handler={Enclosures}>
          <Route name="enclosure" path={rootPath + "enclosures/"} handler={Enclosure}>
            <Route name="enclosure-overview" path={rootPath + "enclosures/overview/*"}
              handler={Overview} />
            <Route name="enclosure-map" path={rootPath + "enclosures/map/*"}
              handler={TourMap} />
          </Route>
        </Route>
        <Route name="servers" handler={Servers}>
          <Route name="server" path={rootPath + "servers/"} handler={Server}>
            <Route name="server-overview" path={rootPath + "servers/overview/*"}
              handler={Overview} />
            <Route name="server-map" path={rootPath + "servers/map/*"}
              handler={TourMap} />
          </Route>
        </Route>
        <Route name="reports" handler={TBD} />
      </Route>
      <Route name="dashboard-edit" path="dashboard/edit"
        handler={TBD}>
        <Route name="dashboard-panel-add" path="panel/add"
          handler={TBD}/>
        <Route name="dashboard-panel-edit" path="panel/edit/:index"
          handler={TBD}/>
      </Route>
    </Route>
  )
};
