"use strict";

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _ = require("..");

var _Heading = require("../../Heading");

var _contexts = require("../../../contexts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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

var customBreakpointsTheme = {
  global: {
    deviceBreakpoints: {
      phone: 'small',
      tablet: 'medium',
      computer: 'large'
    },
    breakpoints: {
      small: {
        value: 600
      },
      medium: {
        value: 800
      },
      large: {
        value: 1000
      }
    }
  }
}; // eslint-disable-next-line react/no-multi-comp

var SSRTester =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(SSRTester, _Component2);

  function SSRTester() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component2.call.apply(_Component2, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sizes", []);

    return _this;
  }

  var _proto2 = SSRTester.prototype;

  _proto2.render = function render() {
    var _this2 = this;

    var ua = this.props.ua;
    return _react.default.createElement(_.Grommet, {
      theme: customBreakpointsTheme,
      userAgent: ua
    }, _react.default.createElement(_contexts.ResponsiveContext.Consumer, null, function (size) {
      _this2.sizes.push(size);

      return _this2.sizes.map(function (s) {
        return _react.default.createElement(_Heading.Heading, {
          key: s
        }, "Received size " + s + " for " + ua);
      });
    }));
  };

  return SSRTester;
}(_react.Component);

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
  ['Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A452 Safari/601.1 PTST/396', 'Mozilla/5.0 (iPad; CPU OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 [FBAN/FBIOS;FBAV/156.0.0.41.97;FBBV/89172188;FBDV/iPad5,3;FBMD/iPad;FBSN/iOS;FBSV/11.2.1;FBSS/2;FBCR/;FBID/tablet;FBLC/en_GB;FBOP/5;FBRV/0]', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'].forEach(function (ua) {
    test("ssr rendering " + ua.substring(0, 25), function () {
      var component = _reactTestRenderer.default.create(_react.default.createElement(SSRTester, {
        ua: ua
      }));

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});