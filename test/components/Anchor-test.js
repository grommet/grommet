// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Anchor from '../../src/js/components/Anchor';
import CSSClassnames from '../../src/js/utils/CSSClassnames';
import FakeIcon from '../mocks/FakeIcon';

const CLASS_ROOT = CSSClassnames.ANCHOR;

function setup(props) {
  return shallow(<Anchor {...props}/>);
}

test('loads a basic Anchor', (t) => {
  t.plan(2);
  const anchorElement = setup({ href: 'test' });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  t.equal(anchorElement.props().href, 'test', 'Anchor has test href');
});


test('loads a primary Anchor', (t) => {
  t.plan(2);
  const anchorElement = setup({ href: 'test', primary: true });

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--primary`) > -1) {
    t.pass('Anchor has primary class');
  } else {
    t.fail('Anchor does not have primary class');
  }
  t.equal(anchorElement.props().href, 'test', 'Anchor has test href');
});

test('loads a disabled Anchor', (t) => {
  t.plan(2);
  const anchorElement = setup({ primary: true, disabled: true });

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--primary`) > -1) {
    t.pass('Anchor has primary class');
  } else {
    t.fail('Anchor does not have primary class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--disabled`) > -1) {
    t.pass('Anchor has disabled class');
  } else {
    t.fail('Anchor does not have disabled class');
  }
});

test('loads a clickable Anchor', (t) => {
  t.plan(4);
  const onAnchorClick = sinon.spy();
  const anchorElement = setup({
    href: 'test',
    onClick: onAnchorClick
  });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--disabled`)
    === -1) {
    t.pass('Anchor does not have disabled class');
  } else {
    t.fail('Anchor has disabled class');
  }

  anchorElement.simulate('click');
  t.equal(onAnchorClick.callCount, 1);

  t.equal(anchorElement.props().href, 'test', 'Anchor has test href');
});

test('loads an Anchor with an icon', (t) => {
  t.plan(4);
  const anchorElement = setup({ icon: <FakeIcon /> });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--icon`) !== -1) {
    t.pass('Anchor has icon class');
  } else {
    t.fail('Anchor does not have icon class');
  }

  t.equal(
    anchorElement.props().children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props().children[1], undefined,
    'Anchor second child is undefined'

  );
});

test('loads an Anchor with an icon and label', (t) => {
  t.plan(4);
  const anchorElement = setup({ icon: <FakeIcon />, label: 'test' });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--icon-label`)
    !== -1) {
    t.pass('Anchor has icon-label class');
  } else {
    t.fail('Anchor does not have icon-label class');
  }

  t.equal(
    anchorElement.props().children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props().children[1], 'test', 'Anchor has label'
  );
});

test('loads an Anchor with an icon and label reverse', (t) => {
  t.plan(4);
  const anchorElement = setup({
    icon: <FakeIcon />,
    label: 'test',
    reverse: true
  });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--icon-label`)
    !== -1) {
    t.pass('Anchor has icon-label class');
  } else {
    t.fail('Anchor does not have icon-label class');
  }

  t.equal(
    anchorElement.props().children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props().children[0], 'test', 'Anchor has label'
  );
});

test('loads an Anchor with a children icon', (t) => {
  t.plan(4);
  const anchorElement = setup({ children: <FakeIcon /> });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  if (anchorElement.props().className.indexOf(`${CLASS_ROOT}--icon`) !== -1) {
    t.pass('Anchor has icon class');
  } else {
    t.fail('Anchor does not have icon class');
  }

  t.equal(
    anchorElement.props().children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props().children[0], undefined,
    'Anchor first child is undefined'
  );
});

test('loads an Anchor with a children text', (t) => {
  t.plan(4);
  const anchorElement = setup({ children: 'test' });

  if (anchorElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('Anchor has class');
  } else {
    t.fail('Anchor does not have anchor class');
  }

  t.equal(
    anchorElement.props().children.length, 2, 'Anchor has two children'
  );
  t.equal(
    anchorElement.props().children[0], undefined,
    'Anchor first child is undefined'
  );
  t.equal(
    anchorElement.props().children[1][0], 'test', 'Anchor has text children'
  );
});
