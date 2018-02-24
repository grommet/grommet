import React from 'react';
import 'jest-styled-components';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createPortal, expectPortal } from '../../../utils/portal';

import { DropButton } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('DropButton', () => {
  beforeEach(createPortal);

  test('mounts', () => {
    const component = mount(
      <DropButton
        labl='Dropper'
        dropContent={<div id='drop-contents'>drop contents</div>}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    component.simulate('click');

    expectPortal('drop-contents').toMatchSnapshot();

    component.setProps({ id: 'test', open: true });

    expect(component.getDOMNode()).toMatchSnapshot();
    expectPortal('drop-contents').toMatchSnapshot();

    component.setProps({ open: false });

    expect(document.getElementById('drop-contents')).toBeNull();
  });

  test('closes', () => {
    const onClose = jest.fn();
    const component = mount(
      <DropButton
        label='Dropper'
        onClose={onClose}
        dropContent={<div id='drop-contents'>drop contents</div>}
      />, {
        attachTo: document.body.firstChild,
      }
    );

    expect(component.getDOMNode()).toMatchSnapshot();
    expect(document.getElementById('drop-contents')).toBeNull();

    component.simulate('click');

    expectPortal('drop-contents').toMatchSnapshot();

    global.document.dispatchEvent(new Event('click'));

    expect(onClose).toBeCalled();
    expect(document.getElementById('drop-contents')).toBeNull();
  });
});
