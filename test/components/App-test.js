// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {test} from 'tape';
import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/js/components/App';
import CSSClassnames from '../../src/js/utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.APP;

function setup(props) {
  return shallow(<App {...props}/>);
}

test('loads a basic App', (t) => {
  t.plan(1);
  const appElement = setup();

  if (appElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('App has class');
  } else {
    t.fail('App does not have app class');
  }
});

test('loads an inline App', (t) => {
  t.plan(1);
  const appElement = setup({inline: true});

  if (appElement.props().className.indexOf(`${CLASS_ROOT}--inline`) > -1) {
    t.pass('App has inline class');
  } else {
    t.fail('App does not have inline class');
  }
});

test('loads a custom className App', (t) => {
  t.plan(1);
  const appElement = setup({className: 'testing'});

  if (appElement.props().className.indexOf('testing') > -1) {
    t.pass('App has testing class');
  } else {
    t.fail('App does not have testing class');
  }
});

test('loads an App with body', (t) => {
  t.plan(2);
  var AppWithBody = (
    <App><h2>App Body</h2></App>
  );

  const appElement = shallow(AppWithBody);

  if (appElement.props().className.indexOf(CLASS_ROOT) > -1) {
    t.pass('App has class');
  } else {
    t.fail('App does not have app class');
  }

  console.log(appElement.find('h2'));
  t.equal(
    appElement.find('h2').props().children, 'App Body',
    'App has body'
  );
});
