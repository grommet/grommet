// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("!style!css!sass!index.scss");

var React = require('react');
var Router = require('react-router');
var Index = require('grommet/index/index');
var indexConfig = require('./IndexConfig');
var routes = require('./Routes');

var router = Router.create({routes: routes, location: Router.HistoryLocation});

Index.init(indexConfig);

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('content');
  React.render(factory(), element);
});

document.body.classList.remove('loading');
