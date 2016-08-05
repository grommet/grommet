// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import Search from '../../src/js/components/Search';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.SEARCH;

function setup(props) {
  return shallow(<Search {...props}/>);
}

test('loads a basic Search', (t) => {
  t.plan(1);
  const searchElement = setup();

  if (searchElement.props().children.props.className.indexOf(CLASS_ROOT) >
    -1) {
    t.pass('Search has class');
  } else {
    t.fail('Search does not have class');
  }
});

test('calling componentDidMount on mount', (t) => {
  //componentDidMount is just called if using mount instead of shallow render
  t.plan(1);
  const sandbox = sinon.sandbox.create();
  const spy = sandbox.spy(Search.prototype, "componentDidMount");
  mount(<Search />);
  t.equals(spy.calledOnce, true);
  sandbox.restore();
});
