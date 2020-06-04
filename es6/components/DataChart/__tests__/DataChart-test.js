import React, { Fragment } from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { DataChart } from '..';
var data = [{
  a: 1,
  b: 'one',
  c: 111111
}, {
  a: 2,
  b: 'two',
  c: 222222
}];
describe('DataChart', function () {
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(DataChart, {
      data: data,
      chart: {
        key: 'a'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('thickness', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large', 'xlarge'].map(function (thickness) {
      return /*#__PURE__*/React.createElement(DataChart, {
        key: thickness,
        data: data,
        chart: {
          key: 'a'
        },
        thickness: thickness
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['small', 'medium', 'large'].map(function (gap) {
      return /*#__PURE__*/React.createElement(DataChart, {
        key: gap,
        data: data,
        chart: {
          key: 'a'
        },
        gap: gap
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['small', 'medium', 'large'].map(function (pad) {
      return /*#__PURE__*/React.createElement(DataChart, {
        key: pad,
        data: data,
        chart: {
          key: 'a'
        },
        pad: pad
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large', 'xlarge', {
      width: 'fill'
    }, {
      width: 'auto'
    }].map(function (size, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          size: size
        })
      );
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('xAxis', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, [true, false, {
      guide: true
    }, {
      key: 'b'
    }, {
      labels: 2
    }, {
      key: 'b',
      render: function render(b) {
        return b;
      }
    }].map(function (xAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          xAxis: xAxis
        })
      );
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('xAxis dates', function () {
    var dateData = [];

    for (var i = 0; i < 4; i += 1) {
      var digits = (i % 12 + 1).toString().padStart(2, 0);
      dateData.push({
        second: "2020-05-15T08:04:" + digits,
        minute: "2020-05-15T08:" + digits + ":00",
        hour: "2020-05-15T" + digits + ":00:00",
        day: "2020-05-" + digits + "T08:00:00",
        month: "2020-" + digits + "-15",
        year: "20" + digits + "-01-15",
        percent: Math.abs(i * 10),
        amount: i * 111111
      });
    }

    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['second', 'minute', 'hour', 'day', 'month', 'year'].map(function (key) {
      return /*#__PURE__*/React.createElement(Fragment, {
        key: key
      }, /*#__PURE__*/React.createElement(DataChart, {
        data: dateData,
        chart: {
          key: 'amount'
        },
        xAxis: {
          key: key,
          labels: 2
        }
      }), /*#__PURE__*/React.createElement(DataChart, {
        data: dateData,
        chart: {
          key: 'percent'
        },
        xAxis: {
          key: key
        }
      }));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('yAxis', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, [true, false, {
      guide: true
    }, {
      labels: 2
    }, {
      labels: 5
    }, {
      render: function render(v) {
        return v;
      }
    }, {
      prefix: '$'
    }, {
      suffix: '%'
    }].map(function (yAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'a'
          },
          yAxis: yAxis
        })
      );
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('yAxis rounding', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, [true, {
      labels: 4
    }].map(function (yAxis, i) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement(DataChart, {
          key: i,
          data: data,
          chart: {
            key: 'c'
          },
          yAxis: yAxis
        })
      );
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});