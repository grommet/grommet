import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Grommet, Tree } from 'grommet';

import { RadialSelected, Folder } from 'grommet-icons';

import styled from 'styled-components';

const TreeContainer = styled.div`
  width: 100%;
  height: auto;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const TitlteContainer = styled.h2`
  margin: 0;
  width: 100%;
  padding: 16px 0;
  text-align: center;
  font-weight: 100;
  text-transform: uppercase;
  background: #f2f2f2;
  border-radius: 4px;
  z-index: 2;
`;

const nodes = [
  {
    name: 'Fruit',
    childs: [
      {
        name: 'Apple',
        childs: [],
      },
      {
        name: 'Banana',
        childs: [],
      },
      {
        name: 'Orange',
        childs: [],
      },
    ],
  },
  {
    name: 'Provinces',
    childs: [
      {
        name: 'São Paulo',
        childs: [
          {
            name: 'São Paulo',
          },
          {
            name: 'Campinas',
          },
          {
            name: 'Guarujá',
          },
        ],
      },
      {
        name: 'Rio de Janeiro',
        childs: [
          {
            name: 'Teresópolis',
          },
        ],
      },
    ],
  },
];

const folders = [
  {
    name: 'Documents',
    childs: [
      {
        name: 'Projects',
        childs: [
          {
            name: 'Grommet',
          },
          {
            name: 'Grommet Icons',
          },
        ],
      },
    ],
  },
  {
    name: 'Music',
    childs: [
      {
        name: 'Pop',
      },
      {
        name: 'Electronic',
      },
    ],
  },
  {
    name: 'Picutres',
  },
  {
    name: 'Videos',
  },
];

const BasicTree = () => (
  <Grommet theme={grommet}>
    <Box align="start" pad="medium">
      <TitlteContainer>Tree component!</TitlteContainer>
      <TreeContainer>
        <Tree nodes={nodes} />
      </TreeContainer>
    </Box>
    <Box align="start" pad="medium">
      <TitlteContainer>Custom icons!</TitlteContainer>
      <TreeContainer>
        <Tree nodes={nodes} icon={<RadialSelected />} />
      </TreeContainer>
    </Box>
    <Box align="start" pad="medium">
      <TitlteContainer>Maybe a folder structure</TitlteContainer>
      <TreeContainer>
        <Tree nodes={folders} icon={<Folder />} />
      </TreeContainer>
    </Box>
  </Grommet>
);

storiesOf('Tree', module).add('Basic', () => <BasicTree />);
