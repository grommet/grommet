import React from 'react';
import 'jest-styled-components';
import 'jest-axe/extend-expect';
import 'regenerator-runtime/runtime';

import { render } from '@testing-library/react';

import { Box } from '../../Box';
import { Grommet } from '../../Grommet';
import { Meter } from '../../Meter';
import { NameValueList } from '../../NameValueList';
import { NameValuePair } from '..';

const data = {
  name: 'entry',
  location: 'San Francisco',
  health: 80,
};

describe('NameValuePair', () => {
  test(`should render name when name is typeof string`, () => {
    const { container } = render(
      <Grommet>
        <NameValueList>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              {value}
            </NameValuePair>
          ))}
        </NameValueList>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should render name when name is JSX Element`, () => {
    const { container } = render(
      <Grommet>
        <NameValueList nameProps={{ width: 'xsmall' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair
              key={name}
              name={
                <Box pad="small" background="brand">
                  {name}
                </Box>
              }
            >
              {value}
            </NameValuePair>
          ))}
        </NameValueList>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should render value when provided as child of type 
  string or number`, () => {
    const { container } = render(
      <Grommet>
        <NameValueList valueProps={{ width: 'xsmall' }}>
          {Object.entries(data).map(([name, value]) => (
            <NameValuePair key={name} name={name}>
              {value}
            </NameValuePair>
          ))}
        </NameValueList>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test(`should render value when provided as child of type JSX Element`, () => {
    const { container } = render(
      <Grommet>
        <NameValueList nameProps={{ align: 'end' }}>
          {Object.entries(data).map(([name, value]) => {
            let renderedValue: any = value;
            if (name === 'health' && typeof value === 'number') {
              renderedValue = <Meter value={value} />;
            }
            return (
              <NameValuePair key={name} name={name}>
                {renderedValue}
              </NameValuePair>
            );
          })}
        </NameValueList>
      </Grommet>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
