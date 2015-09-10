// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Route = require('react-router').Route;
//var DefaultRoute = require('react-router').DefaultRoute;

var MediumLogin = require('./MediumLogin');
var TBD = require('grommet/components/TBD');
//var IndexDashboardEdit = require('grommet/index/components/DashboardEdit');
//var IndexDashboardPanelAdd = require('grommet/index/components/DashboardPanelAdd');
//var IndexDashboardPanelEdit = require('grommet/index/components/DashboardPanelEdit');
var MediumApp = require('./MediumApp');
var MediumDashboard = require('./MediumDashboard');
var MediumSplit = require('./MediumSplit');
var Enclosures = require('./enclosures/Enclosures');
var Enclosure = require('./enclosures/Enclosure');
var EnclosureOverview = require('./enclosures/EnclosureOverview');
var Overview = require('./Overview');
var MediumMap = require('./MediumMap');
var ServerHardwares = require('./ServerHardwares');
var ServerHardware = require('./ServerHardware');
var ServerProfiles = require('./server-profiles/ServerProfiles');
var ServerProfile = require('./server-profiles/ServerProfile');
var ServerProfileOverview = require('./server-profiles/ServerProfileOverview');
var ServerProfileAdd = require('./server-profiles/ServerProfileAdd');
var ServerProfileEdit = require('./server-profiles/ServerProfileEdit');
var ServerProfileDelete = require('./server-profiles/ServerProfileDelete');
var MediumActivity = require('./MediumActivity');
var MediumActivityResource = require('./MediumActivityResource');

var rootPath = "/medium-app/";
if (NODE_ENV === 'development') {
  rootPath = "/"; // webpack-dev-server
}

var INDEX_MAP = {
  "enclosures": {
    label: 'enclosures',
    categoryRoute: 'enclosures',
    resourceRoute: 'enclosure'
  },
  "server-hardware": {
    label: 'serverHardware',
    categoryRoute: 'server hardwares',
    resourceRoute: 'server hardware'
  },
  "server-profiles": {
    label: 'serverProfiles',
    categoryRoute: 'server profiles',
    resourceRoute: 'server profile'
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
        route += ' ' + view;
      }
      result = router.makePath(route, {splat: uri});
    }
    return result;
  },

  routes: (
    <Route name="medium" path={rootPath} handler={MediumApp}>
      <Route name="login" handler={MediumLogin}/>
      <Route name="dashboard" path={rootPath} handler={MediumDashboard}/>
      <Route handler={MediumSplit}>
        <Route name="tbd" handler={TBD}/>
        <Route name="settings" handler={TBD}/>
        <Route name="activity" handler={MediumActivity}>
          <Route name="activity resource" path={rootPath + "activity/*"}
            handler={MediumActivityResource} />
        </Route>
        <Route name="enclosures" handler={Enclosures}>
          <Route name="enclosure"
            path={rootPath + "enclosures/"} handler={Enclosure}>
            <Route name="enclosure overview"
              path={rootPath + "enclosures/overview/*"}
              handler={EnclosureOverview} />
            <Route name="enclosure map"
              path={rootPath + "enclosures/map/*"}
              handler={MediumMap} />
            <Route name="enclosure activity"
              path={rootPath + "enclosures/activity/*"}
              handler={TBD} />
          </Route>
        </Route>
        <Route name="server hardwares"
          path={rootPath + "server-hardware"} handler={ServerHardwares}>
          <Route name="server hardware"
            path={rootPath + "server-hardware/"} handler={ServerHardware}>
            <Route name="server hardware overview"
              path={rootPath + "server-hardware/overview/*"}
              handler={Overview} />
            <Route name="server hardware map"
              path={rootPath + "server-hardware/map/*"}
              handler={MediumMap} />
            <Route name="server hardware activity"
              path={rootPath + "server-hardware/activity/*"}
              handler={TBD} />
          </Route>
        </Route>
        <Route name="server profiles" handler={ServerProfiles}>
          <Route name="server profile add" handler={ServerProfileAdd} />
          <Route name="server profile"
            path={rootPath + "server-profiles/"} handler={ServerProfile}>
            <Route name="server profile overview"
              path={rootPath + "server-profiles/overview/*"}
              handler={ServerProfileOverview} />
            <Route name="server profile map"
              path={rootPath + "server-profiles/map/*"}
              handler={MediumMap} />
            <Route name="server profile activity"
              path={rootPath + "server-profiles/activity/*"}
              handler={TBD} />
            <Route name="server profile edit"
              path={rootPath + "server-profiles/edit/*"}
              handler={ServerProfileEdit} />
            <Route name="server profile delete"
              path={rootPath + "server-profiles/delete/*"}
              handler={ServerProfileDelete} />
          </Route>
        </Route>
        <Route name="switches" handler={TBD} />
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
