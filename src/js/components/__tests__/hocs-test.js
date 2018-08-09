import React, { Component } from 'react';
import renderer from 'react-test-renderer';

import { findAllByType } from '../../utils';

import { withFocus } from '../hocs';

class TestDiv extends Component {
  render() {
    const { focus, ...rest } = this.props;
    return (
      <div {...rest}>
        { focus ? 'focus' : 'no focus' }
      </div>
    );
  }
}

const Test = withFocus(TestDiv);

test('withFocus set focus', (done) => {
  const component = renderer.create(<Test />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const container = findAllByType(tree, 'div');
  container[0].props.onFocus();

  setTimeout(() => {
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 50);
});

test('withFocus calls callback', () => {
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const component = renderer.create(
    <Test
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
  const tree = component.toJSON();

  const container = findAllByType(tree, 'div');
  container[0].props.onFocus();
  container[0].props.onBlur();

  expect(onFocus).toBeCalled();
  expect(onBlur).toBeCalled();
});
