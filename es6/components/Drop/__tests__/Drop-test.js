function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import 'jest-styled-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { expectPortal } from '../../../utils/portal';
import { Grommet } from '../../Grommet';
import { Drop } from '..';
var customTheme = {
  global: {
    drop: {
      shadowSize: 'large'
    }
  }
};

var TestInput = /*#__PURE__*/function (_Component) {
  _inheritsLoose(TestInput, _Component);

  function TestInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      showDrop: false
    });

    _defineProperty(_assertThisInitialized(_this), "inputRef", React.createRef());

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
        theme = _this$props.theme,
        elevation = _this$props.elevation,
        containerTarget = _this$props.containerTarget,
        rest = _objectWithoutPropertiesLoose(_this$props, ["inputProps", "theme", "elevation", "containerTarget"]);

    var showDrop = this.state.showDrop;
    var drop;

    if (showDrop) {
      drop = /*#__PURE__*/React.createElement(Drop, _extends({
        id: "drop-node",
        elevation: elevation,
        target: this.inputRef.current
      }, rest), "this is a test");
    }

    return /*#__PURE__*/React.createElement(Grommet, {
      theme: theme,
      containerTarget: containerTarget
    }, /*#__PURE__*/React.createElement("input", _extends({
      ref: this.inputRef
    }, inputProps)), drop);
  };

  return TestInput;
}(Component);

describe('Drop', function () {
  afterEach(cleanup);
  test('basic', function () {
    window.scrollTo = jest.fn();
    render( /*#__PURE__*/React.createElement(TestInput, null));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align left right top bottom', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        left: 'right',
        top: 'bottom'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align left left', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        left: 'left',
        bottom: 'bottom'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right left top top', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        right: 'left',
        top: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('align right right', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        right: 'right'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('invalid align', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      align: {
        whatever: 'right'
      }
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('no stretch', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      stretch: false
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('close', function () {
    render( /*#__PURE__*/React.createElement(TestInput, null));
    expectPortal('drop-node').toMatchSnapshot();
    cleanup();
    expect(document.getElementById('drop-node')).toBeNull();
  });
  test('invoke onClickOutside', function () {
    var onClickOutside = jest.fn();
    render( /*#__PURE__*/React.createElement(TestInput, {
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
    render( /*#__PURE__*/React.createElement(TestInput, null));
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    fireEvent(window, new Event('resize', {
      bubbles: true,
      cancelable: true
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('restrict focus', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      restrictFocus: true
    }));
    expect(document.activeElement).toMatchSnapshot();
    expectPortal('drop-node').toMatchSnapshot();
    cleanup();
    expect(document.activeElement).toMatchSnapshot();
  });
  test('default elevation renders', function () {
    render( /*#__PURE__*/React.createElement(TestInput, null));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('theme elevation renders', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      theme: customTheme
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('props elevation renders', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      theme: customTheme,
      elevation: "medium"
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('plain renders', function () {
    render( /*#__PURE__*/React.createElement(TestInput, {
      plain: true
    }));
    expectPortal('drop-node').toMatchSnapshot();
  });
  test('default containerTarget', function () {
    var _render = render( /*#__PURE__*/React.createElement(TestInput, {
      "data-testid": "drop"
    })),
        getByTestId = _render.getByTestId;

    var actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
    expect(actualRoot).toBe(document.body);
  });
  test('custom containerTarget', function () {
    var target = document.createElement('div');
    document.body.appendChild(target);

    try {
      var _render2 = render( /*#__PURE__*/React.createElement(TestInput, {
        "data-testid": "drop",
        containerTarget: target
      })),
          getByTestId = _render2.getByTestId;

      var actualRoot = getByTestId('drop').parentNode.parentNode.parentNode;
      expect(actualRoot).toBe(target);
    } finally {
      document.body.removeChild(target);
    }
  });
});