import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal } from '../../../utils/portal';

import { DropButton } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('DropButton', () => {
  beforeEach(createPortal);

  test('mounts', () => {
    const component = mount(
      <DropButton control={<input />}><div id='drop-contents'>drop contents</div></DropButton>, {
        attachTo: document.body.firstChild,
      }
    );

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    component.simulate('click');

    expect(document.getElementById('drop-contents')).toMatchSnapshot();

    component.setProps({ id: 'test', open: true });

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toMatchSnapshot();

    component.setProps({ open: false });

    expect(document.getElementById('drop-contents')).toBeNull();
  });

  test('closes', () => {
    const onClose = jest.fn();
    const component = mount(
      <DropButton control={<input />} onClose={onClose}>
        <div id='drop-contents'>drop contents</div>
      </DropButton>, {
        attachTo: document.body.firstChild,
      }
    );

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    component.simulate('click');

    expect(document.getElementById('drop-contents')).toMatchSnapshot();

    global.document.dispatchEvent(new Event('click'));

    expect(onClose).toBeCalled();
    expect(document.getElementById('drop-contents')).toBeNull();
  });
});
