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
  Active: '活动',
  Alerts: '警报',
  All: '全部',
  AxisLabel: '{orientation} 轴',
  area: '区域',
  Bar: '栏',
  bar: '栏',
  Blank: '空白',
  Box: '框',
  Category: '类别',
  Circle: '圆',
  Chart: '图表',
  Clear: '清除',
  Cleared: '已清除',
  Close: '关闭',
  'Close Menu': '关闭菜单',
  Completed: '已完成',
  created: '已创建',
  Critical: '严重',
  Disabled: '已禁用',
  Distribution: '分布',
  Email: '电子邮件',
  Error: '错误',
  Filter: '筛选',
  Footer: '页脚',
  HotSpotsLabel: '热点: 按箭头键可与它进行交互',
  'GraphValues': '图有 {count} 项。最大值为 {highest}，' + ' 最小值为 {smallest}',
  'Grommet Logo': 'Grommet 徽标',
  'Layer': '层',
  line: '线',
  'Loading': '正在加载',
  loginInvalidPassword: '请提供用户名和密码。',
  'Log In': '登录',
  Logout: '注销',
  'Main Content': '主要内容',
  Max: '最大值',
  Menu: '菜单',
  Meter: '度量',
  Min: '最小值',
  model: '型号',
  modified: '已修改',
  monitor: '监控',
  Name: '名称',
  OK: '确定',
  Open: '打开',
  Password: '密码',
  'Previous Slide': '记住我',
  Resource: '资源',
  Running: '正在运行',
  Search: '搜索',
  'Skip to': '跳转到',
  Sort: '排序',
  State: '状况',
  Status: '状态',
  SunBurstLabel: '阳光: 按箭头键可与它进行交互',
  'Tab Contents': '{activeTitle} 选项卡内容',
  Tasks: '任务',
  Time: '时间',
  Title: '标题',
  Total: '总计',
  Threshold: '阈值',
  Unknown: '未知',
  Username: '用户名',
  uri: 'URI',
  Value: '值',
  Warning: '警告'
}); // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];