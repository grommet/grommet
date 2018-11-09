import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Box } from '..';
describe('Box', function () {
  test('default', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('direction', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      direction: "row"
    }), React.createElement(Box, {
      direction: "row-responsive"
    }), React.createElement(Box, {
      direction: "column"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('responsive', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      responsive: true
    }), React.createElement(Box, {
      responsive: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('wrap', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      wrap: true
    }), React.createElement(Box, {
      wrap: false
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('justify', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      justify: "start"
    }), React.createElement(Box, {
      justify: "center"
    }), React.createElement(Box, {
      justify: "between"
    }), React.createElement(Box, {
      justify: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('align', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      align: "start"
    }), React.createElement(Box, {
      align: "center"
    }), React.createElement(Box, {
      align: "baseline"
    }), React.createElement(Box, {
      align: "stretch"
    }), React.createElement(Box, {
      align: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignContent', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      alignContent: "start"
    }), React.createElement(Box, {
      alignContent: "center"
    }), React.createElement(Box, {
      alignContent: "between"
    }), React.createElement(Box, {
      alignContent: "around"
    }), React.createElement(Box, {
      alignContent: "stretch"
    }), React.createElement(Box, {
      alignContent: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('alignSelf', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      alignSelf: "start"
    }), React.createElement(Box, {
      alignSelf: "center"
    }), React.createElement(Box, {
      alignSelf: "stretch"
    }), React.createElement(Box, {
      alignSelf: "end"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('background', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      background: "brand"
    }), React.createElement(Box, {
      background: "accent-1"
    }), React.createElement(Box, {
      background: "neutral-1"
    }), React.createElement(Box, {
      background: "light-1"
    }), React.createElement(Box, {
      background: "dark-1"
    }), React.createElement(Box, {
      background: "status-critical"
    }), React.createElement(Box, {
      background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)"
    }), React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: false
      }
    }), React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        dark: true
      }
    }), React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        position: 'top center'
      }
    }), React.createElement(Box, {
      background: {
        image: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAABGdBTUEAALGPC/xhBQAAAA9JREFUCB1jYMAC/mOIAQASFQEAlwuUYwAAAABJRU5ErkJggg==)',
        color: 'accent-1'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basis', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, null, React.createElement(Box, {
      basis: "xsmall"
    }), React.createElement(Box, {
      basis: "small"
    }), React.createElement(Box, {
      basis: "medium"
    }), React.createElement(Box, {
      basis: "large"
    }), React.createElement(Box, {
      basis: "xlarge"
    })), React.createElement(Box, {
      direction: "row"
    }, React.createElement(Box, {
      basis: "full"
    })), React.createElement(Box, {
      direction: "row"
    }, React.createElement(Box, {
      basis: "1/2"
    }), React.createElement(Box, {
      basis: "2/4"
    })), React.createElement(Box, {
      direction: "row"
    }, React.createElement(Box, {
      basis: "1/3"
    }), React.createElement(Box, {
      basis: "2/3"
    })), React.createElement(Box, {
      direction: "row"
    }, React.createElement(Box, {
      basis: "1/4"
    }), React.createElement(Box, {
      basis: "3/4"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('flex', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, null, React.createElement(Box, {
      flex: true
    }), React.createElement(Box, {
      flex: false
    }), React.createElement(Box, {
      flex: "grow"
    }), React.createElement(Box, {
      flex: "shrink"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, null, React.createElement(Box, {
      fill: true
    }), React.createElement(Box, {
      fill: false
    }), React.createElement(Box, {
      fill: "horizontal"
    }), React.createElement(Box, {
      fill: "vertical"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gap', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['xsmall', 'small', 'medium', 'large'].map(function (gap) {
      return React.createElement(Box, {
        key: gap,
        gap: gap,
        direction: "row"
      }, React.createElement(Box, null));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('margin', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      margin: "small"
    }), React.createElement(Box, {
      margin: "medium"
    }), React.createElement(Box, {
      margin: "large"
    }), React.createElement(Box, {
      margin: {
        horizontal: 'small'
      }
    }), React.createElement(Box, {
      margin: {
        vertical: 'small'
      }
    }), React.createElement(Box, {
      margin: {
        bottom: 'small'
      }
    }), React.createElement(Box, {
      margin: {
        left: 'small'
      }
    }), React.createElement(Box, {
      margin: {
        right: 'small'
      }
    }), React.createElement(Box, {
      margin: {
        top: 'small'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('pad', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      pad: "small"
    }), React.createElement(Box, {
      pad: "medium"
    }), React.createElement(Box, {
      pad: "large"
    }), React.createElement(Box, {
      pad: {
        horizontal: 'small'
      }
    }), React.createElement(Box, {
      pad: {
        vertical: 'small'
      }
    }), React.createElement(Box, {
      pad: {
        bottom: 'small'
      }
    }), React.createElement(Box, {
      pad: {
        left: 'small'
      }
    }), React.createElement(Box, {
      pad: {
        right: 'small'
      }
    }), React.createElement(Box, {
      pad: {
        top: 'small'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('gridArea', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      gridArea: "header"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      round: true
    }), React.createElement(Box, {
      round: "xsmall"
    }), React.createElement(Box, {
      round: "small"
    }), React.createElement(Box, {
      round: "medium"
    }), React.createElement(Box, {
      round: "large"
    }), React.createElement(Box, {
      round: "full"
    }), React.createElement(Box, {
      round: {
        corner: 'left'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'top'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'right'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'bottom'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'top-left'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'top-right'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'bottom-left'
      }
    }), React.createElement(Box, {
      round: {
        corner: 'bottom-right'
      }
    }), React.createElement(Box, {
      round: {
        size: 'xsmall'
      }
    }), React.createElement(Box, {
      round: {
        size: 'small'
      }
    }), React.createElement(Box, {
      round: {
        size: 'medium'
      }
    }), React.createElement(Box, {
      round: {
        size: 'large'
      }
    }), React.createElement(Box, {
      round: {
        size: 'xlarge'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('border', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      border: "all"
    }), React.createElement(Box, {
      border: "horizontal"
    }), React.createElement(Box, {
      border: "vertical"
    }), React.createElement(Box, {
      border: "top"
    }), React.createElement(Box, {
      border: "left"
    }), React.createElement(Box, {
      border: "bottom"
    }), React.createElement(Box, {
      border: "right"
    }), React.createElement(Box, {
      border: {
        color: 'accent-1'
      }
    }), React.createElement(Box, {
      border: {
        side: 'all'
      }
    }), React.createElement(Box, {
      border: {
        size: 'xsmall'
      }
    }), React.createElement(Box, {
      border: {
        size: 'small'
      }
    }), React.createElement(Box, {
      border: {
        size: 'medium'
      }
    }), React.createElement(Box, {
      border: {
        size: 'large'
      }
    }), React.createElement(Box, {
      border: {
        size: 'xlarge'
      }
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('elevation', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      elevation: "none"
    }), React.createElement(Box, {
      elevation: "xsmall"
    }), React.createElement(Box, {
      elevation: "small"
    }), React.createElement(Box, {
      elevation: "medium"
    }), React.createElement(Box, {
      elevation: "large"
    }), React.createElement(Box, {
      elevation: "xlarge"
    }), React.createElement(Box, {
      background: "dark-1",
      elevation: "small"
    }, React.createElement(Box, {
      elevation: "small"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('tag', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      tag: "header"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('animation', function () {
    var component = renderer.create(React.createElement(Grommet, null, ['fadeIn', 'fadeOut', 'jiggle', 'pulse', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'zoomIn', 'zoomOut'].map(function (type) {
      return React.createElement(Box, {
        key: type,
        animation: type
      });
    }), React.createElement(Box, {
      animation: ['fadeIn', 'slideUp']
    }), React.createElement(Box, {
      animation: {
        type: 'fadeIn',
        duration: 1000,
        delay: 500
      }
    }), React.createElement(Box, {
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
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      width: "xsmall"
    }), React.createElement(Box, {
      width: "small"
    }), React.createElement(Box, {
      width: "medium"
    }), React.createElement(Box, {
      width: "large"
    }), React.createElement(Box, {
      width: "xlarge"
    }), React.createElement(Box, {
      width: "111px"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('height', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      height: "xsmall"
    }), React.createElement(Box, {
      height: "small"
    }), React.createElement(Box, {
      height: "medium"
    }), React.createElement(Box, {
      height: "large"
    }), React.createElement(Box, {
      height: "xlarge"
    }), React.createElement(Box, {
      height: "111px"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});