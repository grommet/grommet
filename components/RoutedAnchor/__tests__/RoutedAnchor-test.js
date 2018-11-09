"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _utils = require("../../../utils");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FakeRouter =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FakeRouter, _Component);

  function FakeRouter() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FakeRouter.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props = this.props,
        push = _this$props.push,
        replace = _this$props.replace;
    return {
      router: {
        history: {
          push: push,
          replace: replace
        }
      }
    };
  };

  _proto.render = function render() {
    var children = this.props.children;
    return _react.default.createElement("div", null, children);
  };

  return FakeRouter;
}(_react.Component);

_defineProperty(FakeRouter, "propTypes", {
  children: _propTypes.default.node.isRequired,
  push: _propTypes.default.func.isRequired,
  replace: _propTypes.default.func.isRequired
});

_defineProperty(FakeRouter, "childContextTypes", {
  router: _propTypes.default.shape({}).isRequired
});

describe('RoutedAnchor', function () {
  test('renders', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(FakeRouter, null, _react.default.createElement(_.RoutedAnchor, {
      label: "Test",
      path: "/"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('is clickable', function () {
    var preventDefault = jest.fn();
    var push = jest.fn();
    var onClick = jest.fn();

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(FakeRouter, {
      push: push
    }, _react.default.createElement(_.RoutedAnchor, {
      label: "Test",
      onClick: onClick
    }))));

    var tree = component.toJSON();
    var anchor = (0, _utils.findAllByType)(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(onClick).toBeCalled();
    expect(push).toBeCalled();
    expect(preventDefault).toBeCalled();
  });
  test('skips onClick if right clicked', function () {
    var onClick = jest.fn();

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(FakeRouter, null, _react.default.createElement(_.RoutedAnchor, {
      label: "Test",
      onClick: onClick
    }))));

    var tree = component.toJSON();
    var anchor = (0, _utils.findAllByType)(tree, 'a');
    anchor[0].props.onClick({
      ctrlKey: true
    });
    anchor[0].props.onClick({
      metaKey: true
    });
    expect(onClick).not.toBeCalled();
  });
  test('calls router context push', function () {
    var preventDefault = jest.fn();
    var push = jest.fn();

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(FakeRouter, {
      push: push
    }, _react.default.createElement(_.RoutedAnchor, {
      label: "Test",
      path: "/"
    }))));

    var tree = component.toJSON();
    var anchor = (0, _utils.findAllByType)(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(preventDefault).toBeCalled();
    expect(push).toBeCalledWith('/');
  });
  test('calls router context replace', function () {
    var preventDefault = jest.fn();
    var replace = jest.fn();

    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(FakeRouter, {
      replace: replace
    }, _react.default.createElement(_.RoutedAnchor, {
      label: "Test",
      path: "/",
      method: "replace"
    }))));

    var tree = component.toJSON();
    var anchor = (0, _utils.findAllByType)(tree, 'a');
    anchor[0].props.onClick({
      preventDefault: preventDefault
    });
    expect(preventDefault).toBeCalled();
    expect(replace).toBeCalledWith('/');
  });
});