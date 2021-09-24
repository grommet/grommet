import React from 'react';
import {
  Box,
  Grommet,
  Heading,
  NameValueList,
  ResponsiveContext,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { StatusGoodSmall, StatusCriticalSmall } from 'grommet-icons';

const data = [
  { name: 'Model type', value: 'MXQ83700F3' },
  { name: 'Last synced on some date', value: '34343738-3036-584DFD3422SA' },
  { name: 'Created on', value: '172.16.255.321.8' },
  {
    name: 'Policies',
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget 
    est at turpis imperdiet blandit porttitor eu enim. Phasellus faucibus 
    pharetra risus nec bibendum.`,
  },
];

const numericData = [
  { name: 'Model type', value: 'MXQ83700F3' },
  { name: 'Last synced on', value: '34343738-3036-584DFD3422SA' },
  { name: 'Created on', value: '172.16.255.321.8' },
  {
    name: 'Policies',
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget 
    est at turpis imperdiet blandit porttitor eu enim. Phasellus faucibus 
    pharetra risus nec bibendum.`,
  },
];

const dataVisual = [
  {
    name: 'Model type',
    value: 'MXQ83700F3',
    valueIcon: (
      <Box margin={{ top: 'xsmall' }}>
        <StatusGoodSmall size="small" color="status-ok" />
      </Box>
    ),
  },
  {
    name: 'Last synced on some date',
    value: '34343738-3036-584DFD3422SA',
    valueIcon: (
      <Box margin={{ top: 'xsmall' }}>
        <StatusCriticalSmall size="small" color="status-critical" />
      </Box>
    ),
  },
  {
    name: 'Created on',
    value: '172.16.255.321.8',
  },
  {
    name: 'Policies',
    value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget 
    est at turpis imperdiet blandit porttitor eu enim. Phasellus faucibus 
    pharetra risus nec bibendum.`,
    valueIcon: (
      <Box margin={{ top: 'xsmall' }}>
        <StatusGoodSmall size="small" color="status-ok" />
      </Box>
    ),
  },
];

export const Simple = () => (
  <Grommet theme={grommet}>
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box align="start" pad="small" gap="medium">
          <Heading>Default</Heading>
          <NameValueList data={data} />
          <Heading>Value Icon</Heading>
          <NameValueList data={dataVisual} />
          <Heading>Align Value: end</Heading>
          <NameValueList data={numericData} align={{ value: 'end' }} />
          <Heading>Align Name: end </Heading>
          <NameValueList data={numericData} align={{ name: 'end' }} />
          <Heading>Pair Direction: column</Heading>
          <NameValueList data={data} direction={{ pair: 'column' }} />
          <Heading>List Direction: row</Heading>
          <NameValueList
            data={data}
            direction={{ pair: 'column', list: 'row' }}
          />
          <Heading>nameProps</Heading>
          <NameValueList
            data={data}
            direction={{ pair: 'column' }}
            nameProps={{ text: { size: 'xsmall', weight: 500 } }}
          />
          <Heading>Custom Columns</Heading>
          <NameValueList
            columns={
              size !== 'small'
                ? [
                    ['small', 'medium'],
                    ['auto', 'large'],
                  ]
                : undefined
            }
            data={data}
            nameProps={{ text: { size: 'xlarge' } }}
            valueProps={{ text: { size: 'xlarge' } }}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Grommet>
);

export default {
  title: 'Visualizations/NameValueList/Simple',
};
