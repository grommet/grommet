import React, { useEffect, useState } from 'react';
import { Box, Data, Grid, List, Notification, Pagination } from 'grommet';

// Uses the StarWars API for starships, see https://swapi.dev

const step = 10; // default for https://swapi.dev

const fetchData = async (view) => {
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
  }).then((response) => response.json());
};

export const StarWars = () => {
  const [result, setResult] = useState({ items: [], total: 0, page: 1 });
  const [view, setView] = useState({ search: '' });

  useEffect(() => {
    fetchData(view).then(({ count, results }) =>
      setResult({ items: results, total: count }),
    );
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
      <Box>
        <Data
          data={result.items}
          total={result.total}
          view={view}
          onView={setView}
          updateOn="change"
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
