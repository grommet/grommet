"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'NIS',
  minimumFractionDigits: 2
});
var columns = [{
  property: 'key',
  header: 'Key',
  primary: true,
  footer: 'Total'
}, {
  property: 'name',
  header: _react.default.createElement(_grommet.Text, null, "Name with extra"),
  primary: true,
  footer: 'Total'
}, {
  property: 'location',
  header: 'Location'
}, {
  property: 'date',
  header: 'Due',
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
      },
      alignSelf: "center"
    }, _react.default.createElement(_grommet.Meter, {
      values: [{
        value: datum.percent,
        color: "accent-" + (datum.key % 4 + 1)
      }],
      thickness: "small",
      size: "xxsmall",
      type: "circle"
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
var DATA = [{
  key: 1,
  name: 'Ilana',
  location: 'Bay Area',
  date: '',
  percent: 0,
  paid: 0
}, {
  key: 2,
  name: 'Oorestisime',
  location: 'Paris',
  date: '2019-06-10',
  percent: 30,
  paid: 1234
}, {
  key: 3,
  name: 'Chris',
  location: 'Bay Area',
  date: '2019-06-09',
  percent: 40,
  paid: 2345
}, {
  key: 4,
  name: 'Eric',
  location: 'Bay Area',
  date: '2019-06-11',
  percent: 80,
  paid: 3456
}, {
  key: 5,
  name: 'Shimi',
  location: 'Fort Collins',
  date: '2019-06-10',
  percent: 60,
  paid: 1234
}, {
  key: 6,
  name: 'Jet',
  location: 'Bay Area',
  date: '2019-06-09',
  percent: 40,
  paid: 3456
}, {
  key: 7,
  name: 'Mike',
  location: 'Boise',
  date: '2019-06-11',
  percent: 50,
  paid: 1234
}, {
  key: 8,
  name: 'Alex',
  location: 'Hillsborough',
  date: '2019-06-10',
  percent: 10,
  paid: 2345
}, {
  key: 9,
  name: 'Alan',
  location: '',
  date: '',
  percent: 0,
  paid: 0
}, {
  key: 10,
  name: 'Bryan',
  location: 'Fort Collins',
  date: '2019-06-10',
  percent: 30,
  paid: 1234
}, {
  key: 11,
  name: 'Jens',
  location: 'Fort Collins',
  date: '2019-06-09',
  percent: 40,
  paid: 2345
}, {
  key: 12,
  name: 'Dana',
  location: 'Fort Collins',
  date: '2019-06-11',
  percent: 80,
  paid: 3456
}, {
  key: 13,
  name: 'Tracy',
  location: 'Bay Area',
  date: '2019-06-10',
  percent: 60,
  paid: 1234
}, {
  key: 14,
  name: 'Greg',
  location: 'Fort Collins',
  date: '2019-06-09',
  percent: 40,
  paid: 3456
}, {
  key: 15,
  name: 'Brittany',
  location: 'Fort Collins',
  date: '2019-06-11',
  percent: 50,
  paid: 1234
}, {
  key: 16,
  name: 'Madhu',
  location: 'Seattle',
  date: '2019-06-10',
  percent: 10,
  paid: 2345
}, {
  key: 17,
  name: 'Ian',
  location: '',
  date: '',
  percent: 0,
  paid: 0
}, {
  key: 18,
  name: 'Cheri',
  location: 'Fort Collins',
  date: '2019-06-10',
  percent: 30,
  paid: 1234
}, {
  key: 19,
  name: 'John',
  location: 'Fort Collins',
  date: '2019-06-09',
  percent: 40,
  paid: 2345
}, {
  key: 20,
  name: 'Jens',
  location: 'Fort Collins',
  date: '2019-06-11',
  percent: 80,
  paid: 3456
}, {
  key: 21,
  name: 'Greg',
  location: 'Fort Collins',
  date: '2019-06-10',
  percent: 60,
  paid: 1234
}, {
  key: 22,
  name: 'Karen',
  location: 'Fort Collins',
  date: '2019-06-09',
  percent: 40,
  paid: 3456
}, {
  key: 23,
  name: 'Michael',
  location: 'Boise',
  date: '2019-06-11',
  percent: 50,
  paid: 1234
}, {
  key: 24,
  name: 'Tracy',
  location: 'San Francisco',
  date: '2019-06-10',
  percent: 10,
  paid: 2345
}, {
  key: 25,
  name: 'Alex',
  location: 'Hillsborough',
  date: '2019-06-09',
  percent: 40,
  paid: 3456
}, {
  key: 26,
  name: 'Brittany',
  location: 'Fort Collins',
  date: '2019-06-11',
  percent: 50,
  paid: 1234
}, {
  key: 27,
  name: 'Madhu',
  location: 'Seattle',
  date: '2019-06-10',
  percent: 10,
  paid: 2345
}, {
  key: 28,
  name: 'Ian',
  location: '',
  date: '',
  percent: 0,
  paid: 0
}, {
  key: 29,
  name: 'Cheri',
  location: 'Fort Collins',
  date: '2019-06-10',
  percent: 30,
  paid: 1234
}, {
  key: 30,
  name: 'John',
  location: 'Fort Collins',
  date: '2019-06-09',
  percent: 40,
  paid: 2345
}];

var InfiniteScrollDataTable = function InfiniteScrollDataTable() {
  var step = 10;

  var load = function load() {
    console.log("InfiniteScroll fires onMore after loading " + step + " items");
  };

  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Heading, {
    level: 3
  }, _react.default.createElement(_grommet.Box, {
    gap: "small"
  }, _react.default.createElement("strong", null, "InfiniteScroll embedded in DataTable"), _react.default.createElement(_grommet.Text, null, "Scroll down to load more data, open console to see loading info"))), _react.default.createElement(_grommet.DataTable, {
    columns: columns,
    data: DATA,
    step: step,
    onMore: function onMore() {
      return load();
    }
  })));
};

(0, _react2.storiesOf)('DataTable', module).add('Infinitescroll', function () {
  return _react.default.createElement(InfiniteScrollDataTable, null);
});