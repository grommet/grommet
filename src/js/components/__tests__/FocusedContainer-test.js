import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FocusedContainer from '../FocusedContainer';

Enzyme.configure({ adapter: new Adapter() });

const createContainer = () => {
  document.body.appendChild(document.createElement('div'));
};

describe('FocusedContainer', () => {
  beforeEach(() => {
    // make sure to remove all body children
    document.body.innerHTML = '';
    createContainer();
  });

  test('mounts', () => {
    mount(
      <div id='focus-trap-test'><input id='test' /></div>, {
        attachTo: document.body.firstChild,
      }
    );
    const element = document.createElement('div');
    document.body.appendChild(element);
    const component = mount(
      <FocusedContainer id='container'>test focused container</FocusedContainer>, {
        attachTo: element,
      }
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('focus-trap-test')).toMatchSnapshot();

    component.setProps({ hidden: true });

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('focus-trap-test')).toMatchSnapshot();

    component.setProps({ hidden: false });

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('focus-trap-test')).toMatchSnapshot();

    document.getElementById('test').focus();
  });

  test('restrict scroll', () => {
    const component = mount(
      <FocusedContainer id='container' restrictScroll={true}>
        test focused container
      </FocusedContainer>, {
        attachTo: document.body.firstChild,
      }
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.body.style.overflow).toMatchSnapshot();

    component.unmount();

    expect(component.getDOMNode()).toBeNull();
    expect(document.body.style.overflow).toMatchSnapshot();
  });

  test('blurs', () => {
    mount(
      <div id='focus-trap-test'><input id='test' /></div>, {
        attachTo: document.body.firstChild,
      }
    );
    const element = document.createElement('div');
    document.body.appendChild(element);
    const component = mount(
      <FocusedContainer id='container'>test focused container</FocusedContainer>, {
        attachTo: element,
      }
    );
    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('focus-trap-test')).toMatchSnapshot();

    component.simulate('blur');

    expect(document.getElementById('focus-trap-test')).toMatchSnapshot();
  });
});
