import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Data,
  DataTable,
  NameValueList,
  NameValuePair,
  Pagination,
  Text,
} from 'grommet';

// Uses the StarWars API for starships, see https://swapi.dev

const step = 10; // default for https://swapi.dev

const fetchData = async (view, signal) => {
  const params = {};
  if (view.search) params.search = view.search;
  if (view.page) params.page = view.page;
  const url = `https://swapi.dev/api/starships?${Object.keys(params)
    .map((k) => `${k}=${params[k]}`)
    .join('&')}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
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
  const [view, setView] = useState({ search: '', step });
  const abortRef = useRef();
  const [expand, setExpand] = useState(['Y-wing']);

  useEffect(() => {
    // This API is a bit slow, abort any uncompleted requests.
    abortRef?.current?.abort();
    abortRef.current = new AbortController();
    fetchData(view, abortRef.current.signal).then(({ count, results }) => {
      if (results) {
        // The API doesn't provide a non-filtered total, so we rely on the
        // first call having no filtering telling us the total.
        setTotal((prevTotal) => Math.max(prevTotal, count));
        setResult({ data: results, filteredTotal: count });
        abortRef.current = undefined;
      }
    });
  }, [view]);

  const rowDetails = useMemo(
    () => ({
      render: (row) => <ShipProperties ship={row} />,
      expand,
      onExpand: (nextExpand /* , datum */) => setExpand(nextExpand),
    }),
    [expand],
  );

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>

    <Box skeleton={!result.data} width="large" pad="large">
      <Data
        data={result.data}
        total={total}
        filteredTotal={result.filteredTotal}
        view={view}
        onView={setView}
        toolbar="search"
      >
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
