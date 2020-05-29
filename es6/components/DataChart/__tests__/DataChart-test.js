import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { DataChart } from '..';
var data = [{
  a: 1,
  b: 'one'
}, {
  a: 2,
  b: 'two'
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
    }].map(function (size) {
      return /*#__PURE__*/React.createElement(DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        size: size
      });
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
      render: function render(i) {
        return data[i].b;
      }
    }].map(function (xAxis) {
      return /*#__PURE__*/React.createElement(DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        xAxis: xAxis
      });
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
      render: function render(v) {
        return v;
      }
    }].map(function (yAxis) {
      return /*#__PURE__*/React.createElement(DataChart, {
        data: data,
        chart: {
          key: 'a'
        },
        yAxis: yAxis
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});