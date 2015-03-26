// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

require("!style!css!sass!index.scss");
require('imports?this=>window!modernizr');

var Ligo = require('ligo');
var LigoIndex = Ligo.Index;
var Logo = require('./Logo');
var Routes = require('./Routes');
var menuConfig = require('./MenuConfig');
var indexConfig = require('./IndexConfig');

/* Example of overriding functions:
var SessionActions = Ligo.SessionActions;
SessionActions.login = function (user, password) {
  window.alert("Tour action " + user);
}
*/

Ligo.init({
  title: 'Ligo Tour',
  background: require('../img/piano_player.jpg'),
  logo: Logo,
  copyright: '2015 Hewlett Packard',
  menu: menuConfig,
  routes: Routes
});

LigoIndex.init(indexConfig);

// timeout for development of prerender version
//setTimeout(function () {
Ligo.start();
//}, 5000);
