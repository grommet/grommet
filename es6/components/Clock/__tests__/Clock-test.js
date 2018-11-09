import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render } from 'react-testing-library';
import { Grommet } from '../../Grommet';
import { Clock } from '..';
var DURATION = 'PT18H23M34S';
var TIME = 'T18:23:34';
var TIME2 = 'T18:23';
var DATE = '2018-02-22T18:23:34-10:00';
describe('Clock', function () {
  afterEach(cleanup);
  test('time', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Clock, {
      run: false,
      type: "digital",
      time: DURATION
    }), React.createElement(Clock, {
      run: false,
      type: "digital",
      time: TIME
    }), React.createElement(Clock, {
      run: false,
      type: "digital",
      time: TIME2
    }), React.createElement(Clock, {
      run: false,
      type: "digital",
      time: DATE
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('hourLimit', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Clock, {
      run: false,
      type: "digital",
      time: DURATION,
      hourLimit: 12
    }), React.createElement(Clock, {
      run: false,
      type: "digital",
      time: DURATION,
      hourLimit: 24
    })));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('run', function (done) {
    var _render = render(React.createElement(Grommet, null, React.createElement(Clock, {
      type: "analog",
      run: "forward",
      time: DURATION
    }), React.createElement(Clock, {
      type: "analog",
      run: "backward",
      time: DURATION
    }), React.createElement(Clock, {
      type: "digital",
      run: "forward",
      time: DURATION
    }), React.createElement(Clock, {
      type: "digital",
      run: "backward",
      time: DURATION
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot(); // give some time for the clock to move and use the callback

    setTimeout(function () {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });
  ['analog', 'digital'].forEach(function (type) {
    return ['hours', 'minutes', 'seconds'].forEach(function (precision) {
      return ['xsmall', 'small', 'medium', 'large', 'xlarge'].forEach(function (size) {
        return test("type " + type + " precision " + precision + " size " + size, function () {
          var component = renderer.create(React.createElement(Grommet, null, React.createElement(Clock, {
            run: false,
            type: type,
            precision: precision,
            size: size,
            time: DURATION
          })));
          expect(component.toJSON()).toMatchSnapshot();
        });
      });
    });
  });
});