"use strict";

exports.__esModule = true;
exports["default"] = exports.ResizablePinnedDataTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _grommet = require("grommet");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var data = [{
  id: 'b0:2a:43:52:48:c5',
  macAddress: 'b0:2a:43:52:48:c5',
  ipAddress: '192.168.0.20',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Chromecast',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: '00:d0:2d:32:b6:cd',
  macAddress: '00:d0:2d:32:b6:cd',
  ipAddress: '192.168.0.24',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Gateway32B6CD',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: 'd8:6c:63:46:13:03',
  macAddress: 'd8:6c:63:46:13:03',
  ipAddress: '192.168.0.19',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Amazon-Firestick',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: 'f4:f5:d8:c0:e2:9c',
  macAddress: 'f4:f5:d8:c0:e2:9c',
  ipAddress: '192.168.0.21',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Google-Home',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: '38:f9:d3:b7:09:4e',
  macAddress: '38:f9:d3:b7:09:4e',
  ipAddress: '192.168.0.21',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Daras-MBP',
  networkBand: {
    value: 5,
    unit: 'GHz'
  },
  linkRate: {
    value: 702,
    unit: 'Mbps'
  }
}, {
  id: '10:40:f3:85:67:44',
  macAddress: '10:40:f3:85:67:44',
  ipAddress: '192.168.0.13',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Daras-Air',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 78,
    unit: 'Mbps'
  }
}, {
  id: 'a4:f1:e8:27:e7:1c',
  macAddress: 'a4:f1:e8:27:e7:1c',
  ipAddress: '192.168.0.11',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'iPhone',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 24,
    unit: 'Mbps'
  }
}, {
  id: '10:e7:c6:cb:f8:58',
  macAddress: '10:e7:c6:cb:f8:58',
  ipAddress: '192.168.0.22',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'HPCBF857',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 24,
    unit: 'Mbps'
  }
}, {
  id: '44:07:0b:ba:1e:eb',
  macAddress: '44:07:0b:ba:1e:eb',
  ipAddress: '192.168.0.18',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Google-Home-Mini',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: '00:f6:20:60:15:d0',
  macAddress: '00:f6:20:60:15:d0',
  ipAddress: '192.168.0.17',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Amazon-Alexa',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 72,
    unit: 'Mbps'
  }
}, {
  id: '30:fd:38:88:49:f4',
  macAddress: '30:fd:38:88:49:f4',
  ipAddress: '192.168.0.16',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'Google-Home-Mini',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 292,
    unit: 'Mbps'
  }
}, {
  id: '7c:b0:c2:5c:94:a5',
  macAddress: '7c:b0:c2:5c:94:a5',
  ipAddress: '192.168.0.26',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'N/A',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 6,
    unit: 'Mbps'
  }
}, {
  id: 'E0:5F:45:96:F4:DD',
  macAddress: 'E0:5F:45:96:F4:DD',
  ipAddress: '192.168.0.25',
  hostname: 'wh7-dureal50',
  connectionType: 'Wireless',
  category: 'Network',
  status: 'Active',
  deviceName: 'N/A',
  networkBand: {
    value: 2.4,
    unit: 'GHz'
  },
  linkRate: {
    value: 1,
    unit: 'Mbps'
  }
}];
var columns = [{
  primary: true,
  property: 'macAddress',
  header: 'MAC address',
  render: function render(datum) {
    return datum.macAddress;
  },
  pin: true
}, {
  property: 'ipAddress',
  header: 'IP V4',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: "tip"
    }, datum.ipAddress);
  },
  size: 'xsmall',
  align: 'end'
}, {
  property: 'hostname',
  header: 'Hostname',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: "tip"
    }, datum.hostname);
  },
  size: 'xsmall'
}, {
  property: 'connectionType',
  header: 'Connection type'
}, {
  property: 'category',
  header: 'Category'
}, {
  property: 'deviceName',
  header: 'Device name',
  render: function render(datum) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
      truncate: "tip"
    }, datum.deviceName);
  },
  size: 'xsmall'
}, {
  property: 'status',
  header: 'Status'
}, {
  property: 'networkBand.value',
  header: 'Network band',
  units: 'GHz',
  render: function render(datum) {
    return datum.networkBand.value;
  },
  align: 'end'
}, {
  property: 'linkRate.value',
  header: 'Link rate',
  units: 'Mbps',
  render: function render(datum) {
    return datum.linkRate.value;
  },
  align: 'end'
}];
var ResizablePinnedDataTable = exports.ResizablePinnedDataTable = function ResizablePinnedDataTable() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: "3"
  }, "Table with resizable & column sizes"), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "start",
    height: "medium"
    // restricting width to demonstrate pinned column behavior
    ,
    width: {
      width: 'xxlarge',
      max: '100%'
    },
    overflow: "auto"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.DataTable, {
    "aria-describedby": "connected-heading",
    data: data,
    columns: columns,
    pin: true,
    resizeable: true
  })))
  // </Grommet>
;
};
ResizablePinnedDataTable.storyName = 'Resizable pinned columns';
var _default = exports["default"] = {
  title: 'Visualizations/DataTable/Resizable pinned columns'
};