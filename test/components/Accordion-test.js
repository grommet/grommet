// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {test} from 'tape';

import Accordion from '../../src/js/components/Accordion';
import AccordionPanel from '../../src/js/components/AccordionPanel';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ACCORDION;

test('loads a basic Accordion', (t) => {
  t.plan(3);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <Accordion>
      <AccordionPanel heading="First Title">
        <p>test</p>
      </AccordionPanel>
    </Accordion>
  );
  const accordionElement = shallowRenderer.getRenderOutput();

  if (accordionElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Accordion has class');
  } else {
    t.fail('Accordion does not have class');
  }

  t.equal(accordionElement.props.children[0].type.displayName,
    'AccordionPanel', 'Accordion has AccordionPanel children');
  t.equal(accordionElement.props.children[0].props.children.props.children,
    'test', 'AccordionPanel has "test" content');
});

test('loads Accordion, multiple, with 2 panels, 2 active', (t) => {
  t.plan(7);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <Accordion openMulti>
      <AccordionPanel active heading="First Title">
        <p>test 1</p>
      </AccordionPanel>
      <AccordionPanel active heading="Second Title">
        <p>test 2</p>
      </AccordionPanel>
    </Accordion>
  );
  const accordionElement = shallowRenderer.getRenderOutput();

  if (accordionElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Accordion has class');
  } else {
    t.fail('Accordion does not have class');
  }

  var accordionPanelElement1 = accordionElement.props.children[0];
  var accordionPanelElement2 = accordionElement.props.children[1];

  t.equal(accordionPanelElement1.type.displayName,
    'AccordionPanel', 'Accordion has AccordionPanel children');
  t.equal(accordionPanelElement1.props.children.props.children,
    'test 1', 'AccordionPanel has "test 1" content');
  t.equal(accordionPanelElement1.props.active, true, 'First Panel Active');

  t.equal(accordionPanelElement2.type.displayName,
    'AccordionPanel', 'Accordion has AccordionPanel children');
  t.equal(accordionPanelElement2.props.children.props.children,
    'test 2', 'AccordionPanel has "test 2" content');
  t.equal(accordionPanelElement2.props.active, true, 'Second Panel Active');
});

test('loads Accordion, not multiple, panels, 2 active, first opened', (t) => {
  t.plan(7);

  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(
    <Accordion initialIndex={0}>
      <AccordionPanel active heading="First Title">
        <p>test 1</p>
      </AccordionPanel>
      <AccordionPanel active heading="Second Title">
        <p>test 2</p>
      </AccordionPanel>
    </Accordion>
  );
  const accordionElement = shallowRenderer.getRenderOutput();

  if (accordionElement.props.className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Accordion has class');
  } else {
    t.fail('Accordion does not have class');
  }

  var accordionPanelElement1 = accordionElement.props.children[0];
  var accordionPanelElement2 = accordionElement.props.children[1];

  t.equal(accordionPanelElement1.type.displayName,
    'AccordionPanel', 'Accordion has AccordionPanel children');
  t.equal(accordionPanelElement1.props.children.props.children,
    'test 1', 'AccordionPanel has "test 1" content');
  t.equal(accordionPanelElement1.props.active, true, 'First Panel Active');

  t.equal(accordionPanelElement2.type.displayName,
    'AccordionPanel', 'Accordion has AccordionPanel children');
  t.equal(accordionPanelElement2.props.children.props.children,
    'test 2', 'AccordionPanel has "test 2" content');
  t.equal(accordionPanelElement2.props.active, false, 'Second Panel Active');
});
