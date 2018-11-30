import React, { Component } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { cleanup, render } from 'react-testing-library';

import { hpe as hpeTheme } from 'grommet-theme-hpe';

import { Grommet } from '..';
import { Heading } from '../../Heading';
import { AnnounceContext, ResponsiveContext } from '../../../contexts';

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

const customBreakpointsTheme = {
  global: {
    ssrBreakpoints: {
      small: {
        value: 600,
      },
      medium: {
        value: 800,
      },
      large: {
        value: 1000,
      },
    },
  },
};

// eslint-disable-next-line react/no-multi-comp
class SSRTester extends Component {
  sizes = [];

  render() {
    const { ua } = this.props;
    return (
      <Grommet theme={customBreakpointsTheme} ssrHeader={{ 'user-agent': ua }}>
        <ResponsiveContext.Consumer>
          {size => {
            this.sizes.push(size);
            return this.sizes.map(s => (
              <Heading>{`Received size ${s} for ${ua}`}</Heading>
            ));
          }}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

describe('Grommet', () => {
  afterEach(cleanup);

  test('basic', () => {
    const component = renderer.create(<Grommet />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('hpe theme', () => {
    const component = renderer.create(
      <Grommet theme={hpeTheme}>Grommet App</Grommet>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('full', () => {
    const component = renderer.create(<Grommet full>Grommet App</Grommet>);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('announce', done => {
    const { container } = render(
      <Grommet>
        <AnnounceContext.Consumer>
          {announce => <TestAnnouncer announce={announce} />}
        </AnnounceContext.Consumer>
      </Grommet>,
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

  [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A452 Safari/601.1 PTST/396',
    'Mozilla/5.0 (iPad; CPU OS 11_2_1 like Mac OS X) AppleWebKit/604.4.7 (KHTML, like Gecko) Mobile/15C153 [FBAN/FBIOS;FBAV/156.0.0.41.97;FBBV/89172188;FBDV/iPad5,3;FBMD/iPad;FBSN/iOS;FBSV/11.2.1;FBSS/2;FBCR/;FBID/tablet;FBLC/en_GB;FBOP/5;FBRV/0]',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
  ].forEach(ua => {
    test(`ssr rendering ${ua.substring(0, 25)}`, () => {
      const component = renderer.create(<SSRTester ua={ua} />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
