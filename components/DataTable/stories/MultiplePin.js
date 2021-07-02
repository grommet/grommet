"use strict";

exports.__esModule = true;
exports["default"] = exports.MultiplePins = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [{
  id: 'mjbpiclthh8y',
  poolName: 'Asup-array01-lvs (default)',
  groupName: 'Asup',
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
  poolName: 'Dev-K8-Sym-R5-3 (default)',
  groupName: 'Dev',
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
  poolName: 'Dev36-erray01 (default)',
  groupName: 'Dev',
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
  poolName: 'asup-array1 (default)',
  groupName: 'Asup',
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
  poolName: 'Dev-K8-Sym-R5-3 (default)',
  groupName: 'Dev',
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
  poolName: 'asup-array2 (default)',
  groupName: 'Asup',
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
  poolName: 'Dev36-varray02 (default)',
  groupName: 'Dev',
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
}, {
  id: '1jrnzxds9419',
  poolName: 'DevHarmCs2R39',
  groupName: 'Dev',
  arrays: 'harm-stage-array03',
  size: 7900321234567,
  pinnable: 129511627776,
  pinned: 7804321432,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'lva18ol56t7a',
  poolName: 'DevStageSymR31 (default)',
  groupName: 'Dev',
  arrays: 'rtp-array198',
  size: 70655321234567,
  pinnable: 1529511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'g9v1104koten',
  poolName: 'asup-array2 (default)',
  groupName: 'Asup',
  arrays: 'ds-array02',
  size: 5655321234567,
  pinnable: 12529511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 3955.2
  }]
}, {
  id: 'ny13xepj8wyc',
  poolName: 'Dev36-varray02 (default)',
  groupName: 'Dev',
  arrays: 'ds-array01',
  size: 655321234567,
  pinnable: 1329511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'vz86u3ll4ai2',
  poolName: 'DevHarmCs2R39',
  groupName: 'Dev',
  arrays: 'harm-stage-array03',
  size: 52655321234567,
  pinnable: 2529511627776,
  pinned: 0,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}, {
  id: 'f1iucu2ybzf3',
  poolName: 'DevStageSymR31 (default)',
  groupName: 'Dev',
  arrays: 'rtp-array198',
  size: 30655321234567,
  pinnable: 22529511627776,
  pinned: 7529511627776,
  savings: [{
    unit: 'TiB',
    value: 8.0
  }, {
    unit: 'xGHz',
    value: 333.2
  }]
}];
var columns = [{
  property: 'arrays',
  header: 'Arrays',
  render: function render(_ref) {
    var arrays = _ref.arrays;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: true
    }, arrays);
  },
  sortable: false
}, {
  property: 'size',
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
  property: 'pinnable',
  header: /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    color: "text-strong",
    weight: "bold"
  }, "Pinnable", ' ', /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "xsmall",
    weight: "normal",
    color: "text"
  }, "(B)")),
  render: function render(datum) {
    return (// bytes to tebibytes
      (datum.pinnable / Math.pow(2, 40)).toFixed([1])
    );
  },
  align: 'end',
  pin: true,
  footer: 'Pinnable'
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
  render: function render(_ref2) {
    var pinnable = _ref2.pinnable,
        pinned = _ref2.pinned;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        vertical: 'xsmall'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Meter, {
      values: [{
        value: pinned / pinnable,
        color: 'graph-2'
      }],
      max: 1,
      thickness: "small",
      size: "small"
    }));
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
  render: function render(_ref3) {
    var savings = _ref3.savings;
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: true
    }, savings[1] && "" + savings[1].value);
  }
}];

var handleClickRow = function handleClickRow(obj) {
  // eslint-disable-next-line no-alert
  alert("\n  Record was clicked:\n  {\n      id: " + obj.id + ",\n      poolName: " + obj.poolName + "\n  }\n\n  You can use onClickRow() to navigate to a record's detail\n  page, open a panel or modal to edit the record, or perform\n  other actions as you see fit.\n  ");
};

var MultiplePins = function MultiplePins() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _grommet.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    height: "medium",
    width: "600px",
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    background: {
      pinned: 'pink'
    },
    data: data,
    columns: [{
      property: 'id',
      header: 'Id',
      primary: true,
      render: function render(datum) {
        return datum.id.slice(datum.id.length - 5);
      },
      pin: true
    }, {
      property: 'poolName',
      header: 'Pool Name',
      render: function render(_ref4) {
        var poolName = _ref4.poolName;
        return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
          truncate: true
        }, poolName);
      },
      primary: true,
      pin: true
    }, {
      property: 'groupName',
      header: 'Group Name',
      pin: true
    }].concat(columns),
    fill: true,
    onClickRow: function onClickRow(_ref5) {
      var datum = _ref5.datum;
      return handleClickRow(datum);
    },
    pin: true,
    onSelect: function onSelect() {},
    sortable: true
  }))));
};

exports.MultiplePins = MultiplePins;
MultiplePins.storyName = 'Multiple pins';
var _default = {
  title: 'Visualizations/DataTable/Multiple pins'
};
exports["default"] = _default;