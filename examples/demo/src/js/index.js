// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("!style!css!sass!index.scss");

var Ligo = require('ligo');
var Logo = require('./Logo');
var Routes = require('./Routes');
var menuConfig = require('./MenuConfig');

Ligo.init({
  title: 'Todo App',
  background: require('../img/task_background.jpg'),
  logo: Logo,
  copyright: '2015 All rights reserved.',
  menu: menuConfig,
  routes: Routes,
  mainContainerId: 'app'
});

// timeout for development of prerender version
//setTimeout(function () {
Ligo.start();
//}, 5000);
