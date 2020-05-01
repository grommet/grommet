import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Carousel } from '..';
import { Image } from '../../Image';
describe('Carousel', function () {
  afterEach(cleanup);
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Carousel, null, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('basic with `initialChild: 1`', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Carousel, {
      initialChild: 1
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('navigate', function () {
    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Carousel, {
      "data-testid": "test-carousel"
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    })))),
        getByTestId = _render.getByTestId,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Right',
      keyCode: 39,
      which: 39
    });
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.keyDown(getByTestId('test-carousel'), {
      key: 'Left',
      keyCode: 37,
      which: 37
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  test('play', function (done) {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Carousel, {
      play: 1000
    }, /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4245.jpg"
    }), /*#__PURE__*/React.createElement(Image, {
      src: "//v2.grommet.io/assets/IMG_4210.jpg"
    })))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot(); // give some time for the carousel to advance

    setTimeout(function () {
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 1300);
  });
});