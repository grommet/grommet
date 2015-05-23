// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

module.exports = {
  Activity: {
    status: 'Status',
    name: 'Name',
    time: 'Time',
    state: 'State',
    category: 'Category',
    resource: 'Resource',
    filter: {
      error: 'Error',
      warning: 'Warning',
      ok: 'OK',
      unknown: 'Unknown',
      active: 'Active',
      cleared: 'Cleared',
      running: 'Running',
      completed: 'Completed',
      alerts: 'Alerts',
      tasks: 'Tasks'
    }
  },
  Index: {
    name: 'Name'
  },
  IndexFilters: {
    all: 'All',
    filters: '{quantity, plural,\n  =0 {Filters}\n  =1 {one filter}\n  other {# filters}\n}'
  },
  IndexHeader: {
    search: 'Search'
  },
  Task: {
    unknown: 'Unknown'
  },
  LoginForm: {
    btn_label: 'Log In',
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me'
  },
  Search: {
    placeHolder: 'Search'
  },
  Session: {
    logout: 'Logout'
  },
  LOGIN_INVALID_PASSWORD: 'Please provide Username and Password.'
};
