import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Data,
  DataTable,
  NameValueList,
  NameValuePair,
  Pagination,
  Text,
} from 'grommet';

// Uses the StarWars API for starships, see https://swapi.info

const fetchData = async () => {
  const url = `https://swapi.info/api/starships`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      if (err.name !== 'AbortError') throw err;
      return {};
    });
};

const ShipProperties = ({ ship }) => (
  <NameValueList
    pairProps={{ direction: 'column' }}
    valueProps={{ width: 'xsmall' }}
    layout="grid"
    pad={{ left: 'large', bottom: 'small' }}
    gap={{ row: 'xsmall', column: 'large' }}
  >
    <NameValuePair
      name={
        <Text size="small" weight="bold">
          Name
        </Text>
      }
    >
      <Text size="xsmall">{ship.name}</Text>
    </NameValuePair>
    <NameValuePair
      name={
        <Text size="small" weight="bold">
          Model
        </Text>
      }
    >
      <Text size="xsmall">{ship.model}</Text>
    </NameValuePair>
    <NameValuePair
      name=<Text size="small" weight="bold">
        Manufacturer
      </Text>
    >
      <Text size="xsmall">{ship.manufacturer}</Text>
    </NameValuePair>
    <NameValuePair
      name=<Text size="small" weight="bold">
        Passengers
      </Text>
    >
      <Text size="xsmall">{ship.passengers}</Text>
    </NameValuePair>
  </NameValueList>
);

export const RowDetails = () => {
  const [result, setResult] = useState({});
  const [total, setTotal] = useState(0);
  const [expand, setExpand] = useState(['Y-wing']);

  useEffect(() => {
    fetchData().then((results) => {
      if (results) {
        // The API doesn't provide a non-filtered total, so we rely on the
        // first call having no filtering telling us the total.
        setTotal((prevTotal) => Math.max(prevTotal, results.length));
        setResult({ data: results });
      }
    });
  }, []);

  const rowDetails = useMemo(
    () => ({
      render: (row) => <ShipProperties ship={row} />,
      expand,
      expandLabel: (row) => `details for ${row.name}`,
      onExpand: (nextExpand /* , datum */) => setExpand(nextExpand),
    }),
    [expand],
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>

    <Box skeleton={!result.data} width="large" pad="large">
      <Data data={result.data} total={total} toolbar="search">
        <DataTable
          columns={[
            {
              property: 'name',
              header: 'Name',
              primary: true,
            },
            {
              property: 'starship_class',
              header: 'Class',
            },
          ]}
          rowDetails={rowDetails}
        />
        <Pagination />
      </Data>
    </Box>

    // </Grommet>
  );
};

RowDetails.storyName = 'rowDetails';

RowDetails.parameters = {
  chromatic: { disable: true },
};

RowDetails.args = {
  full: true,
};

export default {
  title: 'Visualizations/DataTable/rowDetails',
};
