import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Box } from '..';
describe('Box', function () {
  afterEach(cleanup);
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row-responsive"
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "column"
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "column-reverse"
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row-reverse"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      responsive: true
    }), /*#__PURE__*/React.createElement(Box, {
      responsive: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('wrap', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, [true, false, 'reverse'].map(function (wrap) {
      return /*#__PURE__*/React.createElement(Box, {
        key: "" + wrap,
        wrap: wrap
      });
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      justify: "start"
    }), /*#__PURE__*/React.createElement(Box, {
      justify: "center"
    }), /*#__PURE__*/React.createElement(Box, {
      justify: "between"
    }), /*#__PURE__*/React.createElement(Box, {
      justify: "around"
    }), /*#__PURE__*/React.createElement(Box, {
      justify: "evenly"
    }), /*#__PURE__*/React.createElement(Box, {
      justify: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      align: "start"
    }), /*#__PURE__*/React.createElement(Box, {
      align: "center"
    }), /*#__PURE__*/React.createElement(Box, {
      align: "baseline"
    }), /*#__PURE__*/React.createElement(Box, {
      align: "stretch"
    }), /*#__PURE__*/React.createElement(Box, {
      align: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      alignContent: "start"
    }), /*#__PURE__*/React.createElement(Box, {
      alignContent: "center"
    }), /*#__PURE__*/React.createElement(Box, {
      alignContent: "between"
    }), /*#__PURE__*/React.createElement(Box, {
      alignContent: "around"
    }), /*#__PURE__*/React.createElement(Box, {
      alignContent: "stretch"
    }), /*#__PURE__*/React.createElement(Box, {
      alignContent: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignSelf', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      alignSelf: "start"
    }), /*#__PURE__*/React.createElement(Box, {
      alignSelf: "center"
    }), /*#__PURE__*/React.createElement(Box, {
      alignSelf: "stretch"
    }), /*#__PURE__*/React.createElement(Box, {
      alignSelf: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  /* eslint-disable max-len */

  test('background', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      background: "brand"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "accent-1"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "neutral-1"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "light-1"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "dark-1"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "status-critical"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "#aabbcc"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "#def"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "rgb(90, 80, 50)"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "rgba(200, 100, 150, 0.8)"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "hsl(10, 50%, 20%)"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "hsla(10, 50%, 70%, 0.7)"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)"
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: false
      }
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: true
      }
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        position: 'top center'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        color: 'accent-1'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        size: 'contain'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        repeat: 'repeat'
      }
    }), /*#__PURE__*/React.createElement(Box, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      basis: "xsmall"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "xlarge"
    })), /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Box, {
      basis: "full"
    })), /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Box, {
      basis: "1/2"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "2/4"
    })), /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Box, {
      basis: "1/3"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "2/3"
    })), /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Box, {
      basis: "1/4"
    }), /*#__PURE__*/React.createElement(Box, {
      basis: "3/4"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('flex', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      flex: true
    }), /*#__PURE__*/React.createElement(Box, {
      flex: false
    }), /*#__PURE__*/React.createElement(Box, {
      flex: "grow"
    }), /*#__PURE__*/React.createElement(Box, {
      flex: "shrink"
    }), /*#__PURE__*/React.createElement(Box, {
      flex: {
        grow: 2
      }
    }), /*#__PURE__*/React.createElement(Box, {
      flex: {
        shrink: 2
      }
    }), /*#__PURE__*/React.createElement(Box, {
      flex: {
        grow: 2,
        shrink: 2
      }
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      fill: true
    }), /*#__PURE__*/React.createElement(Box, {
      fill: false
    }), /*#__PURE__*/React.createElement(Box, {
      fill: "horizontal"
    }), /*#__PURE__*/React.createElement(Box, {
      fill: "vertical"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large', '80px', 'none'].map(function (gap) {
      return /*#__PURE__*/React.createElement(Box, {
        key: gap,
        gap: gap,
        direction: "row"
      }, /*#__PURE__*/React.createElement(Box, null));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      margin: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      margin: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      margin: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        horizontal: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        vertical: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        bottom: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        left: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        right: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        start: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        end: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        top: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        top: 'small',
        left: 'medium',
        horizontal: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        top: 'small',
        vertical: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        horizontal: 'large',
        vertical: 'large',
        left: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      margin: {
        top: 'small',
        right: 'small',
        left: 'small',
        bottom: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      pad: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      pad: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      pad: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        vertical: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        bottom: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        left: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        right: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        start: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        end: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        top: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        top: 'small',
        left: 'medium',
        horizontal: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        horizontal: 'large',
        vertical: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        top: 'small',
        right: 'medium',
        horizontal: 'small',
        vertical: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      pad: {
        top: 'medium',
        right: 'medium',
        left: 'medium',
        bottom: 'medium',
        horizontal: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      gridArea: "header"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      round: true
    }), /*#__PURE__*/React.createElement(Box, {
      round: "xsmall"
    }), /*#__PURE__*/React.createElement(Box, {
      round: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      round: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      round: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      round: "full"
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'left'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'top'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'right'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'bottom'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'top-left'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'top-right'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'bottom-left'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        corner: 'bottom-right'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        size: 'xsmall'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        size: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        size: 'medium'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        size: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      round: {
        size: 'xlarge'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      border: "all"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "horizontal"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "vertical"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "top"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "left"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "bottom"
    }), /*#__PURE__*/React.createElement(Box, {
      border: "right"
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        color: 'accent-1'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        side: 'all'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        size: 'xsmall'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        size: 'small'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        size: 'medium'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        size: 'large'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        size: 'xlarge'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        style: 'dotted'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        style: 'double'
      }
    }), /*#__PURE__*/React.createElement(Box, {
      border: {
        style: 'dashed'
      }
    }), /*#__PURE__*/React.createElement(Box, {
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
    }), /*#__PURE__*/React.createElement(Box, {
      border: "between",
      gap: "small"
    }, /*#__PURE__*/React.createElement(Box, null, "one"), /*#__PURE__*/React.createElement(Box, null, "two"))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('elevation', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      elevation: "none"
    }), /*#__PURE__*/React.createElement(Box, {
      elevation: "xsmall"
    }), /*#__PURE__*/React.createElement(Box, {
      elevation: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      elevation: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      elevation: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      elevation: "xlarge"
    }), /*#__PURE__*/React.createElement(Box, {
      background: "dark-1",
      elevation: "small"
    }, /*#__PURE__*/React.createElement(Box, {
      elevation: "small"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('as', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      as: "header"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('tag proxied', function () {
    var tagComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      tag: "header"
    })));
    var asComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      as: "header"
    })));
    expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
  });
  test('animation', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (type) {
      return /*#__PURE__*/React.createElement(Box, {
        key: type,
        animation: type
      });
    }), /*#__PURE__*/React.createElement(Box, {
      animation: ['fadeIn', 'slideUp']
    }), /*#__PURE__*/React.createElement(Box, {
      animation: {
        type: 'fadeIn',
        duration: 1000,
        delay: 500
      }
    }), /*#__PURE__*/React.createElement(Box, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      width: "xsmall"
    }), /*#__PURE__*/React.createElement(Box, {
      width: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      width: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      width: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      width: "xlarge"
    }), /*#__PURE__*/React.createElement(Box, {
      width: "111px"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('height', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      height: "xsmall"
    }), /*#__PURE__*/React.createElement(Box, {
      height: "small"
    }), /*#__PURE__*/React.createElement(Box, {
      height: "medium"
    }), /*#__PURE__*/React.createElement(Box, {
      height: "large"
    }), /*#__PURE__*/React.createElement(Box, {
      height: "xlarge"
    }), /*#__PURE__*/React.createElement(Box, {
      height: "111px"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onClick', function () {
    var onClick = jest.fn();

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      onClick: onClick
    }, "test box"))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('test box'));
    expect(onClick).toBeCalled();
  });
});