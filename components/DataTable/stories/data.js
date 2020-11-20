"use strict";

exports.__esModule = true;
exports.storageColumns = exports.storageData = exports.DATA = exports.data = exports.columns = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
var columns = [{
  property: 'name',
  header: /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "Name with extra"),
  primary: true,
  footer: 'Total'
}, {
  property: 'location',
  header: 'Location'
}, {
  property: 'date',
  header: 'Date',
  render: function render(datum) {
    return datum.date && new Date(datum.date).toLocaleDateString('en-US');
  },
  align: 'end'
}, {
  property: 'percent',
  header: 'Percent Complete',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        vertical: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      values: [{
        value: datum.percent
      }],
      thickness: "small",
      size: "small"
    }));
  }
}, {
  property: 'paid',
  header: 'Paid',
  render: function render(datum) {
    return amountFormatter.format(datum.paid / 100);
  },
  align: 'end',
  aggregate: 'sum',
  footer: {
    aggregate: true
  }
}];
exports.columns = columns;
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];
exports.data = data;

for (var i = 0; i < 40; i += 1) {
  data.push({
    name: "Name " + (i + 1),
    location: locations[i % locations.length],
    date: "2018-07-" + (i % 30 + 1),
    percent: i % 11 * 10,
    paid: (i + 1) * 17 % 1000
  });
}

var DATA = [{
  name: 'Alan',
  location: '',
  date: '',
  percent: 0,
  paid: 0
}, {
  name: 'Bryan',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 30,
  paid: 1234
}, {
  name: 'Chris',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 2345
}, {
  name: 'Eric',
  location: 'Palo Alto',
  date: '2018-06-11',
  percent: 80,
  paid: 3456
}, {
  name: 'Doug',
  location: 'Fort Collins',
  date: '2018-06-10',
  percent: 60,
  paid: 1234
}, {
  name: 'Jet',
  location: 'Palo Alto',
  date: '2018-06-09',
  percent: 40,
  paid: 3456
}, {
  name: 'Michael',
  location: 'Boise',
  date: '2018-06-11',
  percent: 50,
  paid: 1234
}, {
  name: 'Tracy',
  location: 'San Francisco',
  date: '2018-06-10',
  percent: 10,
  paid: 2345
}];
exports.DATA = DATA;
var storageData = [{
  id: 'mjbpiclthh8y',
  poolName: 'Asup-array01-lvs',
  arrays: 'asup-array01-lvs',
  size: 16099511627776,
  pinnable: 2099511627776,
  pinned: 699511627776,
  savings: [{
    unit: 'TiB',
    value: 12.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'hx5f2e57phfb',
  poolName: 'Dev-K8-Sym-R5-3',
  arrays: 'harm-stage-array01',
  size: 224520271234567,
  pinnable: 5099511627776,
  pinned: 2699511627776,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'om2hy2z79kyz',
  poolName: 'Dev36-erray01',
  arrays: 'harm-stage-array02',
  size: 190655321234567,
  pinnable: 4099511627776,
  pinned: 2699511627776,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 3955.2
  }]
}, {
  id: '6d9u4hv95xjq',
  poolName: 'asup-array1',
  arrays: 'harm-stage-array04',
  size: 130655321234567,
  pinnable: 3099511627776,
  pinned: 699511627776,
  savings: [{
    unit: 'TiB',
    value: 110.6
  }, {
    unit: 'xGHz',
    value: 3.9
  }]
}, {
  id: 'qpsidi3ccnpr',
  poolName: 'Dev-K8-Sym-R5-3',
  arrays: 'Harm-cs-stage-R4-5',
  size: 68994941234567,
  pinnable: 3199511627776,
  pinned: 2699511627776,
  savings: [{
    unit: 'TiB',
    value: 128.5
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'l3d8xkm0knx4',
  poolName: 'asup-array2',
  arrays: 'ds-array02',
  size: 90655321234567,
  pinnable: 11199511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 3955.2
  }]
}, {
  id: 'jsjas87qeqgj',
  poolName: 'Dev36-varray02',
  arrays: 'ds-array01',
  size: 101655321234567,
  pinnable: 12399511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}];
exports.storageData = storageData;
var storageColumns = [{
  property: 'poolName',
  header: 'Pool Name',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: true
    }, datum.poolName);
  }
}, {
  property: 'size',
  primary: true,
  header: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "text-strong",
    weight: "bold"
  }, "Size", ' ', /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xsmall",
    weight: "normal",
    color: "text"
  }, "(TiB)")),
  render: function render(datum) {
    return (// bytes to tebibytes
      (datum.size / Math.pow(2, 40)).toFixed([1])
    );
  },
  align: 'end'
}, {
  property: 'pinned',
  header: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: {
      horizontal: 'small',
      vertical: 'xsmall'
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "text-strong",
    weight: "bold"
  }, "Pinned", ' ', /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xsmall",
    weight: "normal",
    color: "text"
  }, "%"))),
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Tip, {
      plain: true,
      dropProps: {
        align: {
          left: 'right'
        },
        stretch: false
      },
      content: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        background: "light-4",
        align: "center",
        justify: "center",
        width: "xxsmall",
        height: "xxsmall",
        round: "full",
        flex: false,
        margin: "xsmall"
      }, Math.trunc(datum.pinned / datum.pinnable * 100))
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        vertical: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      values: [{
        value: datum.pinned / datum.pinnable,
        color: 'graph-0'
      }],
      max: 1,
      thickness: "small",
      size: "small"
    })));
  },
  sortable: false
}, {
  property: 'savings',
  header: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "text-strong",
    weight: "bold"
  }, "Savings", ' ', /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xsmall",
    weight: "normal",
    color: "text"
  }, "(xGHz)")),
  align: 'end',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: true
    }, datum.savings[1] && "" + datum.savings[1].value);
  }
}];
exports.storageColumns = storageColumns;