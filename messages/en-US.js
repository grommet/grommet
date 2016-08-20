'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _enUS = require('./icons/en-US');

var _enUS2 = _interopRequireDefault(_enUS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({
  IndexFilters: {
    filters: '{quantity, plural,\n  =0 {Filters}\n  =1 {one filter}\n  ' + 'other {# filters}\n}'
  }
}, _enUS2.default, {
  Active: 'Active',
  Alerts: 'Alerts',
  All: 'All',
  AxisLabel: '{orientation} Axis',
  area: 'area',
  Bar: 'Bar',
  bar: 'bar',
  Blank: 'Blank',
  Box: 'Box',
  Category: 'Category',
  Circle: 'Circle',
  Chart: 'Chart',
  Clear: 'Clear',
  Cleared: 'Cleared',
  Close: 'Close',
  'Close Menu': 'Close Menu',
  Completed: 'Completed',
  created: 'Created',
  Critical: 'Critical',
  Disabled: 'Disabled',
  Distribution: 'Distribution',
  Email: 'Email',
  Error: 'Error',
  Filter: 'Filter',
  Footer: 'Footer',
  HotSpotsLabel: 'HotSpots: press arrow keys to interact with it',
  'GraphValues': 'Graph has {count} items. Highest is {highest}' + ' and smallest is {smallest}',
  'Grommet Logo': 'Grommet Logo',
  'Layer': 'Layer',
  line: 'line',
  'Loading': 'Loading',
  loginInvalidPassword: 'Please provide Username and Password.',
  'Log In': 'Log In',
  Logout: 'Logout',
  'Main Content': 'Main Content',
  Max: 'Max',
  Menu: 'Menu',
  Meter: 'Meter',
  Min: 'Min',
  model: 'Model',
  modified: 'Modified',
  monitor: 'monitor',
  Name: 'Name',
  OK: 'OK',
  Open: 'Open',
  Password: 'Password',
  'Remember me': 'Remember me',
  Resource: 'Resource',
  Running: 'Running',
  Search: 'Search',
  'Skip to': 'Skip to',
  Sort: 'Sort',
  State: 'State',
  Status: 'Status',
  SunBurstLabel: 'SunBurst: press arrow keys to interact with it',
  'Tab Contents': '{activeTitle} Tab Contents',
  Tasks: 'Tasks',
  Time: 'Time',
  Title: 'Title',
  Total: 'Total',
  Threshold: 'Threshold',
  Unknown: 'Unknown',
  Username: 'Username',
  uri: 'URI',
  Value: 'Value',
  Warning: 'Warning'
}); // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];