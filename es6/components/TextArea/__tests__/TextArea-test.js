import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { TextArea } from '..';
describe('TextArea', function () {
  test('basic', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      id: "item",
      name: "item"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('placeholder', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      id: "item",
      name: "item",
      placeholder: "placeholder"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('plain', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      id: "item",
      name: "item",
      plain: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      disabled: true,
      id: "item",
      name: "item",
      plain: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focusIndicator', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      id: "item",
      name: "item",
      focusIndicator: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
      id: "item",
      name: "item",
      fill: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  [true, false, 'horizontal', 'vertical'].forEach(function (resize) {
    test("resize " + resize, function () {
      var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
        id: "item",
        name: "item",
        resize: resize
      })));
      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  ['small', 'medium', 'large'].forEach(function (size) {
    test("size " + size, function () {
      var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
        id: "item",
        name: "item",
        size: size
      })));
      var tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Event tests', function () {
    afterEach(cleanup);
    var keyEvent = {
      key: 'Backspace',
      keyCode: 8,
      which: 8
    };
    test("onKeyDown", function () {
      var capturedEvent = null;

      var callback = function callback(event) {
        var key = event.key,
            keyCode = event.keyCode,
            which = event.which;
        capturedEvent = {
          key: key,
          keyCode: keyCode,
          which: which
        };
      };

      var component = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
        id: "item",
        name: "item",
        placeholder: "item",
        onKeyDown: callback
      })));
      var textArea = component.getByPlaceholderText('item');
      fireEvent.keyDown(textArea, keyEvent);
      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });
    test("onKeyUp", function () {
      var capturedEvent = null;

      var callback = function callback(event) {
        var key = event.key,
            keyCode = event.keyCode,
            which = event.which;
        capturedEvent = {
          key: key,
          keyCode: keyCode,
          which: which
        };
      };

      var component = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(TextArea, {
        id: "item",
        name: "item",
        placeholder: "item",
        onKeyUp: callback
      })));
      var textArea = component.getByPlaceholderText('item');
      fireEvent.keyUp(textArea, keyEvent);
      expect(capturedEvent).toEqual(expect.objectContaining(keyEvent));
    });
  });
});