"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _react2 = require("@testing-library/react");

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Box', function () {
  afterEach(_react2.cleanup);
  test('default', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row-responsive"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "column"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "column-reverse"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row-reverse"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      responsive: true
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      responsive: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('wrap', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, [true, false, 'reverse'].map(function (wrap) {
      return /*#__PURE__*/_react["default"].createElement(_.Box, {
        key: "" + wrap,
        wrap: wrap
      });
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "start"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "center"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "between"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "around"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "evenly"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      justify: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      align: "start"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      align: "center"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      align: "baseline"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      align: "stretch"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      align: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "start"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "center"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "between"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "around"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "stretch"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignContent: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignSelf', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignSelf: "start"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignSelf: "center"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignSelf: "stretch"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      alignSelf: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  /* eslint-disable max-len */

  test('background', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "brand"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "accent-1"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "neutral-1"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "light-1"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "dark-1"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "status-critical"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "#aabbcc"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "#def"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "rgb(90, 80, 50)"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "rgba(200, 100, 150, 0.8)"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "hsl(10, 50%, 20%)"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "hsla(10, 50%, 70%, 0.7)"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: false
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: true
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        position: 'top center'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        color: 'accent-1'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        size: 'contain'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        repeat: 'repeat'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        opacity: 0.5
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  /* eslint-enable max-len */

  test('basis', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "xlarge"
    })), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "full"
    })), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "1/2"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "2/4"
    })), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "1/3"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "2/3"
    })), /*#__PURE__*/_react["default"].createElement(_.Box, {
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "1/4"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      basis: "3/4"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('flex', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: true
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: false
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: "grow"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: "shrink"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: {
        grow: 2
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: {
        shrink: 2
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      flex: {
        grow: 2,
        shrink: 2
      }
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      fill: true
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      fill: false
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      fill: "horizontal"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      fill: "vertical"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large', '80px', 'none'].map(function (gap) {
      return /*#__PURE__*/_react["default"].createElement(_.Box, {
        key: gap,
        gap: gap,
        direction: "row"
      }, /*#__PURE__*/_react["default"].createElement(_.Box, null));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        horizontal: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        vertical: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        bottom: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        left: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        right: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        start: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        end: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        top: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        top: 'small',
        left: 'medium',
        horizontal: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        top: 'small',
        vertical: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        horizontal: 'large',
        vertical: 'large',
        left: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        top: 'small',
        right: 'small',
        left: 'small',
        bottom: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      margin: {
        left: 'small',
        right: 'medium',
        bottom: 'large',
        top: 'small',
        horizontal: 'medium',
        vertical: 'small'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        horizontal: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        vertical: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        bottom: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        left: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        right: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        start: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        end: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        top: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        top: 'small',
        left: 'medium',
        horizontal: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        horizontal: 'large',
        vertical: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        top: 'small',
        right: 'medium',
        horizontal: 'small',
        vertical: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        top: 'medium',
        right: 'medium',
        left: 'medium',
        bottom: 'medium',
        horizontal: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      pad: {
        left: 'small',
        right: 'medium',
        bottom: 'large',
        top: 'small',
        horizontal: 'medium',
        vertical: 'small'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gridArea', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      gridArea: "header"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: true
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: "full"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'left'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'top'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'right'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'bottom'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'top-left'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'top-right'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'bottom-left'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        corner: 'bottom-right'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        size: 'xsmall'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        size: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        size: 'medium'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        size: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      round: {
        size: 'xlarge'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "all"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "horizontal"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "vertical"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "top"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "left"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "bottom"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "right"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        color: 'accent-1'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        side: 'all'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        size: 'xsmall'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        size: 'small'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        size: 'medium'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        size: 'large'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        size: 'xlarge'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        style: 'dotted'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        style: 'double'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: {
        style: 'dashed'
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: [{
        side: 'top',
        color: 'accent-1',
        size: 'medium',
        style: 'dotted'
      }, {
        side: 'left',
        color: 'accent-2',
        size: 'large',
        style: 'dashed'
      }]
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      border: "between",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, null, "one"), /*#__PURE__*/_react["default"].createElement(_.Box, null, "two"))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('elevation', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "none"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "xlarge"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      background: "dark-1",
      elevation: "small"
    }, /*#__PURE__*/_react["default"].createElement(_.Box, {
      elevation: "small"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      as: "header"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('tag proxied', function () {
    var tagComponent = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      tag: "header"
    })));

    var asComponent = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      as: "header"
    })));

    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });
  test('animation', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'rotateLeft', 'rotateRight', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (type) {
      return /*#__PURE__*/_react["default"].createElement(_.Box, {
        key: type,
        animation: type
      });
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      animation: ['fadeIn', 'slideUp']
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      animation: {
        type: 'fadeIn',
        duration: 1000,
        delay: 500
      }
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      animation: [{
        type: 'fadeIn',
        duration: 1000,
        delay: 500
      }, {
        type: 'slideUp',
        duration: 1000,
        delay: 500
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('width', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "xlarge"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      width: "111px"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('height', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "xlarge"
    }), /*#__PURE__*/_react["default"].createElement(_.Box, {
      height: "111px"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
    var onClick = jest.fn();

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Box, {
      onClick: onClick
    }, "test box"))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('test box'));

    expect(onClick).toBeCalled();
  });
});