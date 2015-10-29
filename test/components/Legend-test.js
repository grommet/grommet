// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {expect} from 'chai';
import React from 'react';
import {IntlProvider} from 'react-intl';

import TestUtils from 'react-addons-test-utils';

import Legend from '../../src/js/components/Legend';

describe('Grommet Legend', function() {
  it('loads a basic Legend', function() {
    var stateful = TestUtils.renderIntoDocument(
      <IntlProvider>
        <Legend total={true} series={[
          {"label": "Gen 7", "value": 50},
          {"label": "Gen 8", "value": 200}
        ]} />
      </IntlProvider>
    );

    var legendLabel = TestUtils.findRenderedDOMComponentWithClass(stateful, 'legend__total-label');

    expect(legendLabel.textContent).to.equal('Total');
  });

  it('loads a Legend in another language', function() {

    var ptBRMessages = {
      'Total': 'Total Brazil'
    };

    var stateful = TestUtils.renderIntoDocument(
      <IntlProvider locale="pt-BR" messages={ptBRMessages}>
        <Legend total={true} series={[
          {"label": "Gen 7", "value": 50},
          {"label": "Gen 8", "value": 200}
        ]} />
      </IntlProvider>
    );

    var legendLabel = TestUtils.findRenderedDOMComponentWithClass(stateful, 'legend__total-label');

    expect(legendLabel.textContent).to.equal('Total Brazil');
  });

});
