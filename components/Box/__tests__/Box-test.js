"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Box', function () {
  test('default', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      direction: "row"
    }), _react.default.createElement(_.Box, {
      direction: "row-responsive"
    }), _react.default.createElement(_.Box, {
      direction: "column"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      responsive: true
    }), _react.default.createElement(_.Box, {
      responsive: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('wrap', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      wrap: true
    }), _react.default.createElement(_.Box, {
      wrap: false
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      justify: "start"
    }), _react.default.createElement(_.Box, {
      justify: "center"
    }), _react.default.createElement(_.Box, {
      justify: "between"
    }), _react.default.createElement(_.Box, {
      justify: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      align: "start"
    }), _react.default.createElement(_.Box, {
      align: "center"
    }), _react.default.createElement(_.Box, {
      align: "baseline"
    }), _react.default.createElement(_.Box, {
      align: "stretch"
    }), _react.default.createElement(_.Box, {
      align: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      alignContent: "start"
    }), _react.default.createElement(_.Box, {
      alignContent: "center"
    }), _react.default.createElement(_.Box, {
      alignContent: "between"
    }), _react.default.createElement(_.Box, {
      alignContent: "around"
    }), _react.default.createElement(_.Box, {
      alignContent: "stretch"
    }), _react.default.createElement(_.Box, {
      alignContent: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignSelf', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      alignSelf: "start"
    }), _react.default.createElement(_.Box, {
      alignSelf: "center"
    }), _react.default.createElement(_.Box, {
      alignSelf: "stretch"
    }), _react.default.createElement(_.Box, {
      alignSelf: "end"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('background', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      background: "brand"
    }), _react.default.createElement(_.Box, {
      background: "accent-1"
    }), _react.default.createElement(_.Box, {
      background: "neutral-1"
    }), _react.default.createElement(_.Box, {
      background: "light-1"
    }), _react.default.createElement(_.Box, {
      background: "dark-1"
    }), _react.default.createElement(_.Box, {
      background: "status-critical"
    }), _react.default.createElement(_.Box, {
      background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)"
    }), _react.default.createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: false
      }
    }), _react.default.createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: true
      }
    }), _react.default.createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        position: 'top center'
      }
    }), _react.default.createElement(_.Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        color: 'accent-1'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basis', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, null, _react.default.createElement(_.Box, {
      basis: "xsmall"
    }), _react.default.createElement(_.Box, {
      basis: "small"
    }), _react.default.createElement(_.Box, {
      basis: "medium"
    }), _react.default.createElement(_.Box, {
      basis: "large"
    }), _react.default.createElement(_.Box, {
      basis: "xlarge"
    })), _react.default.createElement(_.Box, {
      direction: "row"
    }, _react.default.createElement(_.Box, {
      basis: "full"
    })), _react.default.createElement(_.Box, {
      direction: "row"
    }, _react.default.createElement(_.Box, {
      basis: "1/2"
    }), _react.default.createElement(_.Box, {
      basis: "2/4"
    })), _react.default.createElement(_.Box, {
      direction: "row"
    }, _react.default.createElement(_.Box, {
      basis: "1/3"
    }), _react.default.createElement(_.Box, {
      basis: "2/3"
    })), _react.default.createElement(_.Box, {
      direction: "row"
    }, _react.default.createElement(_.Box, {
      basis: "1/4"
    }), _react.default.createElement(_.Box, {
      basis: "3/4"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('flex', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, null, _react.default.createElement(_.Box, {
      flex: true
    }), _react.default.createElement(_.Box, {
      flex: false
    }), _react.default.createElement(_.Box, {
      flex: "grow"
    }), _react.default.createElement(_.Box, {
      flex: "shrink"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, null, _react.default.createElement(_.Box, {
      fill: true
    }), _react.default.createElement(_.Box, {
      fill: false
    }), _react.default.createElement(_.Box, {
      fill: "horizontal"
    }), _react.default.createElement(_.Box, {
      fill: "vertical"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large'].map(function (gap) {
      return _react.default.createElement(_.Box, {
        key: gap,
        gap: gap,
        direction: "row"
      }, _react.default.createElement(_.Box, null));
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      margin: "small"
    }), _react.default.createElement(_.Box, {
      margin: "medium"
    }), _react.default.createElement(_.Box, {
      margin: "large"
    }), _react.default.createElement(_.Box, {
      margin: {
        horizontal: 'small'
      }
    }), _react.default.createElement(_.Box, {
      margin: {
        vertical: 'small'
      }
    }), _react.default.createElement(_.Box, {
      margin: {
        bottom: 'small'
      }
    }), _react.default.createElement(_.Box, {
      margin: {
        left: 'small'
      }
    }), _react.default.createElement(_.Box, {
      margin: {
        right: 'small'
      }
    }), _react.default.createElement(_.Box, {
      margin: {
        top: 'small'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      pad: "small"
    }), _react.default.createElement(_.Box, {
      pad: "medium"
    }), _react.default.createElement(_.Box, {
      pad: "large"
    }), _react.default.createElement(_.Box, {
      pad: {
        horizontal: 'small'
      }
    }), _react.default.createElement(_.Box, {
      pad: {
        vertical: 'small'
      }
    }), _react.default.createElement(_.Box, {
      pad: {
        bottom: 'small'
      }
    }), _react.default.createElement(_.Box, {
      pad: {
        left: 'small'
      }
    }), _react.default.createElement(_.Box, {
      pad: {
        right: 'small'
      }
    }), _react.default.createElement(_.Box, {
      pad: {
        top: 'small'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gridArea', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      gridArea: "header"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      round: true
    }), _react.default.createElement(_.Box, {
      round: "xsmall"
    }), _react.default.createElement(_.Box, {
      round: "small"
    }), _react.default.createElement(_.Box, {
      round: "medium"
    }), _react.default.createElement(_.Box, {
      round: "large"
    }), _react.default.createElement(_.Box, {
      round: "full"
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'left'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'top'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'right'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'bottom'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'top-left'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'top-right'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'bottom-left'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        corner: 'bottom-right'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        size: 'xsmall'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        size: 'small'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        size: 'medium'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        size: 'large'
      }
    }), _react.default.createElement(_.Box, {
      round: {
        size: 'xlarge'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      border: "all"
    }), _react.default.createElement(_.Box, {
      border: "horizontal"
    }), _react.default.createElement(_.Box, {
      border: "vertical"
    }), _react.default.createElement(_.Box, {
      border: "top"
    }), _react.default.createElement(_.Box, {
      border: "left"
    }), _react.default.createElement(_.Box, {
      border: "bottom"
    }), _react.default.createElement(_.Box, {
      border: "right"
    }), _react.default.createElement(_.Box, {
      border: {
        color: 'accent-1'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        side: 'all'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        size: 'xsmall'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        size: 'small'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        size: 'medium'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        size: 'large'
      }
    }), _react.default.createElement(_.Box, {
      border: {
        size: 'xlarge'
      }
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('elevation', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      elevation: "none"
    }), _react.default.createElement(_.Box, {
      elevation: "xsmall"
    }), _react.default.createElement(_.Box, {
      elevation: "small"
    }), _react.default.createElement(_.Box, {
      elevation: "medium"
    }), _react.default.createElement(_.Box, {
      elevation: "large"
    }), _react.default.createElement(_.Box, {
      elevation: "xlarge"
    }), _react.default.createElement(_.Box, {
      background: "dark-1",
      elevation: "small"
    }, _react.default.createElement(_.Box, {
      elevation: "small"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('tag', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      tag: "header"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('animation', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (type) {
      return _react.default.createElement(_.Box, {
        key: type,
        animation: type
      });
    }), _react.default.createElement(_.Box, {
      animation: ['fadeIn', 'slideUp']
    }), _react.default.createElement(_.Box, {
      animation: {
        type: 'fadeIn',
        duration: 1000,
        delay: 500
      }
    }), _react.default.createElement(_.Box, {
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
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      width: "xsmall"
    }), _react.default.createElement(_.Box, {
      width: "small"
    }), _react.default.createElement(_.Box, {
      width: "medium"
    }), _react.default.createElement(_.Box, {
      width: "large"
    }), _react.default.createElement(_.Box, {
      width: "xlarge"
    }), _react.default.createElement(_.Box, {
      width: "111px"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('height', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Box, {
      height: "xsmall"
    }), _react.default.createElement(_.Box, {
      height: "small"
    }), _react.default.createElement(_.Box, {
      height: "medium"
    }), _react.default.createElement(_.Box, {
      height: "large"
    }), _react.default.createElement(_.Box, {
      height: "xlarge"
    }), _react.default.createElement(_.Box, {
      height: "111px"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});