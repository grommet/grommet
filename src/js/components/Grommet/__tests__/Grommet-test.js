import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, renderIntoDocument } from 'react-testing-library';

import { hpe as hpeTheme } from '../../../themes';

import { Grommet } from '../';

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

describe('Grommet', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(
      <Grommet />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const component = renderer.create(
      <Grommet theme={hpeTheme}>Grommet App</Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('full', () => {
    const component = renderer.create(
      <Grommet full={true}>Grommet App</Grommet>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('announce', (done) => {
    const { container } = renderIntoDocument(
      <Grommet><TestAnnouncer /></Grommet>
    );
    expect(container.firstChild).toMatchSnapshot();

    // no style, no need for expectPortal
    expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();

    setTimeout(() => {
      // should clear the aria-live container
      expect(document.body.querySelector('[aria-live]')).toMatchSnapshot();
      done();
    }, 600); // wait the aria-live container to clear
  });
});
