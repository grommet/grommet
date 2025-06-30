import React, { useEffect, useState } from 'react';
import { Box, Data, List, Pagination } from 'grommet';

// Uses the StarWars API for starships, see https://swapi.dev

// const step = 10; // default for https://swapi.dev

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

export const StarWars = () => {
  const [result, setResult] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData().then((results) => {
      if (results) {
        // The API doesn't provide a non-filtered total, so we rely on the
        // first call having no filtering telling us the total.
        setTotal((prevTotal) => Math.max(prevTotal, results.length));
        setResult({ data: results, filteredTotal: results.length });
      }
    });
  }, []);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>

    <Box skeleton={!result.data} width="large" pad="large">
      <Data data={result.data} total={total} toolbar="search">
        <List primaryKey="name" secondaryKey="starship_class" />
        <Pagination />
      </Data>
    </Box>

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
  title: 'Data/Data/StarWars',
};
