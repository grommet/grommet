// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Anchor from '../../src/js/components/Anchor';

describe('Grommet Anchor', function() {
  it('loads a basic Anchor', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Anchor, { href: 'test' }));
    const anchorElement = shallowRenderer.getRenderOutput();

    expect(anchorElement.props.className).to.contain('anchor');
    expect(anchorElement.props.href).to.equal('test');
  });

  it('loads a primary Anchor', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Anchor, {
      href: 'test',
      primary: true
    }));
    const anchorElement = shallowRenderer.getRenderOutput();

    expect(anchorElement.props.className).to.contain('anchor--primary');
    expect(anchorElement.props.className).to.contain('anchor--disabled');
    expect(anchorElement.props.href).to.equal('test');
  });

  it('loads a clickable Anchor', () => {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Anchor, {
      href: 'test',
      onClick: () => {}
    }));
    const anchorElement = shallowRenderer.getRenderOutput();

    expect(anchorElement.props.className).to.contain('anchor');
    expect(anchorElement.props.className).not.to.contain('anchor--disabled');
    expect(anchorElement.props.href).to.equal('test');
  });

});
