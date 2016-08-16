import {test} from 'tape';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Grommet from '../../../src/js/components/icons/Grommet';
import CSSClassnames from '../../../src/js/utils/CSSClassnames';

const LOGO_ICON = CSSClassnames.LOGO_ICON;

test('loads a small sized grommet icon with custom class', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Grommet, {
    small:true,
    className:'custom-class'
  }));
  const grommetIcon = shallowRenderer.getRenderOutput();
  
  if (grommetIcon.props.className.indexOf(`${LOGO_ICON}--small`) > -1) {
    t.pass('Grommet icon has small size class');
  } else {
    t.fail('Grommet icon does not have small size class');
  } 
  
  if (grommetIcon.props.className.indexOf('custom-class') > -1) {
    t.pass('Grommet icon has custom applied class');
  } else {
    t.fail('Grommet icon does not have custom applied class');
  }   
});

test('loads a large sized grommet icon with a11yTitle', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Grommet, {
    large:true,
    a11yTitle:'grommetIconA11yTitle'
  }));
  const grommetIcon = shallowRenderer.getRenderOutput();
  const grommetA11yTitle = grommetIcon.props.children[0]
                           .props.children.props.id;
  
  if (grommetIcon.props.className.indexOf(`${LOGO_ICON}--large`) > -1) {
    t.pass('Grommet icon has large size class');
  } else {
    t.fail('Grommet icon does not have large size class');
  } 
  
  t.equal(
    grommetA11yTitle, 'grommetIconA11yTitle',
    'Grommet icon has grommetIconA11yTitle a11yTitle' 
  );   
});

test('loads an extra large sized grommet icon with a11yTitleId', (t) => {
  t.plan(2);
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(React.createElement(Grommet, {
    size:'xlarge',
    a11yTitleId:'grommetIconA11yTitleId'
  }));
  const grommetIcon = shallowRenderer.getRenderOutput();
  const grommetA11yTitleId = grommetIcon.props['aria-labelledby'];
  
  if (grommetIcon.props.className.indexOf(`${LOGO_ICON}--xlarge`) > -1) {
    t.pass('Grommet icon has extra large size class');
  } else {
    t.fail('Grommet icon does not have extra large size class');
  }    
  
  t.equal(
    grommetA11yTitleId, 'grommetIconA11yTitleId',
    'Grommet icon has grommetIconA11yTitleId a11yTitleId' 
  );  
});
