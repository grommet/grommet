function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import renderer from 'react-test-renderer';
import { findAllByType } from '../../utils';
import { withFocus } from '../hocs';

var TestDiv = function TestDiv(props) {
  var focus = props.focus,
      rest = _objectWithoutPropertiesLoose(props, ["focus"]);

  return React.createElement("div", rest, focus ? 'focus' : 'no focus');
};

var Test = withFocus(TestDiv);
test('withFocus set focus', function (done) {
  var component = renderer.create(React.createElement(Test, null));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  var container = findAllByType(tree, 'div');
  container[0].props.onFocus();
  setTimeout(function () {
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 50);
});
test('withFocus calls callback', function () {
  var onFocus = jest.fn();
  var onBlur = jest.fn();
  var component = renderer.create(React.createElement(Test, {
    onFocus: onFocus,
    onBlur: onBlur
  }));
  var tree = component.toJSON();
  var container = findAllByType(tree, 'div');
  container[0].props.onFocus();
  container[0].props.onBlur();
  expect(onFocus).toBeCalled();
  expect(onBlur).toBeCalled();
});