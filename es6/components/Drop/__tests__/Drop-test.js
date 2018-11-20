function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from 'react-testing-library';
import { expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { Drop } from '..';

var TestInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TestInput, _Component);

  function TestInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      showDrop: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", React.createRef());

    return _this;
  }

  var _proto = TestInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      showDrop: true
    }); // eslint-disable-line
  };

  _proto.render = function render() {
    var _this$props = this.props,
        inputProps = _this$props.inputProps,
        rest = _objectWithoutPropertiesLoose(_this$props, ["inputProps"]);

    var showDrop = this.state.showDrop;
    var drop;

    if (showDrop) {
      drop = React.createElement(Drop, _extends({
        id: "drop-node",
        target: this.inputRef.current
      }, rest), "this is a test");
    }

    return React.createElement(Grommet, null, React.createElement("input", _extends({
      ref: this.inputRef
    }, inputProps)), drop);
  };

  return TestInput;
}(Component);

describe('Drop', function () {
  afterEach(cleanup);
  test('basic', function () {
    window.scrollTo = jest.fn();
    render(React.createElement(TestInput, null));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align left right top bottom', function () {
    render(React.createElement(TestInput, {
      align: {
        left: 'right',
        top: 'bottom'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    render(React.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align left random', function () {
    render(React.createElement(TestInput, {
      align: {
        left: 'random',
        bottom: 'bottom'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right left top top', function () {
    render(React.createElement(TestInput, {
      align: {
        right: 'left',
        top: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    render(React.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right random', function () {
    render(React.createElement(TestInput, {
      align: {
        right: 'random'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('invalid align', function () {
    render(React.createElement(TestInput, {
      align: {
        whatever: 'right'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('no stretch', function () {
    render(React.createElement(TestInput, {
      stretch: false
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('close', function () {
    render(React.createElement(TestInput, null));
    expectPortal('drop-node').toMatchSnapshot();
    cleanup();
    expect(document.getElementById('drop-node')).toBeNull();
  });
  test('invoke onClickOutside', function () {
    var onClickOutside = jest.fn();
    render(React.createElement(TestInput, {
      onClickOutside: onClickOutside
    }));
    expectPortal('drop-node').toMatchSnapshot();
    fireEvent(document, new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    }));
    expect(onClickOutside).toBeCalled();
  });
  test('resize', function () {
    render(React.createElement(TestInput, null));
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    fireEvent(window, new Event('resize', {
      bubbles: true,
      cancelable: true
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('restrict focus', function () {
    render(React.createElement(TestInput, {
      restrictFocus: true
    }));
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();
    cleanup();
    expect(document.activeElement).toMatchSnapshot();
  });
});