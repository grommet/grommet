"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
var columns = [{
  property: 'name',
  header: _react.default.createElement(_grommet.Text, null, "Name with extra"),
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
    return _react.default.createElement(_grommet.Box, {
      pad: {
        vertical: 'xsmall'
      }
    }, _react.default.createElement(_grommet.Meter, {
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
var locations = ['Boise', 'Fort Collins', 'Los Gatos', 'Palo Alto', 'San Francisco'];
var data = [];

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

var SimpleDataTable = function SimpleDataTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.DataTable, {
    columns: columns,
    data: DATA,
    step: 10
  })));
};

var SizedDataTable = function SizedDataTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.DataTable, {
    columns: columns,
    data: data,
    size: "medium"
  })));
};

var TunableDataTable = function TunableDataTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.DataTable, {
    columns: columns.map(function (c) {
      return _extends({}, c, {
        search: c.property === 'name' || c.property === 'location'
      });
    }),
    data: DATA,
    sortable: true,
    resizeable: true
  })));
};

var groupColumns = [].concat(columns);
var first = groupColumns[0];
groupColumns[0] = _extends({}, groupColumns[1]);
groupColumns[1] = _extends({}, first);
groupColumns[0].footer = groupColumns[1].footer;
delete groupColumns[1].footer;

var GroupedDataTable = function GroupedDataTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.DataTable, {
    columns: groupColumns,
    data: DATA,
    groupBy: "location",
    sortable: true
  }));
};

var ServedDataTable =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ServedDataTable, _Component);

  function ServedDataTable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      data: DATA
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (search) {
      var nextData;

      if (search) {
        var expressions = Object.keys(search).map(function (property) {
          return {
            property: property,
            exp: new RegExp(search[property], 'i')
          };
        });
        nextData = DATA.filter(function (d) {
          return !expressions.some(function (e) {
            return !e.exp.test(d[e.property]);
          });
        });
      } else {
        nextData = DATA;
      }

      _this.setState({
        data: nextData
      });
    });

    return _this;
  }

  var _proto = ServedDataTable.prototype;

  _proto.render = function render() {
    var servedData = this.state.data;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, _react.default.createElement(_grommet.DataTable, {
      columns: columns.map(function (column) {
        return _extends({}, column, {
          search: column.property === 'name' || column.property === 'location'
        });
      }),
      data: servedData,
      onSearch: this.onSearch
    })));
  };

  return ServedDataTable;
}(_react.Component);

var controlledColumns = columns.map(function (col) {
  return Object.assign({}, col);
});
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

var ControlledDataTable =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(ControlledDataTable, _Component2);

  function ControlledDataTable() {
    var _this2;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this2), "state", {
      checked: []
    });

    _defineProperty(_assertThisInitialized(_this2), "onCheck", function (event, value) {
      var checked = _this2.state.checked;

      if (event.target.checked) {
        checked.push(value);

        _this2.setState({
          checked: checked
        });
      } else {
        _this2.setState({
          checked: checked.filter(function (item) {
            return item !== value;
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this2), "onCheckAll", function (event) {
      return _this2.setState({
        checked: event.target.checked ? DATA.map(function (datum) {
          return datum.name;
        }) : []
      });
    });

    return _this2;
  }

  var _proto2 = ControlledDataTable.prototype;

  _proto2.render = function render() {
    var _this3 = this;

    var checked = this.state.checked;
    return _react.default.createElement(_grommet.Grommet, {
      theme: _themes.grommet
    }, _react.default.createElement(_grommet.Box, {
      align: "center",
      pad: "medium"
    }, _react.default.createElement(_grommet.DataTable, {
      columns: [{
        property: 'checkbox',
        render: function render(datum) {
          return _react.default.createElement(_grommet.CheckBox, {
            key: datum.name,
            checked: checked.indexOf(datum.name) !== -1,
            onChange: function onChange(e) {
              return _this3.onCheck(e, datum.name);
            }
          });
        },
        header: _react.default.createElement(_grommet.CheckBox, {
          checked: checked.length === DATA.length,
          indeterminate: checked.length > 0 && checked.length < DATA.length,
          onChange: this.onCheckAll
        }),
        sortable: false
      }].concat(controlledColumns).map(function (col) {
        return _extends({}, col);
      }),
      data: DATA,
      sortable: true,
      size: "medium"
    })));
  };

  return ControlledDataTable;
}(_react.Component);

(0, _react2.storiesOf)('DataTable', module).add('Simple', function () {
  return _react.default.createElement(SimpleDataTable, null);
}).add('Sized', function () {
  return _react.default.createElement(SizedDataTable, null);
}).add('Tunable', function () {
  return _react.default.createElement(TunableDataTable, null);
}).add('Grouped', function () {
  return _react.default.createElement(GroupedDataTable, null);
}).add('Served', function () {
  return _react.default.createElement(ServedDataTable, null);
}).add('Controlled', function () {
  return _react.default.createElement(ControlledDataTable, null);
});