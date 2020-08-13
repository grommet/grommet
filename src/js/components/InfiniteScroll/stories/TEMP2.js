/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component, useContext } from 'react';
import { storiesOf } from '@storybook/react';
import {
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  InfiniteScroll,
  Box,
  ThemeContext,
  base,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
// import DataTable from './DataTable';
import { deepMerge } from 'grommet/utils';
import _ from 'lodash';
// import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

const DataTable = ({ data, columns, onMore, tableKey }) => {
  const theme = useContext(ThemeContext) || base;
  return (
    <ThemeContext.Extend
      value={{
        table: {
          extend:
            `${'min-width: 100%; ' +
              'border-collapse: separate; ' +
              'tr:hover {background: '}${theme.global.colors.active};} ` +
            `tr:focus {outline: 1px solid ${theme.global.colors.focus};}`,
          body: {
            extend: 'cursor: pointer; ', // Use pointer for rows in body
          },
          header: {
            // Make header fixed to top of table area
            background: 'white',
            extend: {
              position: 'sticky',
              top: 0,
              fontWeight: 600,
            },
          },
        },
      }}
    >
      {data && data.length > 0 ? (
        <Table key={tableKey} borderCollapse="separate">
          <TableHeader>
            <TableRow tabIndex={0}>
              {columns.map(c => (
                <TableCell
                  key={c.property}
                  scope="col"
                  pad={{
                    top: 'small',
                    bottom: 'small',
                    left: 'small',
                  }}
                >
                  <Box flex direction="row" align="center" gap="xsmall">
                    <Text>{c.label}</Text>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <InfiniteScroll
              items={data}
              onMore={onMore}
              step={80}
              renderMarker={marker => (
                <TableRow>
                  <TableCell>{marker}</TableCell>
                </TableRow>
              )}
              scrollableAncestor="window"
            >
              {datum => (
                <TableRow tabIndex={0}>
                  {columns.map(c => (
                    <TableCell
                      key={c.property}
                      pad={{
                        top: 'small',
                        bottom: 'small',
                        left: 'small',
                      }}
                    >
                      <Text>{datum[c.property]}</Text>
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </InfiniteScroll>
          </TableBody>
        </Table>
      ) : (
        <Box />
      )}
    </ThemeContext.Extend>
  );
};

// export default DataTable;

const COLUMNS = [
  {
    property: 'id',
    label: 'Index number',
  },
  {
    property: 'name',
    label: 'Name',
  },
  {
    property: 'serverName',
    label: 'Server Name',
  },
  {
    property: 'bayNumber',
    label: 'Bay #',
  },
  {
    property: 'memory',
    label: 'Memory',
  },
  {
    property: 'serialNumber',
    label: 'Serial Number',
  },
  {
    property: 'partNumber',
    label: 'Part Number',
  },
  {
    property: 'licensing',
    label: 'Fake Paragraph',
  },
  {
    property: 'formFactor',
    label: 'Form Factor',
  },
  // {
  //   property: "supportState",
  //   label: "Support State"
  // },
  // {
  //   property: "operatingSystem",
  //   label: "Operating System"
  // },
  // {
  //   property: "power",
  //   label: "Power"
  // },
  // {
  //   property: "hardwareType",
  //   label: "Hardware Type"
  // },
  // {
  //   property: "procNumber",
  //   label: "# Proc."
  // },
  // {
  //   property: "coreProc",
  //   label: "Cores/Proc"
  // },
  // {
  //   property: "uuid",
  //   label: "UUID"
  // },
  // {
  //   property: "iloVersion",
  //   label: "iLO Version"
  // },
  // {
  //   property: "state",
  //   label: "State"
  // }
];

const sampleRow = {
  name: 'Encl14, bay 16',
  serverName: '',
  bayNumber: 0,
  memory: 32768,
  serialNumber: 'M5X215436456456DFSDFD',
  partNumber: '6531245-B9000',
  formFactor: '2U',
  licensing: `Odit voluptate autem ut doloremque excepturi quo. Similique 
    repellat occaecati ad distinctio reiciendis velit. In eum aut 
    cum velit ex eum id. Ut ipsam incidunt magnam deserunt laborum 
    voluptatem. Exercitationem dolores rerum esse libero modi 
    voluptates. Nam repudiandae doloribus autem atque possimus et 
    autem vitae odio.`,
  supportState: 'NotSupported',
  operatingSystem: 'Linux',
  power: 'On',
  hardwareType: 'some hardware type',
  coreProc: 4,
  procNumber: 2,
  uuid: uuidv4(),
  iloVersion: uuidv4(),
  state: 'ProfileApplied',
};

let id = 0;
function fetchData(data) {
  const newData = _.cloneDeep(data);
  for (let i = 0; i < 80; i += 1) {
    const newSampleRow = _.cloneDeep(sampleRow);
    newSampleRow.id = id;
    // newSampleRow.serverName = faker.name.findName();
    // newSampleRow.licensing = faker.lorem.paragraph();
    // newSampleRow.serialNumber = faker.internet.url();
    newSampleRow.uuid = uuidv4();
    newSampleRow.iloVersion = uuidv4();
    newData.push(newSampleRow);
    id += 1;
  }
  return newData;
}

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    // eslint-disable-next-line no-underscore-dangle
    this._appendToData = this._appendToData.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._onMore = this._onMore.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    this._appendToData();
  }

  _appendToData = () => {
    const data = fetchData(this.state.data);
    this.setState({ data });
  };

  _onMore = () => {
    this._appendToData();
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <Grommet
          theme={deepMerge(hpe, {
            global: {
              colors: {
                border: '#DADADA',
                darkBlue: '#0E5265',
              },
              size: {
                medium: '444px',
              },
            },
            anchor: {
              color: {
                dark: 'light-2',
                light: 'brand',
              },
              extend: 'font-size: 18.75px; font-weight: 600',
            },
            button: {
              extend: props =>
                !props.plain && 'font-weight: 600; font-size: 18.75px;',
            },
            tab: {
              color: 'brand',
              border: {
                color: 'brand',
              },
              margin: {
                right: 'medium',
              },
              pad: {
                left: 'none',
              },
            },
            meter: {
              color: 'brand',
            },
            heading: {
              level: {
                3: {
                  small: {
                    size: '22px',
                    height: '28px',
                    maxWidth: '538px',
                  },
                  medium: {
                    size: '27px',
                    height: '33px',
                    maxWidth: '643px',
                  },
                  large: {
                    size: '36px',
                    height: '42px',
                    maxWidth: '854px',
                  },
                  xlarge: {
                    size: '44px',
                    height: '50px',
                    maxWidth: '1066px',
                  },
                },
                4: {
                  small: {
                    size: '16px',
                    height: '22px',
                    maxWidth: '379px',
                  },
                  medium: {
                    size: '22px',
                    height: '28px',
                    maxWidth: '538px',
                  },
                  large: {
                    size: '27px',
                    height: '33px',
                    maxWidth: '643px',
                  },
                  xlarge: {
                    size: '31px',
                    height: '37px',
                    maxWidth: '749px',
                  },
                },
              },
            },
          })}
          full
        >
          <Box direction="column" fill>
            invisible filter bar
            <Box direction="row" fill>
              <Box fill as="article">
                <Box
                  as="header"
                  flex={false}
                  direction="row"
                  align="center"
                  justify="end"
                  gap="small"
                  border="bottom"
                  pad={{ vertical: 'xsmall', horizontal: 'medium' }}
                  height="65px"
                >
                  header content
                </Box>
                <Box direction="row" fill>
                  <Box fill="vertical" flex>
                    <Box
                      as="header"
                      flex={false}
                      direction="row"
                      align="center"
                      justify="between"
                      gap="small"
                      border="bottom"
                      pad={{ horizontal: 'medium' }}
                      height="xxsmall"
                      background="light-1"
                    >
                      <Box justify="end" direction="row" gap="small">
                        more header content
                      </Box>
                    </Box>
                    <Box flex overflow="auto">
                      <Box flex={false} pad="medium" gap="medium">
                        <Box fill="vertical" flex>
                          {data && data.length ? (
                            <DataTable
                              id="resource-table"
                              tableKey="someKey"
                              data={data}
                              columns={COLUMNS}
                              onMore={this._onMore}
                            />
                          ) : (
                            <div />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grommet>
      </div>
    );
  }
}

storiesOf('InfiniteScroll', module).add('Intermitent', () => <App />);
