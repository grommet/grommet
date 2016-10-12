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
    filters: '{quantity, plural,\n  =0 {フィルター}\n  =1 {1つのフィルター}\n  ' + 'other {#個のフィルター}\n}'
  }
}, _enUS2.default, {
  Active: 'アクティブ',
  Alerts: 'アラート',
  All: 'すべて',
  AxisLabel: '{orientation}軸',
  area: '領域',
  Bar: 'バー',
  bar: 'バー',
  Blank: '空白',
  Box: 'ボックス',
  Category: 'カテゴリ',
  Circle: '円',
  Chart: 'グラフ',
  Clear: 'クリア',
  Cleared: 'クリア済み',
  Close: '閉じる',
  'Close Menu': 'メニューを閉じる',
  Completed: '完了',
  created: '作成済み',
  Critical: '重大',
  Disabled: '無効',
  Distribution: '配布',
  Email: '電子メール',
  Error: 'エラー',
  Filter: 'フィルター',
  Footer: 'フッター',
  HotSpotsLabel: 'ホットスポット: 矢印キーを押して対話操作する',
  'GraphValues': 'グラフには{count}個の項目があります。最高は{highest}、' + ' 最小は{smallest}です',
  'Grommet Logo': 'Grommetロゴ',
  'Layer': 'レイヤー',
  line: '線',
  'Loading': 'ロード中',
  loginInvalidPassword: 'ユーザー名とパスワードを指定してください。',
  'Log In': 'ログイン',
  Logout: 'ログアウト',
  'Main Content': 'メインコンテンツ',
  Max: '最大',
  Menu: 'メニュー',
  Meter: 'メートル',
  Min: '最小',
  model: 'モデル',
  modified: '変更済み',
  monitor: 'モニター',
  Name: '名前',
  OK: 'OK',
  Open: '開く',
  Password: 'パスワード',
  'Previous Slide': 'ユーザー名を保存する',
  Resource: 'リソース',
  Running: '実行中',
  Search: '検索',
  'Skip to': 'スキップ先',
  Sort: 'ソート',
  State: '状態',
  Status: 'ステータス',
  SunBurstLabel: 'サンバースト: 矢印キーを押して対話操作する',
  'Tab Contents': '[{activeTitle}] タブの内容',
  Tasks: 'タスク',
  Time: '時刻',
  Title: 'タイトル',
  Total: '合計',
  Threshold: 'しきい値',
  Unknown: '不明',
  Username: 'ユーザー名',
  uri: 'URI',
  Value: '値',
  Warning: '警告'
}); // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

module.exports = exports['default'];