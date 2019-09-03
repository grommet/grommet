function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, DataTable, Meter, Text, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
var columns = [{
  property: 'name',
  header: React.createElement(Text, null, "Name with extra"),
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
    return React.createElement(Box, {
      pad: {
        vertical: 'xsmall'
      }
    }, React.createElement(Meter, {
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
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10
  })));
};

var ClickableDataTable = function ClickableDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: DATA,
    step: 10,
    onClickRow: function onClickRow(event) {
      return alert(JSON.stringify(event.datum, null, 2));
    }
  })));
};

var SizedDataTable = function SizedDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns,
    data: data,
    size: "medium"
  })));
};

var TunableDataTable = function TunableDataTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
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
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(DataTable, {
    columns: groupColumns,
    data: DATA,
    groupBy: "location",
    sortable: true
  }));
};

var ServedDataTable = function ServedDataTable() {
  var _React$useState = React.useState(DATA),
      data2 = _React$useState[0],
      setData2 = _React$useState[1];

  var onSearch = function onSearch(search) {
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

    setData2(nextData);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(DataTable, {
    columns: columns.map(function (column) {
      return _extends({}, column, {
        search: column.property === 'name' || column.property === 'location'
      });
    }),
    data: data2,
    onSearch: onSearch
  })));
};

var controlledColumns = columns.map(function (col) {
  return _extends({}, col);
});
delete controlledColumns[0].footer;
delete controlledColumns[3].footer;
delete controlledColumns[4].footer;
delete controlledColumns[4].aggregate;

var ControlledDataTable = function ControlledDataTable() {
  var _React$useState2 = React.useState([]),
      checked = _React$useState2[0],
      setChecked = _React$useState2[1];

  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };

  var onCheckAll = function onCheckAll(event) {
    return setChecked(event.target.checked ? DATA.map(function (datum) {
      return datum.name;
    }) : []);
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, React.createElement(DataTable, {
    columns: [{
      property: 'checkbox',
      render: function render(datum) {
        return React.createElement(CheckBox, {
          key: datum.name,
          checked: checked.indexOf(datum.name) !== -1,
          onChange: function onChange(e) {
            return onCheck(e, datum.name);
          }
        });
      },
      header: React.createElement(CheckBox, {
        checked: checked.length === DATA.length,
        indeterminate: checked.length > 0 && checked.length < DATA.length,
        onChange: onCheckAll
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

storiesOf('DataTable', module).add('Simple', function () {
  return React.createElement(SimpleDataTable, null);
}).add('Clickable', function () {
  return React.createElement(ClickableDataTable, null);
}).add('Sized', function () {
  return React.createElement(SizedDataTable, null);
}).add('Tunable', function () {
  return React.createElement(TunableDataTable, null);
}).add('Grouped', function () {
  return React.createElement(GroupedDataTable, null);
}).add('Served', function () {
  return React.createElement(ServedDataTable, null);
}).add('Controlled', function () {
  return React.createElement(ControlledDataTable, null);
});