"use strict";

var _react = _interopRequireWildcard(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _portal = require("../../../utils/portal");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", _react.default.createRef());

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
      drop = _react.default.createElement(_.Drop, _extends({
        id: "drop-node",
        target: this.inputRef.current
      }, rest), "this is a test");
    }

    return _react.default.createElement(_Grommet.Grommet, null, _react.default.createElement("input", _extends({
      ref: this.inputRef
    }, inputProps)), drop);
  };

  return TestInput;
}(_react.Component);

describe('Drop', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    window.scrollTo = jest.fn();
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, null));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align left right top bottom', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        left: 'right',
        top: 'bottom'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align left random', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        left: 'random',
        bottom: 'bottom'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align right left top top', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        right: 'left',
        top: 'top'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align right right bottom top', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        right: 'right',
        bottom: 'top'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('align right random', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        right: 'random'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('invalid align', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      align: {
        whatever: 'right'
      }
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('no stretch', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      stretch: false
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('close', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, null));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
    (0, _reactTestingLibrary.cleanup)();
    expect(document.getElementById('drop-node')).toBeNull();
  });
  test('invoke onClickOutside', function () {
    var onClickOutside = jest.fn();
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      onClickOutside: onClickOutside
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
    (0, _reactTestingLibrary.fireEvent)(document, new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true
    }));
    expect(onClickOutside).toBeCalled();
  });
  test('resize', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, null));
    global.window.innerWidth = 1000;
    global.window.innerHeight = 1000;
    (0, _reactTestingLibrary.fireEvent)(window, new Event('resize', {
      bubbles: true,
      cancelable: true
    }));
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
  });
  test('restrict focus', function () {
    (0, _reactTestingLibrary.render)(_react.default.createElement(TestInput, {
      restrictFocus: true
    }));
    expect(document.activeElement).toMatchSnapshot();
    (0, _portal.expectPortal)('drop-node').toMatchSnapshot();
    (0, _reactTestingLibrary.cleanup)();
    expect(document.activeElement).toMatchSnapshot();
  });
});