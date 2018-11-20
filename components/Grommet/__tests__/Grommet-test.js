"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _ = require("..");

var _contexts = require("../../../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TestAnnouncer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TestAnnouncer, _Component);

  function TestAnnouncer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TestAnnouncer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var announce = this.props.announce;
    announce('hello', 'assertive');
  };

  _proto.render = function render() {
    return _react.default.createElement("div", null, "hi");
  };

  return TestAnnouncer;
}(_react.Component);

_defineProperty(TestAnnouncer, "propTypes", {
  announce: _propTypes.default.func.isRequired
});

describe('Grommet', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('hpe theme', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, {
      theme: _grommetThemeHpe.hpe
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('full', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, {
      full: true
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('announce', function (done) {
    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_contexts.AnnounceContext.Consumer, null, function (announce) {
      return _react.default.createElement(TestAnnouncer, {
        announce: announce
      });
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot(); // no style, no need for expectPortal

    expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
    setTimeout(function () {
      // should clear the aria-live container
      expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
      done();
    }, 600); // wait the aria-live container to clear
  });
});