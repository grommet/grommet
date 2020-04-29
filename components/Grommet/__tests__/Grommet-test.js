"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _grommetThemeHpe = require("grommet-theme-hpe");

var _ = require("..");

var _Heading = require("../../Heading");

var _contexts = require("../../../contexts");

var _grommet = require("../../../themes/grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TestAnnouncer = function TestAnnouncer(_ref) {
  var announce = _ref.announce;

  _react["default"].useEffect(function () {
    return announce('hello', 'assertive');
  });

  return _react["default"].createElement("div", null, "hi");
};

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
};

var SSRTester = function SSRTester(_ref2) {
  var ua = _ref2.ua;
  return _react["default"].createElement(_.Grommet, {
    theme: customBreakpointsTheme,
    userAgent: ua
  }, _react["default"].createElement(_contexts.ResponsiveContext.Consumer, null, function (size) {
    return _react["default"].createElement(_Heading.Heading, null, "Received size " + size + " for " + ua);
  }));
};

describe('Grommet', function () {
  afterEach(_react2.cleanup);
  test('basic', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, null));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('grommet theme', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      theme: _grommet.grommet
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('hpe theme', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      theme: _grommetThemeHpe.hpe
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('themeMode', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      theme: _grommet.grommet,
      themeMode: "dark"
    }));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('cssVars', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      cssVars: true
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('full', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      full: true
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('background', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_.Grommet, {
      full: true,
      background: "#0000ff"
    }, "Grommet App"));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('announce', function (done) {
    var _render = (0, _react2.render)(_react["default"].createElement(_.Grommet, null, _react["default"].createElement(_contexts.AnnounceContext.Consumer, null, function (announce) {
      return _react["default"].createElement(TestAnnouncer, {
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
  [
  /* eslint-disable max-len */
  'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A452 Safari/601.1 PTST/396', 'Mozilla/5.0 (iPad; CPU OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 [FBAN/FBIOS;FBAV/156.0.0.41.97;FBBV/89172188;FBDV/iPad5,3;FBMD/iPad;FBSN/iOS;FBSV/11.2.1;FBSS/2;FBCR/;FBID/tablet;FBLC/en_GB;FBOP/5;FBRV/0]', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
  /* eslint-enable max-len */
  ].forEach(function (ua) {
    test("ssr rendering " + ua.substring(0, 25), function () {
      var component = _reactTestRenderer["default"].create(_react["default"].createElement(SSRTester, {
        ua: ua
      }));

      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});