// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require('index.scss');

var React = require('react');
var Router = require('react-router');
var Rest = require('grommet/utils/Rest');
var RestWatch = require('grommet/utils/RestWatch');
var Locale = require('grommet/utils/Locale');
//var Index = require('grommet/index/index'); /// TODO: refactor
//var indexConfig = require('./IndexConfig'); /// TODO: refactor
var Routes = require('./Routes');

// The port number needs to align with devServerProxy and websocketHost in gulpfile.js
var hostName = __DEV_MODE__ ? 'localhost:8010' : window.location.host.split(':')[0];

RestWatch.initialize('ws://' + hostName + '/rest/ws');

Rest.setHeaders({
  'Accept': 'application/json',
  'X-API-Version': 200
});

var router = Router.create({routes: Routes.routes, location: Router.HistoryLocation});

//Index.init(indexConfig); /// TODO: refactor

router.run(function (Handler) {
  var element = document.getElementById('content');
  var locale = Locale.getCurrentLocale();
  var localeData;
  try {
    localeData = Locale.getLocaleData(require('../messages/' + locale));
  } catch (e) {
    localeData = Locale.getLocaleData(require('../messages/en-US'));
  }

  React.render(<Handler locales={localeData.locale} messages={localeData.messages} />, element);
});

document.body.classList.remove('loading');
