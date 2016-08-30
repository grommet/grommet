// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import RadioButton from '../../src/js/components/RadioButton';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.RADIO_BUTTON;

test('loads a RadioButton', (t) => {
  t.plan(3);
  const shallowRenderer = TestUtils.createRenderer();
  var sampleRadioButton = (
    <RadioButton id="choice" name="choice" label="Choice" checked={true} />
  );
  shallowRenderer.render(sampleRadioButton);
  const radioButtonElement = shallowRenderer.getRenderOutput();
  const radioButtonProps = radioButtonElement.props.children[0].props;
  const radioButtonLabel = radioButtonElement.props.children[2].props;
  
  if (radioButtonElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('RadioButton has radioButton class');
  } else {
    t.fail('RadioButton does not have radioButton class');
  }  

  t.equal(
    radioButtonProps.id, 'choice', 'RadioButton id is choice'
  );
  
  t.equal(
    radioButtonLabel.children, 'Choice', 'RadioButton label is Choice'
  );
});
