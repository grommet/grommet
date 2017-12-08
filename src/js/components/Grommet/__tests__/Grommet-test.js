import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { hpe as hpeTheme } from '../../../themes';

import { Grommet } from '../';

Enzyme.configure({ adapter: new Adapter() });

class TestAnnouncer extends Component {
  static contextTypes = {
    grommet: PropTypes.object,
  }
  componentDidMount() {
    this.context.grommet.announce('hello', 'assertive');
  }
  render() {
    return <div>hi</div>;
  }
}

test('Grommet renders', () => {
  const component = renderer.create(
    <Grommet />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grommet hpe theme renders', () => {
  const component = renderer.create(
    <Grommet theme={hpeTheme}>Grommet App</Grommet>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Grommet announces', (done) => {
  const component = mount(
    <Grommet><TestAnnouncer /></Grommet>
  );
  expect(component.getDOMNode()).toMatchSnapshot();

  // no style, no need for expectPortal
  expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();

  setTimeout(() => {
    // should clear the aria-live container
    expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
    done();
  }, 600); // wait the aria-live container to clear
});
