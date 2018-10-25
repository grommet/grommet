import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render } from 'react-testing-library';

import { hpe as hpeTheme } from 'grommet-theme-hpe';

import { Grommet } from '..';
import { AnnounceContext } from '../../../contexts';

class TestAnnouncer extends Component {
  static propTypes = {
    announce: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { announce } = this.props;
    announce('hello', 'assertive');
  }

  render() {
    return <div>hi</div>;
  }
}

describe('Grommet', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(<Grommet />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const component = renderer.create(<Grommet theme={hpeTheme}>Grommet App</Grommet>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('full', () => {
    const component = renderer.create(<Grommet full>Grommet App</Grommet>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('announce', done => {
    const { container } = render(
      <Grommet>
        <AnnounceContext.Consumer>{announce => <TestAnnouncer announce={announce} />}</AnnounceContext.Consumer>
      </Grommet>
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
