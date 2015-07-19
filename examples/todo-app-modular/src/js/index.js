// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
require('../scss/index.scss');

var React = require('react');
var TodoApp = require('./TodoApp');

var element = document.getElementById('content');
React.render(React.createElement(TodoApp), element);

document.body.classList.remove('loading');
