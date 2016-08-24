// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Quote from '../../src/js/components/Quote';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.QUOTE;

test('loads a Quote', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleQuote = (
    <Quote>Sample Quote</Quote>
  );
  shallowRenderer.render(sampleQuote);
  const quoteElement = shallowRenderer.getRenderOutput();
  const quote = quoteElement.props.children.props.children[0];
  
  if (quoteElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Quote has quote class');
  } else {
    t.fail('Quote does not have quote class');
  }

  t.equal(
    quote, 'Sample Quote', 'Quote is Sample Quote'
  );
});
