// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("!style!css!sass!index.scss");

var React = require('react');
var Router = require('react-router');
//var Ligo = require('ligo');
/*
var LigoIndex = Ligo.Index;
var menuConfig = require('./MenuConfig');
var indexConfig = require('./IndexConfig');
*/
var routes = require('./Routes');

var router = Router.create({routes: routes}); //, location: Router.HistoryLocation});

router.run(function (Handler) {
  var factory = React.createFactory(Handler);
  var element = document.getElementById('content');
  React.render(factory(), element);
});

document.body.classList.remove('loading');

/*
Ligo.init({
  title: 'Ligo Tour',
  background: require('../img/piano_player.jpg'),
  logo: Logo,
  copyright: '2015 Hewlett Packard',
  menu: menuConfig,
  routes: routes,
  mainContainerId: 'app'
});

LigoIndex.init(indexConfig);

Ligo.start();
*/
