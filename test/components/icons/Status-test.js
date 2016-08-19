import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Status from '../../../src/js/components/icons/Status';
import CSSClassnames from '../../../src/js/utils/CSSClassnames';

const STATUS_ICON = CSSClassnames.STATUS_ICON;

test('loads a critical status icon', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'critical',
    size:'large'
  }));
  const criticalIcon = shallowRenderer.getRenderOutput();

  t.equal(
    criticalIcon.type.displayName, 'CriticalStatus', 
	'Status icon is critical' 
  );
  
  if (criticalIcon.props.className.indexOf(`${STATUS_ICON}--large`) > -1) {
    t.pass('Critical status icon has large size class');
  } else {
    t.fail('Critical status icon does not large size class');
  } 
  
});

test('loads a warning status icon', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'warning',
    className:'custom-class'	
  }));
  const warningIcon = shallowRenderer.getRenderOutput();

  t.equal(
    warningIcon.type.displayName, 'Warning', 'Status icon is warning' 
  );
  
  if (warningIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Warning status icon has custom applied class');
  } else {
    t.fail('Warning status icon does not custom applied class');
  } 
  
});

test('loads an ok status icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'ok'
  }));
  const okIcon = shallowRenderer.getRenderOutput();

  t.equal(
    okIcon.type.displayName, 'OK', 'Status icon is ok' 
  );
});

test('loads a disabled status icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'disabled'
  }));
  const disabledIcon = shallowRenderer.getRenderOutput();

  t.equal(
    disabledIcon.type.displayName, 'Disabled', 'Status icon is disabled' 
  );
});

test('loads an unknown status icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'unknown'
  }));
  const unknownIcon = shallowRenderer.getRenderOutput();

  t.equal(
    unknownIcon.type.displayName, 'Unknown', 'Status icon is unknown' 
  );
});

test('loads a blank status icon', (t) => {
  t.plan(1);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'blank'
  }));
  const blankIcon = shallowRenderer.getRenderOutput();

  t.equal(
    blankIcon.type.displayName, 'Blank', 'Status icon is blank' 
  );
});

test('loads a label status icon', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Status, {
    value:'label',
    className:'custom-class'
  }));
  const labelIcon = shallowRenderer.getRenderOutput();

  t.equal(
    labelIcon.type.displayName, 'Label', 'Status icon is label' 
  );
  
  t.equal(
    labelIcon.props.className, 'custom-class', 
	'Label Status icon has custom class applied' 
  );
});

