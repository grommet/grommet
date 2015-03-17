// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');

var _data = {
  appTitle: null,
  menu: [],
  title: null,
  documentTitle: null,
  recents: [],
  search: null,
  activeMenu: [], // menu matching search, if any
  suggestions: [],
  activeRecents: [], // matching search, if any
  routerState: null,
  // New Nav exploration
  pages: [],
  highlightPages: [],
  activePages: [],
  activeHighlightPages: []
};

function setup(appTitle, menu) {
  _data.appTitle = appTitle;
  _data.menu = menu;
  _data.activeMenu = menu;
  _data.suggestions = [];
  _data.recents = JSON.parse(localStorage.getItem('NavStore__recents') || '[]');
  _data.activeRecents = _data.recents.slice(0, 5);

  _data.pages = [];
  _data.highlightPages = [];
  _data.menu.forEach(function (section) {
    section.forEach(function (page) {
      _data.pages.push(page);
      if (page.icon) {
        _data.highlightPages.push(page);
      }
    });
  });
  // sort alphabetically
  _data.pages.sort(function (p1, p2) {
    return +(p1.label > p2.label) || +(p1.label === p2.label) - 1;
  });
  _data.activePages = _data.pages;
  _data.activeHighlightPages = _data.highlightPages;
}

function setRoute(routerState) {
  _data.title = _data.appTitle;
  _data.search = null;
  if (routerState.routes.length > 1) {
    var routeName = routerState.routes[1].name;
    _data.menu.some(function (section) {
      return section.some(function (page) {
        if (routeName === page.route || routeName === page.resourceRoute) {
          if ('app' !== page.route) {
            _data.title = page.label;
          }
          return true;
        }
      });
    });
  }
  _data.documentTitle = _data.title;
}

function setRecent(route, name, href) {
  _data.documentTitle = name;
  // remove if we already have this one
  _data.recents.some(function (recent, index) {
    if (recent.href === href) {
      _data.recents.splice(index, 1);
      return true;
    }
  });

  _data.recents.unshift({
    name: name,
    href: href,
    route: route
  });
  // max of 20 here, will prune in search
  _data.recents.splice(20, 20);
  localStorage.setItem('NavStore__recents', JSON.stringify(_data.recents));
}

function search(text) {
  _data.search = text;
  var exp = new RegExp('^' + text.toLowerCase() + '|\\s' + text.toLowerCase(), 'i');

  _data.activeMenu = _data.menu.map(function (section) {
    return section.map(function (page) {
      if (exp.test(page.label)) {
        return page;
      } else {
        return null;
      }
    }).filter(function (page) {
      return (page !== null);
    });
  }).filter(function (section) {
    return (section.length > 0);
  });

  _data.activePages = _data.pages.filter(function (page) {
    return (exp.test(page.label));
  });
  _data.activeHighlightPages = _data.highlightPages.filter(function (page) {
    return (exp.test(page.label));
  });
  if (_data.activePages.length <= 5) {
    // filter out anything already highlighted
    _data.activePages = _data.activePages.filter(function (page) {
      return (! page.icon);
    });
  }

  _data.activeRecents = _data.recents.filter(function (recent) {
    return exp.test(recent.name);
  }).slice(0, 5);

  _data.suggestions = []; // will be filled out when server responds
}

function setSuggestions(response) {
  _data.suggestions = response.members;
}

var NavStore = _.extend({}, EventEmitter.prototype, {

  // public methods used by Controller-View to operate on data
  getAll: function() {
    return _data;
  },

  // Allow Controller-View to register itself with store
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  // triggers change listener above, firing controller-view callback
  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {

      case Constants.ActionTypes.NAV_SETUP:
        setup(action.args.title, action.args.menu);
        NavStore.emitChange();
        break;

      case Constants.ActionTypes.ROUTE_CHANGE:
        setRoute(action.routerState);
        NavStore.emitChange();
        break;

      case Constants.ActionTypes.NAV_SEARCH:
        search(action.text);
        NavStore.emitChange();
        break;

      case Constants.ActionTypes.NAV_SEARCH_SUGGESTIONS_RESULT:
        setSuggestions(action.response);
        NavStore.emitChange();
        break;

      case Constants.ActionTypes.NAV_CHANGE:
        setRecent(action.route, action.name, action.href);
        NavStore.emitChange();
        break;

    }
  })

});

module.exports = NavStore;
