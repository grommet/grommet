// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("!style!css!sass!index.scss");

var React = require('react');
var Router = require('react-router');
var Rest = require('grommet/utils/Rest');
//var Index = require('grommet/index/index'); /// TODO: refactor
//var indexConfig = require('./IndexConfig'); /// TODO: refactor
var Routes = require('./Routes');
var merge = require('lodash/object/merge');

Rest.setHeaders({
  'Accept': 'application/json',
  'X-API-Version': 200
});

var router = Router.create({routes: Routes.routes, location: Router.HistoryLocation});

//Index.init(indexConfig); /// TODO: refactor

router.run(function (Handler) {
  var element = document.getElementById('content');
  var locale = window.navigator.userLanguage || window.navigator.language;
  var messages = merge(require('grommet/messages/'+locale), require('../messages/'+locale));
  React.render(<Handler locales={locale} messages={messages} />, element);
});

document.body.classList.remove('loading');
