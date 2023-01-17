import React, { useEffect, useRef, useState } from 'react';
import { Box, Data, Grid, List, Notification, Pagination } from 'grommet';

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

export const StarWars = () => {
  const [result, setResult] = useState({});
  const [view, setView] = useState({ search: '' });
  const abortRef = useRef();

  useEffect(() => {
    // This API is a bit slow, abort any uncompleted requests.
    abortRef?.current?.abort();
    abortRef.current = new AbortController();
    fetchData(view, abortRef.current.signal).then(({ count, results }) => {
      if (results) {
        setResult({
          data: results,
          total: count,
          page: view.page ?? 1,
          step,
        });
        abortRef.current = undefined;
      }
    });
  }, [view]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid
      flex={false}
      pad="large"
      columns={[['small', 'large']]}
      justifyContent="center"
      gap="large"
    >
      <Notification
        status="info"
        message="Data is in 'beta'. The API surface is subject to change."
      />
      <Box skeleton={!result.data}>
        <Data
          data={result.data}
          total={result.total}
          view={view}
          onView={setView}
          toolbar="search"
        >
          <List primaryKey="name" secondaryKey="starship_class" />
          <Pagination
            step={step}
            numberItems={result.total}
            page={result.page}
            onChange={({ page }) =>
              setView((prevView) => ({ ...prevView, page }))
            }
          />
        </Data>
      </Box>
    </Grid>
    // </Grommet>
  );
};

StarWars.parameters = {
  chromatic: { disable: true },
};

StarWars.args = {
  full: true,
};

export default {
  title: 'Layout/Data/StarWars',
};
