import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Accordion, AccordionPanel, Box, Grommet } from '../..';
var customTheme = {
  accordion: {
    heading: {
      level: '3'
    }
  }
};
describe('Accordion', function () {
  afterEach(cleanup);
  test('no AccordionPanel', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, null)));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('AccordionPanel', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"), false && /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex title', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Box, {
      background: "dark-1"
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: /*#__PURE__*/React.createElement("div", null, "Panel 1 complex")
    }, "Panel body 1"), undefined, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: /*#__PURE__*/React.createElement("div", null, "Panel 2 complex")
    }, "Panel body 2")))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex header', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      activeIndex: 1,
      animate: false
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      header: /*#__PURE__*/React.createElement("div", null, "Panel 1 header")
    }, "Panel body 1"), undefined, /*#__PURE__*/React.createElement(AccordionPanel, {
      header: /*#__PURE__*/React.createElement("div", null, "Panel 2 header")
    }, "Panel body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change to second Panel', function (done) {
    var onActive = jest.fn();

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      onActive: onActive
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2')); // wait for panel animation to finish

    setTimeout(function () {
      expect(onActive).toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 500);
  });
  test('change to second Panel without onActive', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      animate: false
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('multiple panels', function () {
    var onActive = jest.fn();

    var _render3 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      animate: false,
      multiple: true,
      onActive: onActive
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([1]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([1, 0]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('custom accordion', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
      theme: customTheme
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('accordion border', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
      theme: {
        accordion: {
          border: undefined,
          panel: {
            border: {
              side: 'horizontal'
            }
          }
        }
      }
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change active index', function () {
    var onActive = jest.fn();

    var _render4 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      animate: false,
      activeIndex: 1,
      onActive: onActive
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('focus and hover styles', function () {
    var _render5 = render( /*#__PURE__*/React.createElement(Grommet, {
      theme: {
        accordion: {
          hover: {
            color: 'red'
          }
        }
      }
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1")))),
        getByText = _render5.getByText,
        container = _render5.container;

    fireEvent.focus(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('backward compatibility of hover.color = undefined', function () {
    var _render6 = render( /*#__PURE__*/React.createElement(Grommet, {
      theme: {
        accordion: {
          hover: {
            color: undefined
          }
        }
      }
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1")))),
        getByText = _render6.getByText,
        container = _render6.container;

    fireEvent.focus(getByText('Panel 1')); // hover color should be undefined

    expect(container.firstChild).toMatchSnapshot();
  });
  test('theme hover of hover.heading.color', function () {
    var _render7 = render( /*#__PURE__*/React.createElement(Grommet, {
      theme: {
        accordion: {
          hover: {
            heading: {
              color: 'teal'
            }
          }
        }
      }
    }, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1")))),
        getByText = _render7.getByText,
        container = _render7.container;

    fireEvent.focus(getByText('Panel 1')); // hover color should be undefined

    expect(container.firstChild).toMatchSnapshot();
  });
  test('set on hover', function () {
    var _render8 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, null, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1"), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 2")))),
        getByText = _render8.getByText,
        container = _render8.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('wrapped panel', function () {
    var onActive = jest.fn();

    var Panel = function Panel(_ref) {
      var index = _ref.index;
      return /*#__PURE__*/React.createElement(AccordionPanel, {
        label: "Panel " + index
      }, "Panel body ", index);
    };

    var _render9 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Accordion, {
      animate: false,
      onActive: onActive
    }, [1, 2].map(function (index) {
      return /*#__PURE__*/React.createElement(Panel, {
        key: index,
        index: index
      });
    })))),
        getByText = _render9.getByText,
        container = _render9.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([0]);
    expect(getByText('Panel body 1')).not.toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });
});