// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Anchor from '../../src/js/components/Anchor';

describe('Grommet Anchor', function() {
  it('loads a basic Anchor', function() {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(Anchor, { href: 'test' }));

    const anchorElement = shallowRenderer.getRenderOutput();

    expect(anchorElement.props.className).to.equal('anchor anchor--disabled');
    expect(anchorElement.props.href).to.equal('test');
  });

});
